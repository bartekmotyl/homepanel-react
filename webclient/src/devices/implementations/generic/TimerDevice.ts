import { clone } from "lodash"
import { DateTime, Duration } from "luxon"
import { store } from "../../../app/store"
import { ConnectedDeviceBase, Device, DeviceUpdate } from "../../Device"


/** 
 * This is a special device to be used with Timers connector
 * It is required for LocalTimerWidget
 */
export class TimerDevice extends ConnectedDeviceBase {
    private static Epoch = DateTime.fromMillis(0)
    private duration: Duration

    constructor(deviceClass: string, connectorId: string, deviceId: string, name: string, durationISO: string) {
        super(deviceClass, connectorId, deviceId, name)
        this.duration = Duration.fromISO(durationISO)
        this.data = { startedAt: null }
    }

    protected acceptDataInternal(update: DeviceUpdate): Device {
        const cloned = clone(this)
        cloned.data = {
            ...this.data,
            ...update.data,
        }
        return cloned
    }    

    private getNow(): DateTime {
        return DateTime.local()
    }

    public start() {
        store.dispatch({ 
            type: `connector/${this.connectorId}/timer/start`, 
            payload: {
                deviceId: this.deviceId,
            }
        })
    }
    public stop() {
        store.dispatch({ 
            type: `connector/${this.connectorId}/timer/stop`, 
            payload: {
                deviceId: this.deviceId,
            }
        })        
    }

    private getTimeoutAt() : DateTime | null {
        const startedAt: DateTime | null = this.data?.startedAt
        if (!startedAt) {
            return null
        }
        return startedAt.plus(this.duration)
    }
    public isTimeout(): boolean {
        const timeout = this.getTimeoutAt()
        if (!timeout) {
            return false
        }
        return  timeout && this.getNow() > timeout
    }
    public isRunning(): boolean {
        return this.getTimeoutAt() !== null
    }

    public getDisplayDuration(): Duration {
        const startedAt: DateTime | null = this.data?.startedAt
        if (!startedAt) {
            return this.duration
        }
        let elapsed = this.getNow().diff(startedAt)
        let seconds =  Math.ceil(this.duration.minus(elapsed).as('seconds'))
        return Duration.fromMillis(Math.abs(seconds) * 1000)
    }
}
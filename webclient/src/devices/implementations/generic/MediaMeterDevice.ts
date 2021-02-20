import { toNumber } from "../../../utils/conversionUtils"
import { ConnectedDeviceBase } from "../../Device"
import { MediaMeter, MediaMeterVariant } from "../../interfaces/generic/genericDevices"

export class MediaMeterDevice extends ConnectedDeviceBase implements  MediaMeter {
    private variant: MediaMeterVariant
    private scaleMinute: number

    constructor(deviceClass: string, connectorId: string, deviceId: string, 
        name: string, variant: MediaMeterVariant, scaleMinute?: number) {
        
        super(deviceClass, connectorId, deviceId, name)
        this.variant = variant
        this.scaleMinute = scaleMinute ?? 1.0
      }

    getTotalValue(): number | null {
        const val = toNumber(this.data?.total)
        if (val == null) {
            return null
        }        
        return this.data?.total
    }
    getMinuteValue(): number | null {
        const val = toNumber(this.data?.minute)
        if (val == null) {
            return null
        }
        return this.data?.minute * this.scaleMinute
    }
    getVariant(): MediaMeterVariant {
        return this.variant
    }

}


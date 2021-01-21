import { MiddlewareAPI } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { Device, DeviceUpdate } from '../../devices/Device';
import { DateTime } from 'luxon';
import Immutable from 'immutable';
import { TimerDevice } from '../../devices/implementations/generic/TimerDevice';
import { IConnector } from '../connectorsMiddleware';

export class TimersConnector implements IConnector {
    private connectorId: string 
    private debug = false;

    public constructor(connectorId: string) {
        this.connectorId = connectorId
    }

    public getId(): string {
        return this.connectorId
    }

    public connect(store: MiddlewareAPI, config?: any) {
        console.log(`Timers middleware connect`)
        setInterval( () => { this.tick(store, this.connectorId) }, 100);
    }
    public disconnect() {    
        console.log(`Timers middleware  disconnect`)
    }
    public processAction(store: MiddlewareAPI, action: PayloadAction<any>): void {
        switch (action.type) {
            case `connector/${this.connectorId}/timer/stop`:
                this.debug && console.log(`Timers: stop timer ${action.payload.deviceId}`)
                this.dispatchUpdate(store, action.payload.deviceId, {startedAt: null})
                break;                
            case `connector/${this.connectorId}/timer/start`:
                this.debug && console.log(`Timers: start timer ${action.payload.deviceId}`)
                this.dispatchUpdate(store, action.payload.deviceId, {startedAt: DateTime.local()})
                break;                
        }
    }


    private dispatchUpdate(store: MiddlewareAPI, deviceId: string, data: any) {
        this.debug && console.log(`Timers: dispatching device update for  ${deviceId}`)
        const deviceData : DeviceUpdate = {
            deviceId: deviceId,
            timestamp: new Date(),
            data: data,
            upToDate: true,
        }
        store.dispatch({ type: 'devices/deviceUpdate', payload: deviceData });    
    }
    
    private  tick(store: MiddlewareAPI, connectorId: string) {
        this.debug && console.log(`Timers: tick ${connectorId}`)
        const devices: Immutable.Map<string, Device> = store.getState().devices.map 
        devices.forEach((dev, id) => {
            if (dev instanceof TimerDevice && dev.getConnectorId() === connectorId) {
                if (dev.isRunning()) {
                    this.debug && console.log(`Timers: dispatching device update for  ${dev.getDeviceId()}`)
                    // Dispatch a dummy update to trigger the whole update mechanism of React 
                    this.dispatchUpdate(store, dev.getDeviceId(), {now: DateTime.local()})
                }
            }
        })
    }    
}


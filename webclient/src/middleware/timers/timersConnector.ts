import { MiddlewareAPI } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { Device, DeviceUpdate } from '../../devices/Device';
import { DateTime } from 'luxon';
import Immutable from 'immutable';
import { TimerDevice } from '../../devices/implementations/generic/TimerDevice';
import { IConnector } from '../connectorsMiddleware';


const debug = false;

const dispatchUpdate = (store: MiddlewareAPI, deviceId: string, data: any) => {
    debug && console.log(`Timers: dispatching device update for  ${deviceId}`)
    const deviceData : DeviceUpdate = {
        deviceId: deviceId,
        timestamp: new Date(),
        data: data,
        upToDate: true,
    }
    store.dispatch({ type: 'devices/deviceUpdate', payload: deviceData });    
}

const tick = (store: MiddlewareAPI, connectorId: string) => {
    debug && console.log(`Timers: tick ${connectorId}`)
    const devices: Immutable.Map<string, Device> = store.getState().devices.map 
    devices.forEach((dev, id) => {
        if (dev instanceof TimerDevice && dev.getConnectorId() === connectorId) {
            if (dev.isRunning()) {
                debug && console.log(`Timers: dispatching device update for  ${dev.getDeviceId()}`)
                // Dispatch a dummy update to trigger the whole update mechanism of React 
                dispatchUpdate(store, dev.getDeviceId(), {now: DateTime.local()})
            }
        }
    })
}

export class TimersConnector implements IConnector {
    private connectorId: string 

    public constructor(connectorId: string) {
        this.connectorId = connectorId
    }

    public getId(): string {
        return this.connectorId
    }

    public connect(store: MiddlewareAPI, config?: any) {
        console.log(`Timers middleware connect`)
        setInterval( () => { tick(store, this.connectorId) }, 100);
    }
    public disconnect() {    
        console.log(`Timers middleware  disconnect`)
    }
    public processAction(store: MiddlewareAPI, action: PayloadAction<any>): void {
        switch (action.type) {
            case `connector/${this.connectorId}/timer/stop`:
                debug && console.log(`Timers: stop timer ${action.payload.deviceId}`)
                dispatchUpdate(store, action.payload.deviceId, {startedAt: null})
                break;                
            case `connector/${this.connectorId}/timer/start`:
                debug && console.log(`Timers: start timer ${action.payload.deviceId}`)
                dispatchUpdate(store, action.payload.deviceId, {startedAt: DateTime.local()})
                break;                
        }
    }
}


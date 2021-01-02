import { MiddlewareAPI, Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { Device, DeviceUpdate } from '../../devices/Device';
import { DateTime } from 'luxon';
import Immutable from 'immutable';
import { TimerDevice } from '../../devices/implementations/generic/TimerDevice';


// Actions to be dispatched to the middleware 
export const timersConnect = (connectorId: string) => ({ type: `connector/${connectorId}/connect` });
export const timersDisconnect = (connectorId: string) => ({ type: `connector/${connectorId}/disconnect` });

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

export const  timersMiddlewareFunction = (connectorId: string) => {
    
    const  timersMiddleware: Middleware = api => next => (action: PayloadAction<any>) => {
        switch (action.type) {
            case `connector/${connectorId}/connect`:
                console.log(`Timers middleware connect`)
                setInterval( () => { tick(api, connectorId) }, 100);
                break;
            case `connector/${connectorId}/disconnect`:
                console.log(`Timers middleware  disconnect`)
                break;
            case `connector/${connectorId}/timer/stop`:
                debug && console.log(`Timers: stop timer ${action.payload.deviceId}`)
                dispatchUpdate(api, action.payload.deviceId, {startedAt: null})
                break;                
            case `connector/${connectorId}/timer/start`:
                debug && console.log(`Timers: start timer ${action.payload.deviceId}`)
                dispatchUpdate(api, action.payload.deviceId, {startedAt: DateTime.local()})
                break;                
            }
        return next(action);
    }
    return timersMiddleware;
}

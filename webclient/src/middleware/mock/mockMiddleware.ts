import { MiddlewareAPI, Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { DeviceUpdate } from '../../devices/Device';

// Actions to be dispatched to the middleware 
export const mockConnect = (connectorId: string) => ({ type: `connector/${connectorId}/connect` });
export const mockDisconnect = (connectorId: string) => ({ type: `connector/${connectorId}/disconnect` });

const debug = false;

const tick = (store: MiddlewareAPI, connectorId: string) => {
    debug && console.log(`Mock: tick ${connectorId}`)
    const deviceData : DeviceUpdate = {
        deviceId: 'mock-temperature-1',
        timestamp: new Date(),
        data: {
            temperature:  20 + Math.floor(Math.random() * 50) / 10.0,
        },
        upToDate: true,
    }
    store.dispatch({ type: 'devices/deviceUpdate', payload: deviceData });
};

export const mockMiddlewareFunction = (connectorId: string) => {
    const mockMiddleware: Middleware = api => next => (action: PayloadAction<string>) => {
        switch (action.type) {
            case `connector/${connectorId}/connect`:
                console.log(`Mock connect`)
                setInterval( () => { tick(api, connectorId) }, 3000);
                break;
            case `connector/${connectorId}/disconnect`:
                console.log(`Mock disconnect`)
                break;
        }
        return next(action);
    };
    return mockMiddleware;
}

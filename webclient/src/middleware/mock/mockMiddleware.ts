import { MiddlewareAPI, Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { DeviceUpdate } from '../../devices/Device';

// Actions to be dispatched to the middleware 
export const mockConnect = () => ({ type: 'MOCK_CONNECT' });
export const mockDisconnect = () => ({ type: 'MOCK_DISCONNECT' });
export const mockSend = () => ({ type: 'MOCKS_SEND' });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const debug = false;

const tick = (store: MiddlewareAPI) => {
    debug && console.log(`Mock: tick`)
    const deviceData : DeviceUpdate = {
        deviceId: 'mock/mock-temperature-1',
        timestamp: new Date(),
        data: {
            temperature:  20 + Math.floor(Math.random() * 50) / 10.0,
        }
    }
    store.dispatch({ type: 'devices/deviceUpdate', payload: deviceData });
};


export const mockMiddleware: Middleware = api => next => (action: PayloadAction<string>) => {
    switch (action.type) {
        case 'MOCK_CONNECT':
            console.log(`Mock connect`)
            setInterval( () => { tick(api) }, 3000);
            break;
        case 'MOCK_DISCONNECT':
            console.log(`Mock disconnect`)
            break;
        case 'MOCK_WS_SEND':
            console.log(`Mock send`)
            break;
    }
    return next(action);
};

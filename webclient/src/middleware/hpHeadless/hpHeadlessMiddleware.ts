import { MiddlewareAPI, Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { DeviceUpdate } from '../../devices/Device';

// Actions to be dispatched to the middleware 
export const hpHeadlessConnect = (connectorId: string, url: string) => ({ 
    type: `connector/${connectorId}/connect`, payload: url});

export const hpHeadlessDisconnect = (connectorId: string) => ({ 
    type: `connector/${connectorId}/disconnect` });


const debug = false;

const onOpen = (store: MiddlewareAPI) => (ev: Event) => {
    console.log(`Home panel websocket: connected`)
    socket?.send(JSON.stringify({ messageType: "requestStateAll" }))
};

const onClose = (store: MiddlewareAPI) => () => {
};

const onMessage = (store: MiddlewareAPI) => (event: MessageEvent) => {
    debug && console.log(`Home panel websocket message received: ${event.data}`)

    // Sample data: 
    // {"messageType":"deviceState","device":"weather-wind-meter",
    // "data":{"mic":"CHECKSUM","channel":1,"wind_speed":0.6,"wind_direction":90,
    // "model":"AlectoV1 Wind Sensor","time":0,"id":163,"battery":"OK","wind_gust":1.2,
    // "readingDate":"N/A"},"timestamp":"2020-09-20 11:17 AM CEST"}

    var payload = JSON.parse(event.data);
    if (payload.messageType === "deviceState") {
        const deviceData: DeviceUpdate = {
            deviceId: payload.device,
            data: payload.data,
            timestamp: payload.timestamp,
            upToDate: payload.activeAttributes.length > 0,
        }
        store.dispatch({ type: 'devices/deviceUpdate', payload: deviceData });
    }

};

let socket: WebSocket | null = null;

export const hphWebSocketMiddlewareFunction = (connectorId: string) => {
    const hphWebSocketMiddleware: Middleware = api => next => (action: PayloadAction<any>) => {
        
        const sendAction = (deviceId: string, action: string) => {
            console.log(`sending action: ${action} to ${deviceId}`)
            const msg = JSON.stringify({
                messageType: 'action',
                deviceId: deviceId,
                action: action,
            });
            socket?.send(msg);
        }
        
        switch (action.type) {
            case `connector/${connectorId}/connect`:
                if (socket !== null) {
                    socket.close();
                }
                console.log(`Home panel websocket: connecting to: ${action.payload}`)

                // connect to the remote host
                socket = new WebSocket(action.payload);

                // websocket handlers
                socket.onmessage = onMessage(api);
                socket.onclose = onClose(api);
                socket.onopen = onOpen(api);

                break;
            case `connector/${connectorId}/disconnect`:
                if (socket !== null) {
                    socket.close();
                }
                socket = null;
                break;

            case `connector/${connectorId}/device/switch/toggle`:
                sendAction(action.payload.deviceId, 'toggle');
                break;
            case `connector/${connectorId}/device/blinds/up`:
                sendAction(action.payload.deviceId, 'moveUp');
                break;
            case `connector/${connectorId}/device/blinds/down`:
                sendAction(action.payload.deviceId, 'moveDown');
                break;
            case `connector/${connectorId}/device/blinds/stop`:
                sendAction(action.payload.deviceId, 'stopMove');
                break;
        }
        return next(action);
    };
    return hphWebSocketMiddleware;
};

import { MiddlewareAPI, Middleware } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { DeviceUpdate } from '../../devices/Device';

// Actions to be dispatched to the middleware 
export const hphWsConnect = (url: string) => ({ type: 'HPH_WS_CONNECT', payload: url });
export const hphWsDisconnect = () => ({ type: 'HPH_WS_DISCONNECT' });
export const hphWsSend = (url: string) => ({ type: 'HPH_WS_SEND', payload: url });

// Actons dispatched by the middleware in response to webservice events 
export const hphWsConnected = (host: string) => ({ type: 'HPH_WS_CONNECTED', payload: host });
export const hphWsDisconnected = () => ({ type: 'HPH_WS_DISCONNECTED' });

const debug = false; 

const onOpen = (store : MiddlewareAPI) => (ev: Event) => {
    console.log(`Home panel websocket: connected`)
    store.dispatch(hphWsConnected("dummy"));
  };

  const onClose = (store : MiddlewareAPI)  => () => {
    store.dispatch(hphWsDisconnected());
  };

  const onMessage = (store : MiddlewareAPI)  => (event: MessageEvent) => {
    debug && console.log(`Home panel websocket message received: ${event.data}`)
    
    // Sample data: 
    // {"messageType":"deviceState","device":"weather-wind-meter",
    // "data":{"mic":"CHECKSUM","channel":1,"wind_speed":0.6,"wind_direction":90,
    // "model":"AlectoV1 Wind Sensor","time":0,"id":163,"battery":"OK","wind_gust":1.2,
    // "readingDate":"N/A"},"timestamp":"2020-09-20 11:17 AM CEST"}

    var payload = JSON.parse(event.data);
    if (payload.messageType === "deviceState") {
        const deviceData : DeviceUpdate = {
            deviceId: 'homepanel/' + payload.device, 
            data: payload.data,
            timestamp: payload.timestamp,
        }
        store.dispatch({type: 'devices/deviceUpdate', payload: deviceData});
    }

  };

let socket : WebSocket | null = null;

export const hphWebSocketMiddleware: Middleware = api => next => (action: PayloadAction<string> ) => {



    switch (action.type) {
    case 'HPH_WS_CONNECT':
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
    case 'HPH_WS_DISCONNECT':
        if (socket !== null) {
            socket.close();
        }
        socket = null;
        break;
    case 'HPH_WS_SEND':
        if (socket !== null) {
            socket.send(JSON.stringify(action.payload));
        }
        break;
    }
  return next(action);
};

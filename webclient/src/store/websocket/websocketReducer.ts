import {
  REDUX_WEBSOCKET_BROKEN,
  REDUX_WEBSOCKET_CLOSED,
  REDUX_WEBSOCKET_CONNECT,
  REDUX_WEBSOCKET_MESSAGE,
  REDUX_WEBSOCKET_OPEN,
} from './actionTypes';

import defaultWebsocketState, { WebsocketState } from './websocketState';

export const getConnected = (state: WebsocketState) => state.connected;

const websocketReducer = (
  state = defaultWebsocketState,
  action,
): WebsocketState => {
  switch (action.type) {
    case REDUX_WEBSOCKET_CONNECT:
      return {
        ...state,
      };

    case REDUX_WEBSOCKET_OPEN:
      return {
        ...state,
        connected: true,
      };

    case REDUX_WEBSOCKET_BROKEN:
    case REDUX_WEBSOCKET_CLOSED:
      return {
        ...state,
        connected: false,
      };

    case REDUX_WEBSOCKET_MESSAGE:
      const msg = JSON.parse(action.payload.message);
      console.log(`received message for device: ${msg.device}`);
      const dev = {
        data: JSON.stringify(msg.data),
      };
      const updatedDevices = state.devices.set(msg.device, dev);
      return {
        ...state,
        devices: updatedDevices,
      };

    default:
      return state;
  }
};

export default websocketReducer;

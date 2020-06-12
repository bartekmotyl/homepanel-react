import {
  HP_REDUX_WEBSOCKET_BROKEN,
  HP_REDUX_WEBSOCKET_CLOSED,
  HP_REDUX_WEBSOCKET_CONNECT,
  HP_REDUX_WEBSOCKET_MESSAGE,
  HP_REDUX_WEBSOCKET_OPEN,
} from './hpWebsocketActionTypes';

import defaultHomepanelWebsocketDevicesState, {
  HomepanelWebsocketDevicesState,
} from './hpWebsocketDevicesState';
import { DeviceState } from 'store/devicesState';
import { HomepanelDevice } from 'devices/implementations/HomepanelXiaomiTemperatureSensor';

export const getConnected = (state: HomepanelWebsocketDevicesState) =>
  state.connected;

const homepanelWebsocketReducer = (
  state = defaultHomepanelWebsocketDevicesState,
  action,
): HomepanelWebsocketDevicesState => {
  switch (action.type) {
    case HP_REDUX_WEBSOCKET_CONNECT:
      return {
        ...state,
      };

    case HP_REDUX_WEBSOCKET_OPEN:
      return {
        ...state,
        connected: true,
      };

    case HP_REDUX_WEBSOCKET_BROKEN:
    case HP_REDUX_WEBSOCKET_CLOSED:
      return {
        ...state,
        connected: false,
      };

    case HP_REDUX_WEBSOCKET_MESSAGE:
      const msg = JSON.parse(action.payload.message);
      console.log(`received message for device: ${msg.device}`);

      // Create new instance of the device, with updated data
      let dev: HomepanelDevice = state.devices.get(
        msg.device,
      ) as HomepanelDevice;
      if (dev) {
        dev = dev.acceptData(msg.data);
      } else {
        return state;
      }

      // And create updated dictionary
      const updatedDevices = state.devices.set(msg.device, dev);
      return {
        ...state,
        devices: updatedDevices,
      };

    default:
      return state;
  }
};

export default homepanelWebsocketReducer;

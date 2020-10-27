import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import Immutable from 'immutable';
import { Device, DeviceUpdate, ConnectedDeviceBase } from './Device';

const debug = false; 

interface DevicesState {
  map: Immutable.Map<string, Device>;
}

const initialState: DevicesState = {
  map: Immutable.Map<string, Device>(),
};

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    registerDevice: (state, action: PayloadAction<Device>) => {
      const deviceId = action.payload.getDeviceId();
      const path = `${deviceId}`;
      debug && console.log(`Registering device: ${path}`);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.map = state.map.set(path, action.payload);
    },
    deviceUpdate:  (state, action: PayloadAction<DeviceUpdate>) => {
      const deviceId = action.payload.deviceId;
      const path = `${deviceId}`;
      debug && console.log(`Processing update of device : ${path}`);
      const dev = state.map.get(path);
      if (dev) {
        if (dev instanceof ConnectedDeviceBase) {
          const connectedDevice = dev as ConnectedDeviceBase;
          debug && console.log(`Device ${path} has been found, updating`);
          const updatedDevice = connectedDevice.acceptData(action.payload);
          state.map = state.map.set(path, updatedDevice);
        } else {
          debug && console.log(`Device ${path} has been found but is not updateable.`);
        }
      } else {
        debug && console.log(`Device ${path} has not been found.`);
      }
    }
  },
});

export const { registerDevice } = devicesSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectDevices = (state: RootState) => state.devices.map;


export default devicesSlice.reducer;

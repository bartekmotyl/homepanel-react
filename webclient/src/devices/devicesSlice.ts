import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import Immutable from 'immutable';
import { Device, DeviceUpdate } from './Device';

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
      debug && console.log(`Registering device: ${action.payload.getDeviceId()}`);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.map = state.map.set(action.payload.getDeviceId(), action.payload);
    },
    deviceUpdate:  (state, action: PayloadAction<DeviceUpdate>) => {
      debug && console.log(`Processing update of device : ${action.payload.deviceId}`);
      const dev = state.map.get(action.payload.deviceId);
      if (dev) {
        debug && console.log(`Device ${action.payload.deviceId} has been found, updating`);
        const updatedDevice = dev.acceptData(action.payload);
        state.map = state.map.set(dev.getDeviceId(), updatedDevice);
      } else {
        debug && console.log(`Device ${action.payload.deviceId} has not been found.`);
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

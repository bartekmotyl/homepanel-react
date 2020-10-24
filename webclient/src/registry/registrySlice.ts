import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import Immutable from 'immutable';
import { RegistryElement } from './RegistryElement';

const debug = false; 

interface Registry {
  map: Immutable.Map<string, RegistryElement>;
}

const initialState: Registry = {
  map: Immutable.Map<string, RegistryElement>(),
};

export const registrySlice = createSlice({
  name: 'registry',
  initialState,
  reducers: {
    registerElement: (state, action: PayloadAction<RegistryElement>) => {
      const deviceId = action.payload.getId();
      const path = `${deviceId}`;
      debug && console.log(`Registering element: ${path}`);
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.map = state.map.set(path, action.payload);
    },
  },
});

export const { registerElement } = registrySlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectRegistry = (state: RootState) => state.registry.map;


export default registrySlice.reducer;

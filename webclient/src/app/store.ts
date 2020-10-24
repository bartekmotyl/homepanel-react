import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { connectorMiddlewares } from '../dashboard/startup';
import devicesReducer from '../devices/devicesSlice';
import registryReducer from '../registry/registrySlice';

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    registry: registryReducer,
  },
  middleware: connectorMiddlewares,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

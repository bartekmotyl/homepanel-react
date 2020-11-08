import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { connectorMiddlewares } from '../dashboard/connectorsConfig';
import devicesReducer from '../devices/devicesSlice';

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
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

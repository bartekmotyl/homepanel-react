import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import devicesReducer from '../devices/devicesSlice';
import { hphWebSocketMiddleware } from '../middleware/hpHeadless/hpHeadlessMiddleware';

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
  },
  middleware: [hphWebSocketMiddleware]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

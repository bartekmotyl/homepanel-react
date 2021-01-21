import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import devicesReducer from '../devices/devicesSlice';
import { connectorsMiddleware } from '../middleware/connectorsMiddleware';


export const store = configureStore({
  reducer: {
    devices: devicesReducer,
  },
  middleware: [connectorsMiddleware]
});


export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const getStore = () => {
    return store
} 
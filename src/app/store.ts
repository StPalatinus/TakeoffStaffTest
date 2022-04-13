import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginSlice from '../features/slices/MainSlice';

export const store = configureStore({
  reducer: {
    handleLogin: loginSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import counterSlice from '../features/counter/counterSlice';
import loginSlice from '../features/login/MainSlice';
import contactsSlice from '../features/contacts/contactsSlice'

export const store = configureStore({
  reducer: {
    // counter: counterSlice,
    handleLogin: loginSlice,
    contacts: contactsSlice,
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

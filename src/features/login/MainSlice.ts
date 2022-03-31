import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { loginToServer, fetchContacts } from "../../services/primaryService";
// import
// import { fetchCount } from './counterAPI';

export interface MainState {
  pending: boolean;
  isLogedIng: boolean;
  isLoginButtonClicked: boolean;
  // response: any;
  accessToken: string | null;
  user: {
    email: string | null,
    id: number | null,
    userId: number | null,
  } | null;
    contactsList: string[] | null;
}

const initialState: MainState = {
  pending: false,
  isLogedIng: false,
  isLoginButtonClicked: false,
  // response: null,
  accessToken: null,
  user: null,
  contactsList: null,
};

export const login = createAsyncThunk(
  'login',
  async (loginData: {
    password: string,
    remember: boolean,
    email: string,
  }) => {
    const response = await loginToServer(loginData);
    return response;
  }
);

export const getContacts = createAsyncThunk(
  'getUsersContacts',
  async (contactsData: {
    id: number,
    token: string,
  }) => {
    const response = await fetchContacts(contactsData);
    return response;
  }
);

export const loginSlice = createSlice({
  name: 'toggleLogin',
  initialState,
  reducers: {
    logout: (state) => {
      state.accessToken = null;
      state.user = null;
      state.isLogedIng = false;
    },
    toggleLoginFormVision: (state) => {
      state.isLoginButtonClicked = !state.isLoginButtonClicked;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.pending = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isLogedIng = true;
        state.pending = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLogedIng = false;
        state.pending = false;
      })
      .addCase(getContacts.pending, (state) => {
        state.pending = true;
      })
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contactsList =  action.payload.contactsList;
        state.pending = false;
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.pending = false;
      })
  },
});

export const { logout, toggleLoginFormVision } = loginSlice.actions;

export default loginSlice.reducer;

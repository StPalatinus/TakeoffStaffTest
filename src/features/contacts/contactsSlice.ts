import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { fetchContacts } from "../../services/primaryService";

export interface ContactsState {
  contacts: {
    "userId": number,
    "contactsList": string[]
  } | null;
}

const initialState: ContactsState = {
  contacts: null
};

export const login = createAsyncThunk(
  'login/loginServer',
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
    // logout: (state) => {
    //   state.accessToken = null;
    //   state.user = null;
    //   state.isLogedIng = false;
    // },
    // toggleLoginFormVision: (state) => {
    //   state.isLoginButtonClicked = !state.isLoginButtonClicked;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        // state.pending = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // state.accessToken = action.payload.accessToken;
        // state.user = action.payload.user;
        // state.isLogedIng = true;
        // state.pending = false;
        // state.response = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        // state.isLogedIng = false;
        // state.pending = false;
        // state.response = action.payload;
      })
  },
});

// export const { logout, toggleLoginFormVision } = loginSlice.actions;

export default loginSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

// Initial state for login
const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  user: null,
  verificationPending: false,
};

// Create the login slice
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isAdmin = action.payload.isAdmin;
      state.isLoggedIn = true;
      state.verificationPending = action.payload.isAdmin;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.isAdmin = false;
      state.verificationPending = false;
    },
    verifyAdmin(state) {
      state.verificationPending = false;
    },
    verifyFailure(state) {
      state.isLoggedIn = false;
      state.verificationPending = false;
    },
  },
});

export const { login, logout, verifyAdmin, verifyFailure } = loginSlice.actions;
export default loginSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const isAuthenticated = !!localStorage.getItem("token");

const authSlice = createSlice({
  name: "auth",
  initialState: { isAuthenticated: isAuthenticated, isLogin: true },
  reducers: {
    loggedIn(state) {
      state.isAuthenticated = true;
    },
    loggedOut(state) {
      state.isAuthenticated = false;
    },
    login(state) {
      state.isLogin = !state.isLogin;
    },
    signup(state) {
      state.isLogin = !state.isLogin;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

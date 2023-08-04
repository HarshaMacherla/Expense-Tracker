import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: { displayName: "", photoUrl: "", emailVerified: false },
  reducers: {
    setUserData(state, action) {
      state.displayName = action.payload.displayName;
      state.photoUrl = action.payload.photoUrl;
    },
    loadUserData(state, action) {
      state.displayName = action.payload.displayName;
      state.photoUrl = action.payload.photoUrl;
      state.emailVerified = action.payload.emailVerified;
    },
  },
});

export const userDataActions = userDataSlice.actions;

export default userDataSlice.reducer;

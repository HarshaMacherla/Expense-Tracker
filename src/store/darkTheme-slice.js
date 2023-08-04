import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { darkMode: false },
  reducers: {
    toggleThemeMode(state) {
      state.darkMode = !state.darkMode;
    },
    disableDarkTheme(state) {
      state.darkMode = false;
    },
  },
});

export const themeActions = themeSlice.actions;

export default themeSlice.reducer;

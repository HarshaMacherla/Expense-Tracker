import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import expenseReducer from "./expenses-slice";
import userDataReducer from "./userData-slice";
import themeReducer from "./darkTheme-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
    userData: userDataReducer,
    theme: themeReducer,
  },
});

export default store;

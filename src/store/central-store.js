import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import expenseReducer from "./expenses-slice";
import userDataReducer from "./user-data-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    expense: expenseReducer,
    userData: userDataReducer,
  },
});

export default store;

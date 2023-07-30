import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    totalCost: 0,
  },
  reducers: {
    addExpense(state, action) {
      state.expenses.push(action.payload);
      state.totalCost += parseInt(action.payload.amount);
    },
    deleteExpense(state, action) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      state.totalCost -= parseInt(action.payload.amount);
    },
    updateExpense(state, action) {
      let updatedTotalCost = 0;
      state.expenses = state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          updatedTotalCost =
            state.totalCost - expense.amount + parseInt(action.payload.amount);
          return action.payload;
        } else {
          return expense;
        }
      });
      state.totalCost = updatedTotalCost;
    },
    loadExpense(state, action) {
      state.expenses = action.payload.expenses;
      state.totalCost = action.payload.totalCost;
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;

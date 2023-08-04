import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    expenses: [],
    totalExpensesAmount: 0,
  },
  reducers: {
    addExpense(state, action) {
      state.expenses.push({
        id: action.payload.id,
        name: action.payload.name,
        category: action.payload.category,
        amount: action.payload.amount,
      });
      state.totalExpensesAmount += action.payload.amount;
    },

    editExpense(state, action) {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      state.totalExpensesAmount =
        state.totalExpensesAmount +
        action.payload.amount -
        state.expenses[index].amount;
      state.expenses = state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return {
            name: action.payload.name,
            category: action.payload.category,
            amount: action.payload.amount,
          };
        } else {
          return expense;
        }
      });
    },

    loadExpenses(state, action) {
      state.expenses = action.payload.expenses;
      state.totalExpensesAmount = action.payload.totalExpensesAmount;
    },

    deleteExpense(state, action) {
      state.totalExpensesAmount -= action.payload.amount;
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
    },
  },
});

export const expenseActions = expenseSlice.actions;

export default expenseSlice.reducer;

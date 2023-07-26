import React, { createContext, useEffect, useReducer, useState } from "react";

const AuthContext = createContext();

const expenseReducre = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        expenses: [...state.expenses, action.item],
        totalCost: state.totalCost + parseInt(action.item.amount),
      };

    case "SET_EXPENSES":
      return {
        ...state,
        expenses: action.expenses,
        totalCost: action.totalCost,
      };

    default:
      return state;
  }
};

export const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const [userData, setUserData] = useState({
    displayName: "",
    photoUrl: "",
    emailVerified: false,
  });

  const [login, setLogin] = useState(true);

  const handleAddExpense = (expense) => {
    expenseDispatch({ type: "ADD", item: expense });
  };

  const [expensesState, expenseDispatch] = useReducer(expenseReducre, {
    expenses: [],
    addExpense: handleAddExpense,
    totalCost: 0,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await localStorage.getItem("token");
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAvBSC-wnMSr4LTyhMGqXtQdczeBxPzacw",
          {
            method: "POST",
            body: JSON.stringify({ idToken: token }),
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error.message);
        }

        const data = await response.json();
        console.log(data);
        if (
          data.users &&
          data.users.length > 0 &&
          data.users[0].displayName &&
          data.users[0].photoUrl
        ) {
          setUserData({
            displayName: data.users[0].displayName,
            photoUrl: data.users[0].photoUrl,
            emailVerified: data.users[0].emailVerified,
          });
        } else {
          console.log("User data is missing displayName and/or photoUrl.");
        }
      } catch (error) {
        alert(error.message);
      }
    };

    const fetchExpenses = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-authenti-1ecaa-default-rtdb.firebaseio.com/expenses.json"
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error.message);
        }

        const data = await response.json();
        let totalCost = 0;
        const expensesArray = Object.keys(data).map((key) => {
          totalCost += parseInt(data[key].amount);
          return {
            id: key,
            ...data[key],
          };
        });

        expenseDispatch({
          type: "SET_EXPENSES",
          expenses: expensesArray,
          totalCost,
        });
      } catch (error) {
        alert(error.message);
      }
    };

    if (loggedIn) {
      fetchUserData();
      fetchExpenses();
    }
  }, [loggedIn]);

  return (
    <AuthContext.Provider
      value={{
        login,
        setLogin,
        loggedIn,
        setLoggedIn,
        userData,
        setUserData,
        expensesState,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

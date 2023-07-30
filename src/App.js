import React, { useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "./store/expenses-slice";
import { userDataActions } from "./store/user-data-slice";

const App = () => {
  const loggedIn = useSelector((state) => state.auth.isAuthenticated);
  const login = useSelector((state) => state.auth.isLogin);

  const dispatch = useDispatch();

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
          console.log(data.users[0]);
          dispatch(
            userDataActions.setUserData({
              displayName: data.users[0].displayName,
              photoUrl: data.users[0].photoUrl,
              emailVerified: data.users[0].emailVerified,
            })
          );
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

        let expensesArray = [];
        let totalCost = 0;

        const data = await response.json();

        if (data !== null) {
          expensesArray = Object.keys(data).map((key) => {
            totalCost += parseInt(data[key].amount);
            return {
              id: key,
              ...data[key],
            };
          });
        }
        dispatch(
          expenseActions.loadExpense({ expenses: expensesArray, totalCost })
        );
      } catch (error) {
        alert(error.message);
      }
    };

    if (loggedIn) {
      fetchUserData();
      fetchExpenses();
    }
  }, [dispatch, loggedIn]);

  return (
    <>
      {!loggedIn && login ? (
        <Redirect to="/login" />
      ) : (
        <Redirect to="/signup" />
      )}

      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>

        <Route path="/profile" exact>
          {loggedIn ? <Profile /> : <Redirect to="/login" />}
        </Route>

        <Route path="/forgot-password" exact>
          <ForgotPassword />
        </Route>

        <Route path="/login" exact>
          {!loggedIn ? <LoginPage /> : <Redirect to="/" />}
        </Route>

        <Route path="/signup" exact>
          {!loggedIn ? <SignUpPage /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </>
  );
};

export default App;

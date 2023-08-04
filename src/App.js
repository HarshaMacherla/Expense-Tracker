import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Home from "./pages/Home";
import { Suspense, lazy, useEffect } from "react";
import { expenseActions } from "./store/expenses-slice";
import { userDataActions } from "./store/userData-slice";
import PasswordReset from "./pages/PasswordReset";

const App = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const dispatch = useDispatch();

  const Profile = lazy(() => import("./pages/Profile"));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await localStorage.getItem("token");
        const response = await fetch(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAa7TyUbpqm_Cnm2qCwF5FwS96ztOQYo2M",
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
        if (
          data.users &&
          data.users.length > 0 &&
          data.users[0].displayName &&
          data.users[0].photoUrl
        ) {
          dispatch(
            userDataActions.loadUserData({
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
          `https://expense-tracker-5c1a4-default-rtdb.firebaseio.com/expenses/${localStorage.getItem(
            "userID"
          )}.json`
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
              name: data[key].name,
              category: data[key].category,
              amount: data[key].amount,
            };
          });
        }
        dispatch(
          expenseActions.loadExpenses({
            expenses: expensesArray,
            totalExpensesAmount: totalCost,
          })
        );
      } catch (error) {
        alert(error.message);
      }
    };
    if (loggedIn) {
      fetchUserData();
      fetchExpenses();
    }
  }, [loggedIn, dispatch]);

  return (
    <>
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/profile" exact>
          {loggedIn ? (
            <Suspense fallback={<p>Loading...</p>}>
              <Profile />
            </Suspense>
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/login" exact>
          {!loggedIn ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route path="/signup" exact>
          {!loggedIn ? <Signup /> : <Redirect to="/" />}
        </Route>
        <Route path="/password-reset" exact>
          {!loggedIn ? <PasswordReset /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </>
  );
};

export default App;

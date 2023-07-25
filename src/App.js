import React, { useContext } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AuthContext from "./auth-context/auth-context";
import {
  Redirect,
  Route,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  const { login, loggedIn } = useContext(AuthContext);

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

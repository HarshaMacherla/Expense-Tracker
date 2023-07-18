import React from "react";
import "./App.css";
import SignUpPage from "./components/UserAuthentication/SignUpPage";
import LoginPage from "./components/UserAuthentication/LoginPage";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    !!localStorage.getItem("token")
  );

  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <>
      <Switch>
        <Route path="/" exact>
          {isLoggedIn && <Home />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/" exact>
          {isLoggedIn && <Home />}
          {!isLoggedIn && <Redirect to="/login" />}
        </Route>
        {isLogin ? (
          <Route path="/login">
            {isLoggedIn && <Redirect to="/" />}
            {!isLoggedIn && (
              <LoginPage
                setIsLogin={setIsLogin}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          </Route>
        ) : (
          <Route path="/signup">
            {isLoggedIn && <Redirect to="/" />}
            {!isLoggedIn && (
              <SignUpPage
                setIsLogin={setIsLogin}
                setIsLoggedIn={setIsLoggedIn}
              />
            )}
          </Route>
        )}
      </Switch>
    </>
  );
};

export default App;

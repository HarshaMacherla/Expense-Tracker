import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const [login, setLogin] = useState(true);

  return (
    <AuthContext.Provider value={{ login, setLogin, loggedIn, setLoggedIn }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

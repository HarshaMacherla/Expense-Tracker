import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));

  const [userData, setUserData] = useState({
    displayName: "",
    photoUrl: "",
  });

  const [login, setLogin] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
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
        setUserData(() => ({
          displayName: data.users[0].displayName,
          photoUrl: data.users[0].photoUrl,
        }));
      } catch (error) {
        alert(error.message);
      }
    };

    if (loggedIn) {
      fetchUserData();
    }
  }, [loggedIn]);

  return (
    <AuthContext.Provider
      value={{ login, setLogin, loggedIn, setLoggedIn, userData, setUserData }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

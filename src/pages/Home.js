import React, { useContext } from "react";
import { Button, Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../auth-context/auth-context";

const Home = () => {
  const { userData, setLoggedIn } = useContext(AuthContext);

  const incompleteUserData =
    !!userData.displayName.trim().length === 0 ||
    !!userData.photoUrl.trim().length === 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <Navbar className="m-0 text-white bg-secondary">
      <Container>
        <h3>Welcome to Expense Tracker!!!</h3>
      </Container>
      <Container className="justify-content-end">
        {incompleteUserData && (
          <p className="border rounded text-dark bg-light mt-2 px-2 py-1">
            Your profile is incomplete.{" "}
            <NavLink to="/profile"> Complete now</NavLink>
          </p>
        )}
        {!incompleteUserData && (
          <p className="bg-white px-2 my-2 border rounded">
            <NavLink to="/profile">Click Here to view your Profile</NavLink>
          </p>
        )}
        <Button
          variant="dark"
          className="text-white mx-2"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Container>
    </Navbar>
  );
};

export default Home;

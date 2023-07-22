import React from "react";
import { Container, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const Home = () => {
  return (
    <Navbar className="m-0 text-white bg-secondary">
      <Container>
        <h3>Welcome to Expense Tracker!!!</h3>
      </Container>
      <Container className="justify-content-end">
        <p className="border rounded text-dark bg-light mt-2 px-2 py-1">
          Your profile is incomplete.{" "}
          <NavLink to="/profile"> Complete now</NavLink>
        </p>
      </Container>
    </Navbar>
  );
};

export default Home;

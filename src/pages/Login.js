import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "./Login.css";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

const Login = () => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const dispatch = useDispatch();

  const history = useHistory();

  const handleLogin = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email.trim().length === 0) {
      alert("Email cannot be empty!");
      return;
    }

    if (password.trim().length === 0) {
      alert("Password cannot be empty!");
      return;
    }

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAa7TyUbpqm_Cnm2qCwF5FwS96ztOQYo2M",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }
      const responseData = await response.json();
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userID", responseData.email.replace(/[.@]/g, ""));
      dispatch(authActions.login());
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSwitchToSignup = () => {
    history.push("/signup");
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <div className="login-form-container mt-5">
              <Form
                className="border rounded bg-light p-3"
                onSubmit={handleLogin}
              >
                <h3 className="text-center mb-4">Welcome to Expense Tracker</h3>

                <Form.Label htmlFor="userEmail">Email</Form.Label>
                <Form.Control
                  id="userEmail"
                  type="email"
                  ref={emailRef}
                  placeholder="Please enter your registered email ID"
                />

                <Form.Label className="mt-3" htmlFor="userPassword">
                  Password
                </Form.Label>
                <Form.Control
                  id="userPassword"
                  type="password"
                  ref={passwordRef}
                  placeholder="Enter your password"
                />

                <div className="d-grid gap-2 mt-4">
                  <Button type="submit">Login</Button>
                </div>

                <p className="text-center mt-2">
                  <NavLink to="/password-reset">Forgot Password? Reset</NavLink>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <div className="signup-button-container d-grid gap-2 mt-4">
              <Button variant="secondary" onClick={handleSwitchToSignup}>
                Have an account? Login
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const LoginForm = () => {
  const [changedText, setChangedText] = useState(false);

  const [switchToSignUp, setSwitchToSignup] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    setChangedText(true);
  };

  const handleSwitchToSignup = () => {
    setSwitchToSignup(true);
  };

  return (
    <>
      {!changedText && !switchToSignUp && (
        <>
          <Container>
            <Row className="justify-content-center">
              <Col xs={12} md={6}>
                <div className="login-form-container mt-5">
                  <Form className="border rounded bg-light p-3">
                    <h3 className="text-center mb-4">
                      Welcome to Expense Tracker
                    </h3>

                    <Form.Label htmlFor="userEmail">Email</Form.Label>
                    <Form.Control
                      id="userEmail"
                      type="email"
                      placeholder="Please enter your registered email ID"
                    />

                    <Form.Label className="mt-3" htmlFor="userPassword">
                      Password
                    </Form.Label>
                    <Form.Control
                      id="userPassword"
                      type="password"
                      placeholder="Enter your password"
                    />

                    <div className="d-grid gap-2 mt-4">
                      <button type="submit" onClick={handleLogin}>
                        Login
                      </button>
                    </div>

                    <p className="text-center mt-2">
                      <NavLink to="/password-reset">
                        Forgot Password? Reset
                      </NavLink>
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
                    Don't have an account? SingUp
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
      {changedText && !switchToSignUp && <p>Login Button Clicked</p>}
      {!changedText && switchToSignUp && <p>Switched to signup page</p>}
    </>
  );
};

export default LoginForm;

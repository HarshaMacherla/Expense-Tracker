import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const SignupForm = () => {
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <div className="login-form-container mt-5">
              <Form className="border rounded bg-light p-3">
                <h3 className="text-center mb-4">Welcome to Expense Tracker</h3>

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

                <Form.Label className="mt-3" htmlFor="confirmUserPassword">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  id="confirmUserPassword"
                  type="password"
                  placeholder="Enter your password"
                />

                <div className="d-grid gap-2 mt-4 pb-2">
                  <Button type="submit">SingUp</Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <div className="login-button-container d-grid gap-2 mt-4">
              <Button variant="secondary">Have an account? Login</Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignupForm;

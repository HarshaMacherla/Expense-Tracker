import React, { useRef, useState } from "react";
import { Button, Container, Form, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const ForgotPassword = () => {
  const emailRef = useRef();

  const [loading, setLoading] = useState(false);

  const handleReset = async (event) => {
    event.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAvBSC-wnMSr4LTyhMGqXtQdczeBxPzacw",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: email,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }

      const data = await response.json();
      setLoading(false);
      console.log(data);
      alert("A password reset link has been sent to your registered email");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <Navbar className="m-0 text-white bg-dark">
        <h3 className="m-2">Expense Tracker</h3>
      </Navbar>
      <Container>
        {!loading && (
          <Form
            onSubmit={handleReset}
            className="border rounded p-3 m-5 bg-light text-dark"
          >
            <Container className="text-center">
              <Form.Label htmlFor="email">
                Enter the email you have used to register
              </Form.Label>
            </Container>
            <Form.Control
              type="email"
              id="email"
              placeholder="Email"
              ref={emailRef}
            />

            <Container className="text-center my-3">
              <Button variant="dark" type="submit">
                Send Password Reset Link
              </Button>
            </Container>

            <Container className="text-center">
              <NavLink to="/login">Already a user? Login</NavLink>
            </Container>
          </Form>
        )}
        {loading && <h4>Request sent. Waiting for the response...</h4>}
      </Container>
    </>
  );
};

export default ForgotPassword;

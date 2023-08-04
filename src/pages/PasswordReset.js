import React, { useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "../components/Navigation/NavBar";

const PasswordReset = () => {
  const emailRef = useRef();

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const handleReset = async (event) => {
    event.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAa7TyUbpqm_Cnm2qCwF5FwS96ztOQYo2M",
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
      history.push("/login");
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <NavBar />
      <Container>
        {!loading && (
          <Form
            onSubmit={handleReset}
            className="border rounded p-3 m-5 bg-light text-dark"
          >
            <Container className="text-center">
              <Form.Label htmlFor="email">
                <strong>
                  Enter the registered email to reset your password
                </strong>
              </Form.Label>
            </Container>
            <Form.Control
              type="email"
              id="email"
              placeholder="Email"
              ref={emailRef}
            />

            <Container className="text-center my-3">
              <Button variant="secondary" type="submit">
                Send Password Reset Link
              </Button>
            </Container>

            <Container className="text-center">
              <NavLink to="/signup">Don't have an account? SignUp</NavLink>
            </Container>
          </Form>
        )}
        {loading && <h4>Request sent. Waiting for the response...</h4>}
      </Container>
    </>
  );
};

export default PasswordReset;

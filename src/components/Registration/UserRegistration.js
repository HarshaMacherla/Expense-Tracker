import React from "react";
import { Button, Container, Form } from "react-bootstrap";

const UserRegistration = () => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password !== confirmPassword) {
      alert("Passwords mistmatch!");
      return;
    }

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvBSC-wnMSr4LTyhMGqXtQdczeBxPzacw",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }

      console.log("Signed Up successfully!");
    } catch (error) {
      alert(error.message);
    }

    emailRef.current.value = "";
    passwordRef.current.value = "";
    confirmPasswordRef.current.value = "";
  };

  return (
    <>
      <Container className="mt-5">
        {" "}
        <Form
          onSubmit={handleSubmit}
          className="bg-light my-3 mx-auto p-4 border rounded border-1 border-secondary"
          style={{ width: "50%" }}
        >
          <h2 className="text-center mb-4">SingUp</h2>

          <Form.Control type="email" placeholder="Email" ref={emailRef} />
          <br />

          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <br />

          <Form.Control
            type="password"
            placeholder="Confirm Password"
            ref={confirmPasswordRef}
          />

          <Container className="text-center">
            <Button className="mt-4 btn-block" type="submit">
              Sign Up
            </Button>
          </Container>
        </Form>
        <p
          className="bg-light mx-auto p-2 border rounded border-1 border-secondary text-center "
          style={{ width: "50%" }}
        >
          Have an account? Login
        </p>
      </Container>
    </>
  );
};

export default UserRegistration;

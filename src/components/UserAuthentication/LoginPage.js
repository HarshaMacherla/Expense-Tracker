import React from "react";
import { Button, Form } from "react-bootstrap";

const LoginPage = ({ setIsLogin, setIsLoggedIn }) => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvBSC-wnMSr4LTyhMGqXtQdczeBxPzacw",
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

      const data = await response.json();
      const token = data.idToken;
      localStorage.setItem("token", token);
      console.log("Login Successful");
      setIsLoggedIn(true);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="mx-auto my-5 p-5 bg-light border rounded"
        style={{ width: "400px" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        <Form.Control type="email" placeholder="Email" ref={emailRef} />
        <br />

        <Form.Control
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <br />

        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </div>

        <div className="text-center">
          <a href="/">Forgot password?</a>
        </div>
      </Form>

      <div className="text-center">
        <Button
          variant="secondary"
          className="mx-auto text-center border rounded p-2 d-block"
          style={{ width: "400px" }}
          onClick={() => setIsLogin(false)}
        >
          Don't have an account? Register
        </Button>
      </div>
    </>
  );
};

export default LoginPage;

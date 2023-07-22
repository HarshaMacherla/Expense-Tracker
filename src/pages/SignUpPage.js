import React, { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import AuthContext from "../auth-context/auth-context";

const SignUpPage = () => {
  const emailRef = React.useRef();
  const passwordRef = React.useRef();
  const confirmPasswordRef = React.useRef();

  const { setLogin, setLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (password.trim().length !== confirmPassword.trim().length) {
      alert("Passwords mismatch!");
      return;
    }

    if (password.trim().length === 0 || confirmPassword.trim().length === 0) {
      alert("Password cannot be empty");
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
      const data = await response.json();
      localStorage.setItem("token", data.idToken);
      console.log("SingedUp Successfully");
      setLoggedIn(true);
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
        <h2 className="text-center mb-4">SignUp</h2>

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
        <br />

        <div className="d-grid gap-2">
          <button className="btn btn-primary" type="submit">
            Sign up
          </button>
        </div>
      </Form>

      <div className="text-center">
        <Button
          variant="secondary"
          className="mx-auto text-center border rounded p-2 d-block"
          style={{ width: "400px" }}
          onClick={() => {
            setLogin(true);
          }}
        >
          Have an account? Login
        </Button>
      </div>
    </>
  );
};

export default SignUpPage;

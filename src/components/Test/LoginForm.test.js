import { render, screen } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";

describe("LoginForm component", () => {
  test("renders form heading", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const formHeading = screen.getByText(/Welcome to Expense Tracker/i);
    expect(formHeading).toBeInTheDocument();
  });

  test("renders form label: Email", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const emailLabel = screen.getByText(/Email/i);
    expect(emailLabel).toBeInTheDocument();
  });

  test("renders form label: Password", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const passwordLabel = screen.getByText("Password");
    expect(passwordLabel).toBeInTheDocument();
  });

  test("renders form login button", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const loginButton = screen.getByText("Login");
    expect(loginButton).toBeInTheDocument();
  });

  test("renders form switch to signup", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const signUpSwitch = screen.getByText("Don't have an account? SingUp");
    expect(signUpSwitch).toBeInTheDocument();
  });

  test("renders forgot password navlink", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );
    const forgotPassword = screen.getByText("Forgot Password? Reset");
    expect(forgotPassword).toBeInTheDocument();
  });
});

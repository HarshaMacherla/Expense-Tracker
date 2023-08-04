import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom/cjs/react-router-dom.min";
import SignupForm from "./SignupForm";

describe("Signup component", () => {
  test("renders form heading", () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
    const formHeading = screen.getByText(/Welcome to Expense Tracker/i);
    expect(formHeading).toBeInTheDocument();
  });

  test("renders form label: Email", () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
    const emailLabel = screen.getByText(/Email/i);
    expect(emailLabel).toBeInTheDocument();
  });

  test("renders form label: Password", () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
    const passwordLabel = screen.getByText("Password");
    expect(passwordLabel).toBeInTheDocument();
  });

  test("renders form label: Confirm Password", () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
    const confirmPassword = screen.getByText("Confirm Password");
    expect(confirmPassword).toBeInTheDocument();
  });

  test("renders form switch to signup", () => {
    render(
      <MemoryRouter>
        <SignupForm />
      </MemoryRouter>
    );
    const signUpButton = screen.getByText("SingUp");
    expect(signUpButton).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
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

  test("does not render welcome to expense tracker when the button was clicked", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const buttonElement = screen.getByText("Login");
    userEvent.click(buttonElement);

    const outputMessage = screen.queryByText("Welcome to Expense Tracker", {
      exact: false,
    });
    expect(outputMessage).toBeNull();
  });

  test("does not render label email when the button was clicked", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const buttonElement = screen.getByText("Login");
    userEvent.click(buttonElement);

    const outputMessage = screen.queryByText("Email", {
      exact: false,
    });
    expect(outputMessage).toBeNull();
  });

  test("does not render label password when the button was clicked", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const buttonElement = screen.getByText("Login");
    userEvent.click(buttonElement);

    const outputMessage = screen.queryByText("Password", {
      exact: false,
    });
    expect(outputMessage).toBeNull();
  });

  test("does not render label email when the button switch to signup was clicked", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const buttonElement = screen.getByText("Don't have an account? SingUp");
    userEvent.click(buttonElement);

    const outputMessage = screen.queryByText("Email", {
      exact: false,
    });
    expect(outputMessage).toBeNull();
  });

  test("does not render button login when the button switch to signup was clicked", () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const buttonElement = screen.getByText("Don't have an account? SingUp");
    userEvent.click(buttonElement);

    const outputMessage = screen.queryByText("Login", {
      exact: false,
    });
    expect(outputMessage).toBeNull();
  });
});

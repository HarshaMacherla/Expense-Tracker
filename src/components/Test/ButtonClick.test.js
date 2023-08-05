import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonClick from "./ButtonClick";

describe("renders user interactions", () => {
  test("renders welcome to expense tracker if button was not clicked", () => {
    render(<ButtonClick />);

    const welcomeMessage = screen.getByText("Welcome to Expense Tracker");
    expect(welcomeMessage).toBeInTheDocument();
  });

  test("renders close if button was not clicked", () => {
    render(<ButtonClick />);

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const outputMessage = screen.getByText("Close");
    expect(outputMessage).toBeInTheDocument();
  });

  test("does not render welcome to expense tracker when the button was clicked", () => {
    render(<ButtonClick />);

    const buttonElement = screen.getByRole("button");
    userEvent.click(buttonElement);

    const outputMessage = screen.queryByText("Welcome to Expense Tracker", {
      exact: false,
    });
    expect(outputMessage).toBeNull();
  });
});

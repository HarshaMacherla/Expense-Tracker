import { screen, render } from "@testing-library/react";
import Test1 from "./Test1";

test("renders welcome to expense tracker", () => {
  render(<Test1 />);
  const linkElement = screen.getByText(/Hello, Welcome to Expense Tracker!/);
  expect(linkElement).toBeInTheDocument();
});

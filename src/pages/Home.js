import React, { useContext, useRef, useState } from "react";
import { Button, Container, Form, Navbar, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "../auth-context/auth-context";

const Home = () => {
  const { userData, setLoggedIn } = useContext(AuthContext);

  const expenseDescriptionRef = useRef();
  const expenseCategoryRef = useRef();
  const expenseAmountRef = useRef();

  const [addedExpenses, setAddedExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const incompleteUserData =
    !!userData.displayName.trim().length === 0 ||
    !!userData.photoUrl.trim().length === 0;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
  };

  const addExpense = (event) => {
    event.preventDefault();

    const description = expenseDescriptionRef.current.value;
    const category = expenseCategoryRef.current.value;
    const amount = expenseAmountRef.current.value;

    setTotalAmount((prev) => prev + parseInt(amount));

    setAddedExpenses((prev) => [...prev, { description, category, amount }]);

    expenseDescriptionRef.current.value = "";
    expenseCategoryRef.current.value = "";
    expenseAmountRef.current.value = "";
  };

  return (
    <>
      <Navbar className="m-0 text-white bg-secondary">
        <Container>
          <h3>Welcome to Expense Tracker!!!</h3>
        </Container>
        <Container className="justify-content-end">
          {incompleteUserData && (
            <p className="border rounded text-dark bg-light mt-2 px-2 py-1">
              Your profile is incomplete.{" "}
              <NavLink to="/profile"> Complete now</NavLink>
            </p>
          )}
          {!incompleteUserData && (
            <p className="bg-white px-2 my-2 border rounded">
              <NavLink to="/profile">Click Here to view your Profile</NavLink>
            </p>
          )}
          <Button
            variant="dark"
            className="text-white mx-2"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Container>
      </Navbar>
      <Container>
        <Form onSubmit={addExpense} className="border rounded m-5 p-3 bg-light">
          <Form.Label htmlFor="expenseName">Expense</Form.Label>
          <Form.Control
            type="text"
            id="expenseName"
            ref={expenseDescriptionRef}
          />

          <Form.Label className="mt-3" htmlFor="expenseCategory">
            Category
          </Form.Label>
          <Form.Control
            as="select"
            id="expenseCategory"
            ref={expenseCategoryRef}
          >
            <option value="food">Food</option>
            <option value="fuel">Fuel</option>
            <option value="travel">Travel</option>
            <option value="gadgets">Gadgets</option>
          </Form.Control>

          <Form.Label className="mt-3" htmlFor="expenseAmount">
            Amount
          </Form.Label>
          <Form.Control
            type="number"
            id="expenseAmount"
            ref={expenseAmountRef}
            min="0"
          />

          <Container className="text-center">
            <Button variant="info" className="mt-3" type="submit">
              Add Expense
            </Button>
          </Container>
        </Form>
      </Container>

      {totalAmount !== 0 && (
        <Container>
          <Table bordered className="text-center">
            <thead>
              <tr>
                <th>Expense Name</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {addedExpenses.map((expense) => (
                <tr
                  key={`${expense.description}-${expense.category}-${expense.amount}`}
                >
                  <td>{expense.description}</td>
                  <td>{expense.category}</td>
                  <td>{expense.amount}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2}>Total</th>
                <td>Rs. {totalAmount}</td>
              </tr>
            </tfoot>
          </Table>
        </Container>
      )}
    </>
  );
};

export default Home;

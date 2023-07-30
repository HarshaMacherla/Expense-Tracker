import React, { useRef, useState } from "react";
import { Button, Container, Form, Navbar, Table } from "react-bootstrap";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";
import { expenseActions } from "../store/expenses-slice";

const Home = () => {
  const userData = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  const expenseDescriptionRef = useRef();
  const expenseCategoryRef = useRef();
  const expenseAmountRef = useRef();

  const [edit, setEdit] = useState(false);

  const incompleteUserData =
    !!userData.displayName.trim().length === 0 ||
    !!userData.photoUrl.trim().length === 0;

  const handleCurrentExpense = (expense) => {
    expenseDescriptionRef.current.value = expense.description;
    expenseCategoryRef.current.value = expense.category;
    expenseAmountRef.current.value = expense.amount;
    setEdit((prev) => !prev);
  };

  const expensesData = useSelector((state) => state.expense);

  const expenses = expensesData.expenses.map((expense) => (
    <tr key={expense.id}>
      <td>{expense.description}</td>
      <td>{expense.category}</td>
      <td>{expense.amount}</td>
      <td>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => {
            localStorage.setItem("editId", expense.id);
            handleCurrentExpense(expense);
          }}
        >
          Edit Expense
        </Button>
      </td>
      <td>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDelete(expense)}
        >
          Delete Expense
        </Button>
      </td>
    </tr>
  ));

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(authActions.loggedOut());
  };

  const addExpense = async (event) => {
    event.preventDefault();
    const description = expenseDescriptionRef.current.value;
    const category = expenseCategoryRef.current.value;
    const amount = expenseAmountRef.current.value;
    if (description.trim().length === 0) {
      alert("Enter the expense name");
      return;
    }
    if (category.trim().length === 0) {
      alert("Select the category of the expense");
      return;
    }
    if (amount.trim().length === 0) {
      alert("Enter the expense amount");
      return;
    }
    try {
      const response = await fetch(
        "https://expense-tracker-authenti-1ecaa-default-rtdb.firebaseio.com/expenses.json",
        {
          method: "POST",
          body: JSON.stringify({ description, category, amount }),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }
      const data = await response.json();
      dispatch(
        expenseActions.addExpense({
          id: data.name,
          description,
          category,
          amount,
        })
      );
    } catch (error) {
      alert(error.message);
    }
    expenseDescriptionRef.current.value = "";
    expenseCategoryRef.current.value = "";
    expenseAmountRef.current.value = "";
  };

  const handleEdit = async () => {
    try {
      const id = localStorage.getItem("editId");
      const response = await fetch(
        `https://expense-tracker-authenti-1ecaa-default-rtdb.firebaseio.com/expenses/${id}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            description: expenseDescriptionRef.current.value,
            category: expenseCategoryRef.current.value,
            amount: expenseAmountRef.current.value,
          }),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }
      const data = await response.json();
      console.log(data);
      dispatch(
        expenseActions.updateExpense({
          id: localStorage.getItem("editId"),
          ...data,
        })
      );
      setEdit(false);
      expenseDescriptionRef.current.value = "";
      expenseCategoryRef.current.value = "";
      expenseAmountRef.current.value = "";
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (expense) => {
    try {
      const response = await fetch(
        `https://expense-tracker-authenti-1ecaa-default-rtdb.firebaseio.com/expenses/${expense.id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }
      dispatch(expenseActions.deleteExpense(expense));
      console.log("Expense deleted");
    } catch (error) {
      alert(error.message);
    }
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
            <option value="Food">Food</option>
            <option value="Fuel">Fuel</option>
            <option value="Travel">Travel</option>
            <option value="Gadget">Gadget</option>
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
            {!edit && (
              <Button variant="info" className="mt-3" type="submit">
                Add Expense
              </Button>
            )}
            {edit && (
              <Button variant="primary" className="mt-3" onClick={handleEdit}>
                Confirm Edit
              </Button>
            )}
          </Container>
        </Form>
      </Container>

      {expensesData.totalCost !== 0 && (
        <Container>
          <Table className="text-center">
            <thead>
              <tr>
                <th>Expense Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{expenses}</tbody>
            <tfoot>
              <tr>
                <td colSpan={5} className="text-end">
                  <strong>Total: </strong>Rs. {expensesData.totalCost}
                </td>
              </tr>
            </tfoot>
          </Table>
        </Container>
      )}
    </>
  );
};

export default Home;

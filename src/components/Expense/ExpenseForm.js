import React from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import "./ExpenseForm.css";
import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../../store/expenses-slice";
import Expenses from "./Expenses";

const ExpenseForm = () => {
  const expenseNameRef = React.useRef();
  const expenseCategoryRef = React.useRef();
  const expenseAmountRef = React.useRef();

  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = React.useState(false);

  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleAddExpense = async (event) => {
    event.preventDefault();

    const name = expenseNameRef.current.value.trim();
    const category = expenseCategoryRef.current.value.trim();
    const amount = expenseAmountRef.current.value.trim();

    if (name.length === 0) {
      alert(
        "Expense description is empty. Please enter the description about your expense."
      );
      return;
    }

    if (name.amount === 0) {
      alert("Expense amount is empty. Please enter the expense amount.");
      return;
    }

    try {
      const response = await fetch(
        `https://expense-tracker-5c1a4-default-rtdb.firebaseio.com/expenses/${localStorage.getItem(
          "userID"
        )}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            category,
            amount,
          }),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }
      const responseData = await response.json();
      const expenseData = {
        id: responseData.name,
        name,
        category,
        amount: parseInt(amount),
      };
      dispatch(expenseActions.addExpense(expenseData));
      console.log(expenseData);
    } catch (error) {
      alert(error.message);
    }

    expenseNameRef.current.value = "";
    expenseCategoryRef.current.value = "";
    expenseAmountRef.current.value = "";
  };

  const handleExpenseAutofill = (expense) => {
    setIsEdit(true);
    expenseNameRef.current.value = expense.name;
    expenseCategoryRef.current.value = expense.category;
    expenseAmountRef.current.value = expense.amount;
    localStorage.setItem("expenseID", expense.id);
  };

  const handleConfirmEdit = async () => {
    try {
      const response = await fetch(
        `https://expense-tracker-5c1a4-default-rtdb.firebaseio.com/expenses/${localStorage.getItem(
          "userID"
        )}/${localStorage.getItem("expenseID")}.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: expenseNameRef.current.value.trim(),
            category: expenseCategoryRef.current.value.trim(),
            amount: expenseAmountRef.current.value,
          }),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }
      const responseData = await response.json();
      dispatch(
        expenseActions.editExpense({
          id: localStorage.getItem("expenseID"),
          name: responseData.name,
          category: responseData.category,
          amount: parseInt(responseData.amount),
        })
      );
      setIsEdit(false);
      localStorage.removeItem("expenseID");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={6}>
            <Form
              className={
                darkMode
                  ? "expense-form-control border border-dark rounded p-3 mx-auto mt-4 bg-dark"
                  : "expense-form-control border rounded p-3 mx-auto mt-4"
              }
              onSubmit={handleAddExpense}
            >
              <Form.Label
                className={darkMode ? "mt-1 text-white" : "mt-1"}
                htmlFor="expense-name"
              >
                <strong>Expense Name</strong>
              </Form.Label>
              <Form.Control
                type="text"
                id="expense-name"
                placeholder="Enter description"
                ref={expenseNameRef}
              />

              <Form.Label
                className={darkMode ? "mt-3 text-white" : "mt-3"}
                htmlFor="expense-category"
              >
                <strong>Category</strong>
              </Form.Label>
              <Form.Control
                as="select"
                type="text"
                id="expense-category"
                ref={expenseCategoryRef}
              >
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Monthly Bill">Monthly Bill</option>
                <option value="Fuel">Fuel</option>
                <option value="Groceries">Groceries</option>
                <option value="Gadget">Gadget</option>
                <option value="Other">Other</option>
              </Form.Control>

              <Form.Label
                className={darkMode ? "mt-3 text-white" : "mt-3"}
                htmlFor="expense-amount"
              >
                <strong>Amount</strong>
              </Form.Label>
              <Form.Control
                type="number"
                min={1}
                id="expense-amount"
                placeholder="Enter the expense amount"
                ref={expenseAmountRef}
              />

              <Container className="m-0 mx-auto text-center mt-3">
                {isEdit ? (
                  <Button variant="outline-info" onClick={handleConfirmEdit}>
                    Confirm Edit
                  </Button>
                ) : (
                  <Button variant="info" type="submit">
                    Add Expense
                  </Button>
                )}
              </Container>
            </Form>
          </Col>
        </Row>
      </Container>

      <Expenses handleExpenseAutofill={handleExpenseAutofill} />
    </>
  );
};

export default ExpenseForm;

import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./Expenses.css";
import { expenseActions } from "../../store/expenses-slice";

const Expenses = ({ handleExpenseAutofill }) => {
  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expense.expenses);

  const totalExpenses = useSelector(
    (state) => state.expense.totalExpensesAmount
  );

  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleDeleteExpense = async (expense) => {
    try {
      const response = await fetch(
        `https://expense-tracker-5c1a4-default-rtdb.firebaseio.com/expenses/${localStorage.getItem(
          "userID"
        )}/${expense.id}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }
      dispatch(expenseActions.deleteExpense(expense));
    } catch (error) {
      alert(error.message);
    }
  };

  const expenseItems = expenses.map((expense) => (
    <tr key={expense.id}>
      <td>{expense.name}</td>
      <td>{expense.category}</td>
      <td>₹{expense.amount}</td>
      <td>
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => handleExpenseAutofill(expense)}
        >
          Edit
        </Button>
      </td>
      <td>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDeleteExpense(expense)}
        >
          Delete
        </Button>
      </td>
    </tr>
  ));

  return (
    <div className="expenses-table-container mx-auto mt-4">
      {totalExpenses > 0 && (
        <div className="table-responsive">
          <Table
            className="text-center align-items-center"
            variant={darkMode ? "dark" : "light"}
          >
            <thead>
              <tr>
                <th className="align-middle">Expense Name</th>
                <th className="align-middle">Category</th>
                <th className="align-middle">Amount</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>{expenseItems}</tbody>
            <tfoot>
              <tr>
                <td colSpan={5} className="align-middle text-end px-4">
                  <strong className="">Total Expenses: </strong> ₹
                  {totalExpenses}
                </td>
              </tr>
            </tfoot>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Expenses;

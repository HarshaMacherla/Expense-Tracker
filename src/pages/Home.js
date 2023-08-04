import { useSelector } from "react-redux";
import DarkTheme from "../components/DarkTheme";
import DownloadCsv from "../components/DownloadCsv";
import ExpenseForm from "../components/Expense/ExpenseForm";
import NavBar from "../components/Navigation/NavBar";

const Home = () => {
  const expenses = useSelector((state) => state.expense.expenses);

  return (
    <>
      <NavBar />
      <DarkTheme />
      <ExpenseForm />
      {expenses.length > 0 && <DownloadCsv />}
    </>
  );
};

export default Home;

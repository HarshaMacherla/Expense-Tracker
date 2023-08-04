import { Button, Container, NavLink, Navbar } from "react-bootstrap";
import ProfileButton from "./ProfileButton";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { expenseActions } from "../../store/expenses-slice";
import { userDataActions } from "../../store/userData-slice";

const NavBar = () => {
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.auth.loggedIn);

  const emailVerified = useSelector((state) => state.userData.emailVerified);

  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleRouteToHome = () => {
    history.push("/");
  };

  const handleVerifyUserEmail = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAa7TyUbpqm_Cnm2qCwF5FwS96ztOQYo2M",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: localStorage.getItem("token"),
          }),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }
      alert(
        "An email verification link has been sent to your registered email address. Please complete your email verification with in 10 minutes."
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
    dispatch(authActions.logout());
    dispatch(
      expenseActions.loadExpenses({ expenses: [], totalExpensesAmount: 0 })
    );
    dispatch(
      userDataActions.loadUserData({
        displayName: "",
        photoUrl: "",
        emailVerified: false,
      })
    );
    document.getElementsByTagName("body")[0].style.background = "white";
  };

  return (
    <Navbar
      className={
        darkMode
          ? "m-0 bg-secondary text-white align-items-center bg-dark"
          : "m-0 bg-secondary text-white align-items-center"
      }
    >
      <Container className="m-0">
        <Navbar.Brand className="brand-title-font text-white">
          <NavLink to="/" onClick={handleRouteToHome}>
            Expense Tracker
          </NavLink>
        </Navbar.Brand>
      </Container>

      <Container className="d-flex align-items-center justify-content-end px-2">
        {location.pathname !== "/profile" &&
          location.pathname !== "/password-reset" && <ProfileButton />}
        {location.pathname === "/profile" && !emailVerified && (
          <Button
            variant="danger"
            className="mx-1"
            onClick={handleVerifyUserEmail}
          >
            Verify Email
          </Button>
        )}
        {loggedIn && (
          <Button
            variant={darkMode ? "outline-light" : "dark"}
            className="mx-1"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;

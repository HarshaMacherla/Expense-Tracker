import { useDispatch, useSelector } from "react-redux";
import { themeActions } from "../store/darkTheme-slice";
import { Form } from "react-bootstrap";

const DarkTheme = () => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  const dispatch = useDispatch();

  if (darkMode) {
    document.getElementsByTagName("body")[0].style.background =
      "rgba(0, 0, 0, 0.57)";
  } else {
    document.getElementsByTagName("body")[0].style.background = "white";
  }

  const handleThemeToggle = () => {
    dispatch(themeActions.toggleThemeMode());
  };

  const theme = darkMode ? "Dark theme enabled" : "Light theme enabled";

  return (
    <div className="form-check form-switch m-2 ">
      <input
        className="form-check-input p-2"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckChecked"
        checked={darkMode}
        onChange={handleThemeToggle}
      />
      <Form.Label className={darkMode ? "text-white" : "text-dark"}>
        {theme}
      </Form.Label>
    </div>
  );
};

export default DarkTheme;

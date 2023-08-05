import { useState } from "react";

const ButtonClick = () => {
  const [changedText, setChangedText] = useState(false);

  const handleChangeText = () => {
    setChangedText(true);
  };

  return (
    <div>
      <h2>Hello, World!</h2>
      {!changedText && <p>Welcome to Expense Tracker</p>}
      {changedText && <p>Thanks for using our app</p>}
      <button onClick={handleChangeText}>Close</button>
    </div>
  );
};

export default ButtonClick;

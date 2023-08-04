import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ProfileButton = () => {
  const history = useHistory();

  const handleViewProfile = () => {
    history.push("/profile");
  };

  return (
    <Button className="mx-1" variant="warning" onClick={handleViewProfile}>
      Profile
    </Button>
  );
};

export default ProfileButton;

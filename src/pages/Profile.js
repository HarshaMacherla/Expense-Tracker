import { Button, Container, Form } from "react-bootstrap";
import NavBar from "../components/Navigation/NavBar";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userDataActions } from "../store/userData-slice";
import DarkTheme from "../components/DarkTheme";

const Profile = () => {
  const fullNameRef = React.useRef();
  const photoUrlRef = React.useRef();

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userData);

  const darkMode = useSelector((state) => state.theme.darkMode);

  const handleSaveUserData = async (event) => {
    event.preventDefault();

    const fullName = fullNameRef.current.value;
    const profilePhotoURL = photoUrlRef.current.value;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAa7TyUbpqm_Cnm2qCwF5FwS96ztOQYo2M",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: fullName,
            photoUrl: profilePhotoURL,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }

      const data = await response.json();
      dispatch(
        userDataActions.setUserData({
          displayName: data.displayName,
          photoUrl: data.photoUrl,
        })
      );
      alert("Details Updated Successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    const fillUserDataForm = async () => {
      fullNameRef.current.value = await userData.displayName;
      photoUrlRef.current.value = await userData.photoUrl;
    };

    fillUserDataForm();
  }, [userData.displayName, userData.photoUrl]);

  return (
    <>
      <NavBar />
      <DarkTheme />
      <Container className="mt-3">
        {(userData.displayName.length === 0 ||
          userData.photoUrl.length === 0) && (
          <p className="bg-warning text-white text-center border rounded">
            Your profile is incomplete. Please fill your details!
          </p>
        )}
      </Container>

      <Container className="border rounded p-3 m-5 mx-auto">
        <Form onSubmit={handleSaveUserData}>
          <Form.Label className={darkMode && "text-white"} htmlFor="fullName">
            Full Name
          </Form.Label>
          <Form.Control id="fullName" type="text" ref={fullNameRef} />

          <Form.Label
            className={darkMode ? "text-white mt-3" : "mt-3"}
            htmlFor="photoUrl"
          >
            Profile Photo URL
          </Form.Label>
          <Form.Control id="photoUrl" type="text" ref={photoUrlRef} />

          <Container className="text-center mt-3">
            <Button variant="info" type="submit">
              Update Profile
            </Button>
          </Container>
        </Form>
      </Container>
    </>
  );
};

export default Profile;

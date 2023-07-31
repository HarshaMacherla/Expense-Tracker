import React, { useEffect, useRef, useState } from "react";
import { Navbar, Container, Form, Row, Col, Button } from "react-bootstrap";
import "./Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth-slice";

const Profile = () => {
  const [showForm, setShowForm] = useState(true);

  const fullNameRef = useRef();
  const profilePhotoURLRef = useRef();

  const dispatch = useDispatch();

  const userData = useSelector((state) => state.userData);

  const darkMode = useSelector((state) => state.theme.darkMode);

  const incompleteUserData =
    !!userData.displayName.trim().length === 0 ||
    !!userData.photoUrl.trim().length === 0;

  useEffect(() => {
    const fillUserDataForm = async () => {
      fullNameRef.current.value = await userData.displayName;
      profilePhotoURLRef.current.value = await userData.photoUrl;
    };

    fillUserDataForm();
  }, [userData.displayName, userData.photoUrl]);

  const handleUpdate = async (event) => {
    event.preventDefault();

    const fullName = fullNameRef.current.value;
    const profilePhotoURL = profilePhotoURLRef.current.value;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAvBSC-wnMSr4LTyhMGqXtQdczeBxPzacw",
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
      console.log(data);
      alert("Details Updated Successfully");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const token = await localStorage.getItem("token");
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAvBSC-wnMSr4LTyhMGqXtQdczeBxPzacw",
        {
          method: "POST",
          body: JSON.stringify({ requestType: "VERIFY_EMAIL", idToken: token }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error.message);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(authActions.loggedOut());
  };
  return (
    <>
      <Navbar className="m-0 text-white bg-secondary">
        <Container>
          <h3>Winners never quit! Quitters never quit!</h3>
        </Container>
        <Container className="justify-content-end">
          {!userData.emailVerified && (
            <Button variant="danger" onClick={handleVerifyEmail}>
              Verify Email
            </Button>
          )}
          {incompleteUserData && (
            <p className="border rounded px-2 py-1 bg-light text-dark mt-2">
              Your profile is 64% complete. A complete Profile has higher
              chances of landing a job.{" "}
              <span onClick={() => setShowForm(true)}>Complete now</span>
            </p>
          )}
          <Button variant="dark" className="text-white" onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </Navbar>

      {showForm && (
        <Form onSubmit={handleUpdate} className="border-bottom rounded m-5 p-3">
          <Row>
            <Col>
              <h3 className={darkMode ? "pb-2 text-light" : "pb-2"}>
                Contact Details
              </h3>
            </Col>
            <Col className="text-right d-flex justify-content-end">
              <Button
                variant="outline-danger"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </Col>
          </Row>

          <Container className="m-0">
            <Form.Label htmlFor="fullName">Full Name</Form.Label>
            <Form.Control
              type="text"
              id="fullName"
              placeholder="Please Enter Your Full Name"
              ref={fullNameRef}
            ></Form.Control>

            <Form.Label className="mt-3" htmlFor="profileURL">
              Profile Photo URL
            </Form.Label>
            <Form.Control
              type="text"
              id="profileURL"
              placeholder="Paste the URL to Your Profile Picture"
              ref={profilePhotoURLRef}
            ></Form.Control>
          </Container>

          <Button className="mx-3 my-3" type="submit">
            Update
          </Button>
        </Form>
      )}
    </>
  );
};

export default Profile;

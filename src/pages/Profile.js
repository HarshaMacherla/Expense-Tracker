import React, { useRef, useState } from "react";
import { Navbar, Container, Form, Row, Col, Button } from "react-bootstrap";
import "./Profile.css";

const Profile = () => {
  const [showForm, setShowForm] = useState(true);

  const fullNameRef = useRef();
  const profilePhotoURLRef = useRef();

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

  return (
    <>
      <Navbar className="m-0 text-white bg-secondary">
        <Container>
          <h3>Winners never quit! Quitters never quit!</h3>
        </Container>
        <Container className="justify-content-end">
          <p className="border rounded px-2 py-1 bg-light text-dark mt-2">
            Your profile is 64% complete. A complete Profile has higher chances
            of landing a job.{" "}
            <span onClick={() => setShowForm(true)}>Complete now</span>
          </p>
        </Container>
      </Navbar>

      {showForm && (
        <Form onSubmit={handleUpdate} className="border-bottom rounded m-5 p-3">
          <Row>
            <Col>
              <h3 className="pb-2">Contact Details</h3>
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

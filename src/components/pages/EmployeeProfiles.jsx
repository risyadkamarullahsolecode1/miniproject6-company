import React, { useEffect, useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const EmployeeProfile = () => {
  const [profile, setProfile] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch employee details from the backend
    axios
      .get("/api/employee/details-employee")
      .then((response) => setProfile(response.data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleUpdate = () => {
    // Update profile information
    axios
      .put("/api/employee/update-profile", profile)
      .then(() => setSuccessMessage("Profile updated successfully!"))
      .catch((error) => console.error("Error updating profile:", error));
  };

  return (
    <div className="container">
      <h1>Employee Profile</h1>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="FirstName"
            value={profile.FirstName || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="LastName"
            value={profile.LastName || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="Address"
            value={profile.Address || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="PhoneNumber"
            value={profile.PhoneNumber || ""}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleUpdate}>
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default EmployeeProfile;

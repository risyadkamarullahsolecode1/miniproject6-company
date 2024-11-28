import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import EmployeeService from "../../service/EmployeeService"; // Import EmployeeService for API calls
import { toast } from "react-toastify"; // Use Toast for notifications
import DependantService from "../../service/DependantService";
import { useParams } from "react-router-dom";

const DependentManagement = () => {
  const {empno} = useParams();
  const [dependents, setDependents] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Relationship: "",
    Dob: "",
    Sex: "",
  });

  // Fetch dependents on component load
  useEffect(() => {
    DependantService.getDependentsByEmployee(empno) // Assuming you have an API endpoint to fetch dependents
      .then((response) => setDependents(response.data.Dependents || []))
      .catch((error) => {
        console.error("Error fetching dependents:", error);
        toast.error("Failed to load dependents.");
      });
  }, []);

  // Handle adding a new dependent
  const handleSave = async () => {
    try {
      const response = await EmployeeService.addDependentLogin(formData);
      toast.success(response.data.message); // Show success message
      setDependents([...dependents, formData]); // Update local state
      setShow(false); // Close the modal
    } catch (error) {
      console.error("Error adding dependent:", error);
      toast.error(
        error.response?.data?.error || "An error occurred while adding the dependent."
      );
    }
  };

  return (
    <div className="container">
      <h1>Manage Dependents</h1>
      <Button onClick={() => setShow(true)}>Add Dependent</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Sex</th>
            <th>Relationship</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {dependents.map((dependent, index) => (
            <tr key={index}>
              <td>{dependent.Name}</td>
              <td>{dependent.Sex}</td>
              <td>{dependent.Relationship}</td>
              <td>{dependent.Dob}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Dependent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="Name"
                value={formData.Name}
                onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Sex</Form.Label>
              <Form.Select
                name="Sex"
                value={formData.Sex}
                onChange={(e) => setFormData({ ...formData, Sex: e.target.value })}
              >
                <option value="">Select Sex</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Relationship</Form.Label>
              <Form.Control
                type="text"
                name="Relationship"
                value={formData.Relationship}
                onChange={(e) => setFormData({ ...formData, Relationship: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="Dob"
                value={formData.Dob}
                onChange={(e) => setFormData({ ...formData, Dob: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Dependent
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DependentManagement;

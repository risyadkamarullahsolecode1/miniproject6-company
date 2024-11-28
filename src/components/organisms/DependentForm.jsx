import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../atoms/Button';
import { Form } from 'react-bootstrap';
import DependantService from '../../service/DependantService';
import EmployeeService from '../../service/EmployeeService';

const DependentForm = ({ onDependentAdded }) => {
    const navigate = useNavigate();
    const { empNo } = useParams(); // Get employee ID from URL
    const [formData, setFormData] = useState({
        name: '',
        sex: '',
        dob: '',
        relationship: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false); // Prevent duplicate submissions

    
    console.log("empNo from URL:", empNo);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting form with data:", formData);
    
        if (!empNo) {
            console.error("Missing empNo from URL.");
            toast.error("Employee ID is missing. Please check the URL.");
            return;
        }
    
        try {
            console.log("Calling DependentService.addDependent...");
            await EmployeeService.addDependent(empNo, formData);
            toast.success("Dependent added successfully!");
            onDependentAdded(); // Optional callback to refresh data
            setFormData({ name: "", sex: "", dob: "", relationship: "" });
            navigate(`/employees/${empNo}`); 
        } catch (error) {
            console.error("Error adding dependent:", error.response || error.message);
            toast.error(
                error.response?.data?.message || "Failed to add dependent. Please try again."
            );
        }
    };
    
    
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sex</Form.Label>
                <Form.Control
                    as="select"
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </Form.Control>
            </Form.Group>
            <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Relationship</Form.Label>
                <Form.Control
                    type="text"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Button
                type="submit" // Ensure this is explicitly set
                variant="primary"
                disabled={isSubmitting} // Disable while submitting
            >
                {isSubmitting ? 'Submitting...' : 'Add Dependent'}
            </Button>

        </Form>
    );
};

export default DependentForm;

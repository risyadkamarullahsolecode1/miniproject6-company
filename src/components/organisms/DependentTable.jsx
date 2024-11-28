import React from 'react';
import { Table } from 'react-bootstrap';

const DependentTable = ({ dependents = [] }) => {
    if (dependents.length === 0) {
        return <p>No dependents available.</p>; // Show message when no dependents
    }

    return (
        <Table striped bordered hover responsive>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Sex</th>
                    <th>Date of Birth</th>
                    <th>Relationship</th>
                </tr>
            </thead>
            <tbody>
                {dependents.map((dependent) => (
                    <tr key={dependent.dependentNo}>
                        <td>{dependent.dependentName}</td> {/* Correct property name */}
                        <td>{dependent.sex}</td>
                        <td>{new Date(dependent.dateOfBirth).toLocaleDateString()}</td> {/* Correct property name */}
                        <td>{dependent.relationship}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default DependentTable;

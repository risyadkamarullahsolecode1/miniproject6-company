import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

const PublicInformation = () => {
  const [departments, setDepartments] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("/api/department/public")
      .then((response) => setDepartments(response.data))
      .catch((error) => console.error("Error fetching departments:", error));

    axios
      .get("/api/project/public")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <div className="container">
      <h1>Public Information</h1>
      <h2>Departments</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Department Name</th>
            <th>Manager</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((dept, index) => (
            <tr key={index}>
              <td>{dept.Name}</td>
              <td>{dept.Manager}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2>Projects</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((proj, index) => (
            <tr key={index}>
              <td>{proj.Name}</td>
              <td>{proj.DepartmentName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PublicInformation;

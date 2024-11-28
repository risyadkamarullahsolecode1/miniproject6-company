import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WorksOnService from '../../service/WorksOnService';
import { Table, Alert } from 'react-bootstrap';

const WorksOnDetails = () => {
    const { empno, projno } = useParams();
    const [workDetails, setWorkDetails] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await WorksOnService.get(empno, projno);
                setWorkDetails(response.data);
            } catch (err) {
                setError('Failed to fetch work details.');
            }
        };

        fetchDetails();
    }, [empno, projno]);

    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>Work Details</h2>
            {workDetails ? (
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td>Employee No</td>
                            <td>{workDetails.empno}</td>
                        </tr>
                        <tr>
                            <td>Project No</td>
                            <td>{workDetails.projno}</td>
                        </tr>
                        <tr>
                            <td>Date Worked</td>
                            <td>{new Date(workDetails.dateworked).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                            <td>Hours Worked</td>
                            <td>{workDetails.hoursworked}</td>
                        </tr>
                    </tbody>
                </Table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default WorksOnDetails;

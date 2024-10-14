import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import axiosInstance from '../../api/axiosInstance';
import '../../assets/css/ProcessTask.css'; // Import your custom CSS for better control

export const ProcessTask = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get("/process-instance/search?from=0");
                console.log("process data", response?.data);
                setData(response.data);
            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateTimeStr) => {
        if (!dateTimeStr) return '-';  // Handle missing dates gracefully
        const date = new Date(dateTimeStr);
        const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-12 mb-4 mb-md-0">
                    <div className="card">
                        <div className="table-responsive">
                            <div className="col-12 order-5">
                                <div className="card">
                                    <div className="card-header d-flex align-items-center justify-content-center">
                                        <div className="card-title mb-0">
                                            <h3 className="m-0 me-2">Process Task</h3>
                                        </div>
                                    </div>
                                    <div className="card-datatable table-responsive">
                                    <table className="table table-bordered table-hover">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>Index</th>
                                                    <th>Process Name</th>
                                                    <th>Category</th>
                                                    <th>Subcategory</th>
                                                    <th>Impact Area</th>
                                                    <th>Initiator</th>
                                                    <th>Subject</th>
                                                    <th>Started On</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {error ? (
                                                    <tr>
                                                        <td colSpan={9} className="text-center text-danger">
                                                            {error}
                                                        </td>
                                                    </tr>
                                                ) : data.length === 0 ? (
                                                    <tr>
                                                        <td colSpan={9} className="text-center">
                                                            No data available
                                                        </td>
                                                    </tr>
                                                ) : (
                                                    data.map((task, index) => {
                                                        const space = <div className="text-center"> - </div>;
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{task?.bpmnProcessId?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) || space}</td>
                                                                <td>{task?.variables?.category || space}</td>
                                                                <td>{task?.variables?.subcategory || space}</td>
                                                                <td>{task?.variables?.impactArea || space}</td>
                                                                <td>{task?.variables?.initiator || space}</td>
                                                                <td>{task?.variables?.subject || space}</td>
                                                                <td>{formatDate(task?.timestamp)}</td>
                                                                <td>
                                                                    <Link to={`/processtaskview/${task?.processInstanceKey}`}>
                                                                        <BsPencilSquare />
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

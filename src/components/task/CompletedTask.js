import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';
import { fetchCompletedTask } from '../../services/TaskService';

export const CompletedTask = () => {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    const handleCompletedTask = async () => {
        try {
            const response = await fetchCompletedTask();
            console.log("completed tasks", response);
            setCompletedTasks(response);
        } catch (err) {
            setError('Error fetching completed tasks'); // Set error if API call fails
        } finally {
            setLoading(false); // Set loading to false after API call completes
        }
    };

    useEffect(() => {
        handleCompletedTask();
    }, []);

    const formatDate = (dateTimeStr) => {
        if (!dateTimeStr) return " - ";
        const date = new Date(dateTimeStr);
        const options = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className="row">
            <div className="col-lg-12 mb-5 mb-md-0">
                <div className="card">
                    <div className="table-responsive text-nowrap">
                        <div className="col-12 order-6">
                            <div className="card">
                                <div className="card-header d-flex align-items-center justify-content-center">
                                    <div className="card-title mb-0">
                                        <h3 className="m-0 me-2">Completed Tasks</h3>
                                    </div>
                                </div>
                                <div className="card-datatable table-responsive">
                                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                        <div className="table-responsive">
                                            {loading ? (
                                                <div className="text-center p-3">Loading tasks...</div>
                                            ) : error ? (
                                                <div className="text-center text-danger p-3">{error}</div>
                                            ) : (
                                                <table className="table table-bordered table-hover">
                                                    <thead className="border-top">
                                                        <tr>
                                                            <th>Index</th>
                                                            <th>Name</th>
                                                            <th>Assignee</th>
                                                            <th>Process Id</th>
                                                            <th>Status</th>
                                                            <th>Started On</th>
                                                            <th>Ended On</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {completedTasks.length === 0 ? (
                                                            <tr>
                                                                <td colSpan={7} className="text-center">No data available</td>
                                                            </tr>
                                                        ) : (
                                                            completedTasks.map((task, index) => (
                                                                <tr key={task.taskId || index}> {/* Ensure a unique key */}
                                                                    <td>{index + 1}</td>
                                                                    <td>{task.taskId?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</td>
                                                                    <td>{task.assignee}</td>
                                                                    <td>{task.bpmnProcessId?.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</td>
                                                                    <td>{task.intent}</td>
                                                                    <td>{formatDate(task.creationTimestamp)}</td>
                                                                    <td>{formatDate(task.timestamp)}</td>
                                                                    <td>
                                                                        <Link to={`/completedtaskview/${task.userTaskKey}`}>
                                                                            <BsPencilSquare />
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        )}
                                                    </tbody>
                                                </table>
                                            )}
                                        </div>
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

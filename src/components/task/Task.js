import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTasks } from '../../services/TaskService';
import { BsPencilSquare } from 'react-icons/bs';

export const Task = () => {
    const [data, setData] = useState([]); // For holding task data
    const [error, setError] = useState(null); // Error handling should use an object, not an array

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchTasks();
                console.log('task data', response);
                setData(response); // Set data if successful
            } catch (error) {
                setError(error); // Set error object
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetch function on component mount
    }, []);

    return (
        <div>
            <div className="row">
                <div className="col-lg-12 mb-4 mb-md-0">
                    <div className="card">
                        <div className="table-responsive text-nowrap">
                            <div className="col-12 order-5">
                                <div className="card">
                                    <div className="card-header d-flex align-items-center justify-content-center">
                                        <div className="card-title mb-0">
                                            <h3 className="m-0 me-2">Task</h3>
                                        </div>
                                    </div>
                                    <div className="card-datatable table-responsive">
                                        <div
                                            id="DataTables_Table_0_wrapper"
                                            className="dataTables_wrapper dt-bootstrap5 no-footer"
                                        >
                                            <div className="table-responsive">
                                            <table className="table table-bordered table-hover">
                                                
                                                    <thead className="border-top">
                                                        <tr>
                                                            <th>Index</th>
                                                            <th>Taskname</th>
                                                            <th>Assignee</th>
                                                            <th>Priority</th>
                                                            <th>Subject</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {/* Error Display */}
                                                        {error ? (
                                                            <tr>
                                                                <td colSpan={5} style={{ textAlign: 'center', color: 'red' }}>
                                                                    {error.message || 'Error fetching tasks.'}
                                                                </td>
                                                            </tr>
                                                        ) : data.length === 0 ? (
                                                            // No Data Available Message
                                                            <tr>
                                                                <td colSpan={5} style={{ textAlign: 'center' }}>
                                                                    No data available
                                                                </td>
                                                            </tr>
                                                        ) : (
                                                            // Render data if available
                                                            data.map((task, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{task?.taskId || '-'}</td>
                                                                        <td>{task?.assignee || '-'}</td>
                                                                        <td>{task?.variables?.priority || '-'}</td>
                                                                        <td>{task?.variables?.subject || '-'}</td>
                                                                        <td>
                                                                            <Link to={`/taskview/${task.userTaskKey}`}>
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
            </div>
        </div>
    );
};

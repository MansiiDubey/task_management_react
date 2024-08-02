import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchTasks } from '../../services/TaskService';

export const Task = () => {

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchTasks();
                console.log("task data", response)
                setData(response);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
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
                                            className="dataTables_wrapper dt-bootstrap5 no-footer">
                                            <div className="table-responsive">
                                                <table className="dt-route-vehicles table dataTable no-footer dtr-column">
                                                    <thead className="border-top">
                                                        <tr>
                                                            <th>Taskname</th>
                                                            <th>Assignee</th>
                                                            <th>Priority</th>
                                                            <th>Subject</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            data.map((task, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <td>{task?.taskId}</td>
                                                                        <td>{task?.assignee}</td>
                                                                        <td>{task?.variables?.priority}</td>
                                                                        <td>{task?.variables?.subject}</td>
                                                                        <td>

                                                                            <Link to={`/taskview/${task.userTaskKey}`}>
                                                                                <button>Button</button>
                                                                            </Link>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
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
    )
}

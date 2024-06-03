import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance';
import { AiFillAmazonCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { BsPencilSquare } from 'react-icons/bs';

export const CompletedTask = () => {

    const [completedtasks, setCompletedtasks] = useState([]);

    const fetchCompletedTask = async () => {
        const response = await axiosInstance.get(`/user-task?status=COMPLETED&from=0`);
        console.log("completed task", response.data);
        setCompletedtasks(response.data);

    }
    useEffect(() => {
        fetchCompletedTask()
    }, [])

    return (

        <div className="row">
            <div className="col-lg-12 mb-5 mb-md-0">
                <div className="card">
                    <div className="table-responsive text-nowrap">
                        <div className="col-12 order-6">
                            <div className="card">
                                <div className="card-header d-flex align-items-center justify-content-center">
                                    <div className="card-title mb-0">
                                        <h3 className="m-0 me-2">CompletedTask</h3>
                                    </div>
                                </div>
                                <div className="card-datatable table-responsive">
                                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                        <div className="table-responsive">
                                            <table className="dt-route-vehicles table dataTable no-footer dtr-column">
                                                <thead className="border-top">
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Assignee</th>
                                                        <th>Process Id</th>
                                                        <th>Status</th>
                                                        {/* <th>Priority</th> */}
                                                        <th>Started On</th>
                                                        <th>Ended On</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {completedtasks.map((task,index)=> {
                                                    return(
                                                        <tr>
                                                        <td>{task.taskId}</td>
                                                        <td>{task.assignee}</td>
                                                        <td>{task.bpmnProcessId}</td>
                                                        <td>{task.intent}</td>
                                                        <td>{task.creationTimestamp}</td>
                                                        <td>{task.timestamp}</td>
                                                        <td>
                                                        <Link to={`/completedtaskview/${task.userTaskKey}`}>
                                                        <BsPencilSquare />
                                                            </Link>    
                                                            </td>
                                                    </tr>
                                                    )
                                                })}
                                                   
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
    )
}

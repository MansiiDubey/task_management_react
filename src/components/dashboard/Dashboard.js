import React, { useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import { fetchCompletedTaskData, fetchProcessCompletedData, fetchProcessInProgressData, fetchTaskInProgressData } from '../../services/DashboardService';

export const Dashboard = () => {

   
    const [completedTaskData, setCompletedTaskData] = useState([]);
    const [taskInProgress, setTaskInProgress] = useState([]);
    const [processInProgressData, setProcessInProgress] = useState([]);
    const [processCompletedData, setProcessCompletedData] = useState([]);



    useEffect(() => {
        const fetchDashboardData = async () => {
            try {

                const completedTaskResponse = await fetchCompletedTaskData();
                console.log("setCompletedTaskData", completedTaskResponse);
                setCompletedTaskData(completedTaskResponse)

                const taskInProgressResponse = await fetchTaskInProgressData();
                console.log("setTaskInProgress", taskInProgressResponse);
                setTaskInProgress(taskInProgressResponse)

                const processInProgressResponse = await fetchProcessInProgressData();
                console.log("setProcessInProgress", processInProgressResponse);
                setProcessInProgress(processInProgressResponse)

                const processCompletedResponse = await fetchProcessCompletedData();
                console.log("setProcessCompletedResponse", processCompletedResponse);
                setProcessCompletedData(processCompletedResponse)

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchDashboardData();
    }, []);

    return (
        <>
            <h3 className="py-3 mb-4">
                <span className="text-muted fw-light"></span> Dashboard
            </h3>
            {/* Card Border Shadow */}
            <div className="row">
                <div className="col-sm-6 col-lg-3 mb-4">
                    <div className="card card-border-shadow-primary h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2 pb-1">
                                <div className="avatar me-2">
                                    <span className="avatar-initial rounded bg-label-primary">
                                        {/* <i class="fa-solid fa-list-check"></i> */}
                                        <i className="bx bx-list-check" />
                                    </span>
                                </div>
                                <h3 className="ms-1 mb-0">Task</h3>
                            </div>
                            <h4>

                                {completedTaskData}
                            </h4>
                            {/* <p className="mb-1">On route vehicles</p>
                            <p className="mb-0">
                                <span className="fw-medium me-1">+18.2%</span>
                                <small className="text-muted">than last week</small>
                            </p> */}
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3 mb-4">
                    <div className="card card-border-shadow-warning h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2 pb-1">
                                <div className="avatar me-2">
                                    <span className="avatar-initial rounded bg-label-warning">
                                        <i className="bx bx-error" />
                                    </span>
                                </div>
                                <h3 className="ms-1 mb-0">Process</h3>
                            </div>
                            <h4>
                                {taskInProgress}
                            </h4>

                            {/* <p className="mb-1">Vehicles with errors</p>
                            <p className="mb-0">
                                <span className="fw-medium me-1">-8.7%</span>
                                <small className="text-muted">than last week</small>
                            </p> */}
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3 mb-4">
                    <div className="card card-border-shadow-danger h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2 pb-1">
                                <div className="avatar me-2">
                                    <span className="avatar-initial rounded bg-label-danger">
                                        <i className="bx bx-git-repo-forked" />
                                    </span>
                                </div>
                                <h3 className="ms-1 mb-0">Completed</h3>
                            </div>
                            <h4>
                                {processInProgressData}
                                </h4>

                            {/* <p className="mb-1">Deviated from route</p>
                            <p className="mb-0">
                                <span className="fw-medium me-1">+4.3%</span>
                                <small className="text-muted">than last week</small>
                            </p> */}
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3 mb-4">
                    <div className="card card-border-shadow-info h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2 pb-1">
                                <div className="avatar me-2">
                                    <span className="avatar-initial rounded bg-label-info">
                                        <i className="bx bx-time-five" />
                                    </span>
                                </div>
                                <h3 className="ms-1 mb-0">Comments</h3>
                            </div>
                            <h4>
                                {processCompletedData}
                            </h4>
                            {/* <p className="mb-1">Late vehicles</p>
                            <p className="mb-0">
                                <span className="fw-medium me-1">-2.5%</span>
                                <small className="text-muted">than last week</small>
                            </p> */}
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}

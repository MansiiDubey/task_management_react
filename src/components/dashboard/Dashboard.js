import React, { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { fetchCompletedTaskData, fetchProcessCompletedData, fetchProcessInProgressData, fetchTaskCompletionTimeData, fetchTaskInProgressData } from '../../services/DashboardService';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export const Dashboard = () => {
    const [completedTaskData, setCompletedTaskData] = useState(0);
    const [taskInProgress, setTaskInProgress] = useState(0);
    const [processInProgressData, setProcessInProgress] = useState(0);
    const [processCompletedData, setProcessCompletedData] = useState(0);
    const [taskCompletionTime, setTaskCompletionTime] = useState(0);

    const [chartData, setChartData] = useState({
        labels: ['Inprogress Tasks', 'Completed Tasks', 'Inprogress Request', 'Completed Request', 'Completion Time'],
        datasets: [
            {
                label: 'Items',
                data: [0, 0, 0, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            
            try {
                const taskInProgressResponse = await fetchTaskInProgressData();
                const completedTaskResponse = await fetchCompletedTaskData();
                const processInProgressResponse = await fetchProcessInProgressData();
                const processCompletedResponse = await fetchProcessCompletedData();
                const taskCompletionTimeResponse = await fetchTaskCompletionTimeData();


                setTaskInProgress(taskInProgressResponse);
                setCompletedTaskData(completedTaskResponse);
                setProcessInProgress(processInProgressResponse);
                setProcessCompletedData(processCompletedResponse);
                setTaskCompletionTime(taskCompletionTimeResponse);

                const updatedData = [
                    taskInProgressResponse,
                    completedTaskResponse,
                    processInProgressResponse,
                    processCompletedResponse,
                    taskCompletionTimeResponse
                ];

                setChartData((prevData) => ({
                    ...prevData,
                    datasets: [
                        {
                            ...prevData.datasets[0],
                            data: updatedData,
                        },
                    ],
                }));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchDashboardData();
    }, []);

    return (
        <>
            <h3 className="py-3 mb-4">
                <span className="text-muted fw-light"></span> Dashboard
            </h3>

            <div className="row">
                <div className="col-sm-6 col-lg-3 mb-4">
                    <div className="card card-border-shadow-primary h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2 pb-1">

                                <h5 className="ms-1 mb-0">Inprogress Tasks</h5>
                            </div>
                            <h5>{taskInProgress}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3 mb-4">
                    <div className="card card-border-shadow-warning h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2 pb-1">

                                <h5 className="ms-1 mb-0">Completed Tasks</h5>
                            </div>
                            <h5>{completedTaskData}</h5>
                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3 mb-4">
                    <div className="card card-border-shadow-danger h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2 pb-1">

                                <h5 className="ms-1 mb-0">Inprogress Request</h5>

                            </div>
                            <h5>{processInProgressData}</h5>


                        </div>
                    </div>
                </div>
                <div className="col-sm-6 col-lg-3 mb-4">
                    <div className="card card-border-shadow-info h-100">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-2 pb-1">

                                <h5 className="ms-1 mb-0">Completed Request</h5>
                            </div>
                            <h5>{processCompletedData}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-sm-6 col-lg-3 mb-4">
                <div className="card card-border-shadow-warning h-100">
                    <div className="card-body">
                        <div className="d-flex align-items-center mb-2 pb-1">

                            <h5 className="ms-1 mb-0">Completion Time</h5>
                        </div>
                        <h5>{taskCompletionTime}</h5>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className="col-sm-6">
                    <div className="card card-border-shadow-primary" style={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ width: 400, height: 250 }}> {/* Set the size of the pie chart */}
                            <Pie
                                data={chartData}
                                options={{
                                    maintainAspectRatio: false,
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'right', // Position the legend to the right side
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-sm-6">
                    <div className="card card-border-shadow-primary">
                        <Bar data={chartData} options={{
                            scales: {
                                y: {
                                    beginAtZero: true
                                }
                            }
                        }} />
                    </div>
                </div>
            </div>
        </>
    );
};

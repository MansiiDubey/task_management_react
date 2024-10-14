import axiosInstance from "../api/axiosInstance";

export const fetchCompletedTaskData = async () => {
    const response = await axiosInstance.get('/api/dashboard/completed-task');
    return response.data
}

export const fetchTaskInProgressData = async () => {
    const response = await axiosInstance.get('/api/dashboard/task/in-progress');
    return response.data
}

export const fetchProcessInProgressData = async () => {
    const response = await axiosInstance.get('/api/dashboard/process/in-progress');
    return response.data
}

export const fetchProcessCompletedData = async () => {
    const response = await axiosInstance.get('/api/dashboard/process/completed');
    return response.data
}

export const fetchTaskCompletionTimeData = async () => {
   const response = await axiosInstance.get('/api/dashboard/task/completion-time');
    return response.data;
  };

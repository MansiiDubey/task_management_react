import axiosInstance from "../api/axiosInstance";

export const fetchCompletedTask = async () => {
    const response = await axiosInstance.get(`/user-task?status=COMPLETED&from=0`);
    return response.data;
}

export const fetchCompletedTaskByTaskKey = async (taskKey) => {
    const response = await axiosInstance.get(`/user-task?status=COMPLETED&taskKey=${taskKey}&from=0`);
    return response;
}

export const fetchFormJsonByTaskName = async (taskName) => {
    try {
        const response = await fetch(`/src/components/json/${taskName}.json`);
        return response;
    } catch (error) {
        console.error('Error fetching form JSON by task name:', error);
        throw error;
    }
};

export const fetchTasks = async () => {
    try {
        const response = await axiosInstance.get('/user-task/my-tasks?from=0');
        return response.data;
    } catch (error) {
        console.error('Error fetching my-tasks:', error);
        throw error;
    }
}

export const fetchUserTaskByTaskKey = async (taskId) => {
    const response = await axiosInstance.get(`/user-task?from=0&taskKey=${taskId}`);
    return response;
}

export const submitTaskData = async (submission) => {
    const response = await axiosInstance.post("/process/start?processDefinitionId=process_incident_management", submission);
    return response;
}

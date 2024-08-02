import axiosInstance from "../api/axiosInstance";

export const createUsers = async (transformedValues) => {
    const response = await axiosInstance.post(`/api/auth/sign-up`, transformedValues);
    return response
}

export const fetchUserById = async (userId) => {
    const response = await axiosInstance.get(`/api/user?id=${userId}`);
    return response.data;
}

export const updateUserProfile = async (userId , transformedValues) => {
    const response = await axiosInstance.put(`/api/update-profile?id=${userId}`, transformedValues);
    return response;
}

export const fetchUserByUsername = async (username) => {
    const response = await axiosInstance.get(`/api/username?name=${username}`);
    return response.data;
}

export const fetchUsers = async () => {
    const response = await axiosInstance.get('/api/users');
    return response.data;
}

export const deleteUser = async (userId) => {
    const response = await axiosInstance.delete(`/api/user/${userId}`);
    return response;
}
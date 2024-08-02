import axiosInstance from "../api/axiosInstance";

export const fetchRoles = async () => {
    const response = await axiosInstance.get("/api/roles");
    return response.data
}

export const deleteRole = async (roleId) => {
    const response = await axiosInstance.delete(`/api/roles/${roleId}`);
    return response.data
}

export const createRoles = async (values) => {
    const response = await axiosInstance.post('/api/roles', values);
    return response
}

export const updateRoles = async (roleId,roleData) => {
    const response = await axiosInstance.put(`/api/roles/${roleId}`, roleData);
    return response
}

export const fetchRoleById = async (roleId) => {
    const response = await axiosInstance.get(`/api/roles/${roleId}`);
    return response.data
}

export const fetchRoleByUserId = async (usersId) => {
    const response = await  axiosInstance.get(`/api/roles/user/${usersId}`)
    return response.data
}
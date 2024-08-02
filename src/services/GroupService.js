import axiosInstance from "../api/axiosInstance";

export const fetchGroups = async () => {
    const response = await axiosInstance.get("/api/groups");
    return response.data
}

export const fetchGroupById = async (groupId) => {
    const response = await axiosInstance.get(`/api/groups/${groupId}`);
    return response.data
}

export const fetchGroupByUserId = async (usersId) => {
    const response = await axiosInstance.get(`/api/user/${usersId}/groups`)
    return response.data
}

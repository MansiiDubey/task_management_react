import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FaCirclePlus } from 'react-icons/fa6';
import { fetchRoleById } from '../../services/RoleService';
import { fetchGroupById } from '../../services/GroupService';
import { deleteUser, fetchUsers } from '../../services/UserService';

export const UserList = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetchUsers();
            const responseData = response;
            console.log("user list", responseData);

            const userWithRoles = await Promise.all(
                responseData.map(async (user) => {
                    try {
                        const roles = await Promise.all(
                            user.roleId.map(async (roleId) => {
                                try {
                                    const roleResponse = await fetchRoleById(roleId);
                                    return roleResponse.name;
                                } catch (error) {
                                    console.log("error in role", error);
                                }
                            })
                        );

                        const groups = await Promise.all(
                            user.group.map(async (groupId) => {
                                try {
                                    const groupResponse = await fetchGroupById(groupId);
                                    return groupResponse.name;
                                } catch (error) {
                                    console.log("error in group", error);
                                }
                            })
                        );
                        return { ...user, roles, groups };
                    } catch (error) {
                        console.log("error in role", error);
                    }
                })
            );

            console.log("userWithRoles", userWithRoles);

            setData(userWithRoles);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteUser = async (userId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this user?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await deleteUser(userId);
                fetchData();
                Swal.fire({
                    title: "Deleted!",
                    text: "The user has been deleted.",
                    icon: "success",
                    timer: 1500,
                });
            } catch (error) {
                console.error("Error deleting user:", error);
                Swal.fire({
                    title: "Error",
                    text: "An error occurred while deleting the user.",
                    icon: "error",
                    timer: 1500,
                });
            }
        }
    };

    const formatGroup = (group) => {
        if (Array.isArray(group)) {
            return group.join(', ');
        }
        return group; // Return the value directly if it's not an array
    };

    const formatRoles = (roles) => {
        if (Array.isArray(roles)) {
            return roles.join(', ');
        }
        return roles; // Return the value directly if it's not an array
    };

    return (
        <div className="row">
            <div className="col-lg-12 mb-4 mb-md-0">
                <div className="card">
                    <div className="table-responsive text-nowrap">
                        <div className="col-12 order-5">
                            <div className="card">
                                <div className="card-header d-flex align-items-center justify-content-between">
                                    <div className="card-title mb-0 mx-auto">
                                        <h3 className="m-0 me-2">User List</h3>
                                    </div>
                                    <Link to="/create-user">
                                        <button className="btn btn-primary">
                                            <FaCirclePlus style={{marginRight:"4px"}}/> Create
                                        </button>
                                    </Link>
                                </div>
                                <div className="card-datatable table-responsive">
                                    <div id="DataTables_Table_0_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                                        <div className="table-responsive">
                                            <table className="dt-route-vehicles table dataTable no-footer dtr-column">
                                                <thead className="border-top">
                                                    <tr>
                                                        <th>Username</th>
                                                        <th>Firstname</th>
                                                        <th>Lastname</th>
                                                        <th>Email</th>
                                                        <th>Group</th>
                                                        <th>Roles</th>
                                                        <th>Delete</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {data?.map((user, index) => (
                                                        <tr key={index}>
                                                            <td>{user.username}</td>
                                                            <td>{user.firstName}</td>
                                                            <td>{user.lastName}</td>
                                                            <td>{user.email}</td>
                                                            <td>{formatGroup(user.groups)}</td>
                                                            <td>{formatRoles(user.roles)}</td>
                                                            <td><button onClick={() => handleDeleteUser(user.userId)}>Delete</button></td>
                                                            <td>
                                                                <Link to={`/update-profile/${user.userId}`}>
                                                                    <button>Update</button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}
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
    );
};

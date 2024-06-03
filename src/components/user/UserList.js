import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { Link } from 'react-router-dom';

export const UserList = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get('/users');
                console.log("user list", response.data);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const formatGroup = (group) => {
        if (Array.isArray(group)) {
            return group.join(', ');
        }
        return group; // Return the value directly if it's not an array
    };

    const formatRoles = (roles) => {
        if (Array.isArray(roles)) {
            return roles.map(role => role.name).join(', ');
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
                                <div className="card-header d-flex align-items-center justify-content-center">
                                    <div className="card-title mb-0">
                                        <h3 className="m-0 me-2">User List</h3>
                                    </div>
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
                                                            <td>{formatGroup(user.group)}</td>
                                                            <td>{formatRoles(user.roles)}</td>
                                                            <td>
                                                                <Link to={`/updateprofile/${user.userId}`}>
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

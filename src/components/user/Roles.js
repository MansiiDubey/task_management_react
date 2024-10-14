import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteRole, fetchRoles } from '../../services/RoleService';
import { BsPencilSquare } from 'react-icons/bs';
import { RiDeleteBin5Line } from 'react-icons/ri';

export const Roles = () => {
    const [roles, setRoles] = useState([]);

    const getrole = async () => {
        try {
            const response = await fetchRoles();
            console.log("fetching roles", response);
            setRoles(response);
        } catch (error) {
            console.log("fetching roles error", error);
        }
    };

    useEffect(() => {
        getrole();
    }, []);

    // const deleteData = async (id) => {
    //     console.log("delete role", id);
    //     try {
    //         const response = await axiosInstance.delete(`/api/roles/${id}`);
    //         console.log("deleted roles", response.data);
    //         fetchrole();
    //     } catch (error) {
    //         console.error('Error deleting roles:', error);
    //     }
    // };

    const handleDeleteRole = async (roleId) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this role?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (result.isConfirmed) {
            try {
                await deleteRole(roleId);
                setRoles(roles.filter((role) => role.id !== roleId));
                Swal.fire({
                    title: "Deleted!",
                    text: "The role has been deleted.",
                    icon: "success",
                    timer: 1500,
                });
            } catch (error) {
                console.error("Error deleting role:", error);
                Swal.fire({
                    title: "Error",
                    text: "An error occurred while deleting the role.",
                    icon: "error",
                    timer: 1500,
                });
            }
        }
    };

    return (
        <div className="row">
            <div className="col-lg-12 mb-4 mb-md-0">
                <div className="card">
                    <div className="table-responsive">
                        <div className="col-12 order-5">
                            <div className="card">
                                <div className="card-header d-flex align-items-center justify-content-between">
                                    <div className="d-flex justify-content-center w-100 position-relative">
                                        <h3 className="m-0">Roles</h3>
                                        <Link to="/createroles" className="position-absolute end-0">
                                            <button className="btn btn-primary">Create</button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-datatable table-responsive">
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-hover">
                                            <thead className="thead-dark">
                                                <tr>
                                                    <th>Index</th>
                                                    <th>Name</th>
                                                    <th>Description</th>
                                                    <th>Delete</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {roles?.map((role, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{role.name}</td>
                                                        <td>{role.desc}</td>
                                                        <td>
                                                            <RiDeleteBin5Line onClick={() => handleDeleteRole(role.id)} />
                                                        </td>
                                                        <td>
                                                            <Link to={`/updateroles/${role.id}`}>
                                                                <BsPencilSquare />
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
    );
};

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { fetchRoleById, updateRoles } from '../../services/RoleService';

export const UpdateRoles = () => {
    const [roleData, setRoleData] = useState({
        name: '',
        desc: '',
    });
    const roleId = useParams().id;

    const navigate = useNavigate();

    const fetchRole = async () => {
        try {
            const response = await fetchRoleById(roleId);
            console.log("fetching roles", response.data);
            setRoleData(response);
        } catch (error) {
            console.log("fetching roles error", error);
        }
    }

    useEffect(() => {
        fetchRole();
    }, [roleId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateRoles(roleId,roleData);
            const responseData = response.data;
            console.log("response", responseData);

            if (response.status === 200) {
                Swal.fire({
                    title: "Update Role Successful",
                    icon: "success",
                    timer: 1500,
                });

                navigate("/roles");
            } else {
                Swal.fire({
                    title: "Error",
                    text: "An error occurred while creating roles",
                    icon: "error",
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Error:", error.message);
            Swal.fire({
                title: "Error",
                text: "An error occurred while creating roles",
                icon: "error",
                timer: 1500,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRoleData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="row">
            <div className="col-xl">
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-center align-items-center">
                        <h3 className="mb-0">Update Roles</h3>
                    </div>
                    <div className="card-body">
                        <form id="" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={roleData.name}
                                    onChange={handleChange}
                                    placeholder="Enter name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="description">
                                    Description
                                </label>
                                <input
                                    type="text"
                                    id="description"
                                    className="form-control"
                                    name="desc"
                                    value={roleData.desc}
                                    onChange={handleChange}
                                    placeholder="Enter description"
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

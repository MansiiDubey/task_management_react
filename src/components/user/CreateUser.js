import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userSchema } from '../../schemas';
import Swal from 'sweetalert2';
import { fetchRoles } from '../../services/RoleService';
import { fetchGroups } from '../../services/GroupService';
import Select from 'react-select';
import { createUsers } from '../../services/UserService';

export const CreateUser = () => {

    const initialValues = {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        group: [],
        roleId: [],
        address: "",
        city: "",
        state: "",
    }

    const [groups, setGroups] = useState([]);
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchGroupsAndRoles = async () => {
            try {
                const groupsResponse = await fetchGroups();
                const rolesResponse = await fetchRoles();
                setGroups(groupsResponse);
                setRoles(rolesResponse);
            } catch (error) {
                console.error("Error fetching groups and roles:", error);
            }
        };
        fetchGroupsAndRoles();
    }, []);

    const navigate = useNavigate();
    const { values, handleChange, handleSubmit, setFieldValue } =
        useFormik({
            initialValues: initialValues,
            // validationSchema: userSchema,
            onSubmit: async (values, { resetForm }) => {
                try {
                    const transformedValues = {
                        ...values,
                        roleId: values.roleId.map(role => role.value),
                        group: values.group.map(group => group.value),
                    };
                    console.log("transformedValues", transformedValues);
                    const response = await createUsers(transformedValues);
                    const responseData = response.data;
                    console.log("response", responseData);

                    if (response.status === 201) {
                        Swal.fire({
                            title: "Create Successful",
                            icon: "success",
                            timer: 1500,
                        });
                        
                        navigate("/user-list");
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "An error occurred while creating users",
                            icon: "error",
                            timer: 1500,
                        });
                    }
                } catch (error) {
                    console.error("Error:", error.message);
                    Swal.fire({
                        title: "Error",
                        text: "An error occurred while creating users",
                        icon: "error",
                        timer: 1500,
                    });
                } finally {
                    resetForm();
                }
            }
        });

        const handleRoleChange = selectedRoles => {            
            console.log("selectedRoles",selectedRoles)
            setFieldValue('roleId', selectedRoles);
        };
    
        const handleGroupChange = selectedGroups => {
            console.log("selectedGroups",selectedGroups)
            setFieldValue('group', selectedGroups);
        };

    return (
        <div className="row">
            <div className="col-xl">
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-center align-items-center">
                        <h3 className="mb-0">Create Users</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="name">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    placeholder="Enter username"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="description">
                                    Firstname
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter firstName"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="description">
                                    Lastname
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter lastName"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="description">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="description">
                                    Password
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="roles" className="form-label d-flex justify-content-between">Roles</label>
                                <Select
                                    id="roles"
                                    name="roleId"
                                    options={roles.map((role) => ({
                                        value: role.id,
                                        label: role.name,
                                    }))}
                                    isMulti
                                    value={values.roleId}
                                    onChange={handleRoleChange}
                                    classNamePrefix="react-select"
                                />

                            </div>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="group">
                                    Group
                                </label>
                                <Select
                                    id="group"
                                    name="group"
                                    options={groups.map((group) => ({
                                        value: group.id,
                                        label: group.name,
                                    }))}
                                    isMulti
                                    value={values.group}
                                    onChange={handleGroupChange}
                                    classNamePrefix="react-select"
                                />

                            </div>

                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="description">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={values.address}
                                    onChange={handleChange}
                                    placeholder="Enter address"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="description">
                                    City
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="city"
                                    value={values.city}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="description">
                                    State
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="state"
                                    value={values.state}
                                    onChange={handleChange}
                                    placeholder="Enter state"
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
    )
}

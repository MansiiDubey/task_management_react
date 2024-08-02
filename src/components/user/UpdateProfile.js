import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userProfileSchema } from '../../schemas';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { fetchRoles } from '../../services/RoleService';
import { fetchGroups } from '../../services/GroupService';
import { fetchUserById, updateUserProfile } from '../../services/UserService';

const initialValues = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    roles: [],
    group: [],
};

export const UpdateProfile = () => {
    const { id: userId } = useParams();
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [groups, setGroups] = useState([]);

    const fetchData = async () => {
        try {         

            const response = await fetchUserById(userId);
            const rolesResponse = await fetchRoles();
            const groupsResponse = await fetchGroups();
            const userData = response;

            setValues({
                username: userData.username,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                address: userData.address,
                city: userData.city,
                state: userData.state,
                password: "",
                roles: rolesResponse
                    .filter(role => userData.roleId.includes(role.id))
                    .map(role => ({ value: role.id, label: role.name })),
                group: groupsResponse
                    .filter(group => userData.group.includes(group.id))
                    .map(group => ({ value: group.id, label: group.name })),
            });

            setRoles(rolesResponse.map(role => ({ value: role.id, label: role.name })));
            setGroups(groupsResponse.map(group => ({ value: group.id, label: group.name })));
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, setValues } = useFormik({
        initialValues: initialValues,
        // validationSchema: userProfileSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                const transformedValues = {
                    ...values,
                    roleId: values.roles.map(role => role.value),
                    group: values.group.map(group => group.value),
                };
                console.log("transformedValues",transformedValues)
                const response = await updateUserProfile(userId, transformedValues);
                if (response.status === 200) {
                    Swal.fire({
                        title: "Update Successful",
                        icon: "success",
                        timer: 1500,
                    });
                    navigate("/user-list");
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "An error occurred while updating the profile",
                        icon: "error",
                        timer: 1500,
                    });
                }
            } catch (error) {
                console.error("Error:", error.message);
                Swal.fire({
                    title: "Error",
                    text: "An error occurred while updating the profile",
                    icon: "error",
                    timer: 1500,
                });
            } finally {
                resetForm();
            }
        },
    });

    const handleRoleChange = selectedRoles => {
        setFieldValue('roles', selectedRoles);
    };

    const handleGroupChange = selectedGroups => {
        setFieldValue('group', selectedGroups);
    };

    return (
        <div className="row">
            <div className="col-xl">
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-center align-items-center">
                        <h3 className="mb-0">Update Profile</h3>
                    </div>
                    <div className="card-body">
                        <form id="userprofile" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="username">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    value={values.username}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter username"
                                />
                                {errors.username && touched.username && (
                                    <div className="form-error" style={{ color: "red" }}>
                                        {errors.username}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    className="form-control"
                                    name="firstName"
                                    value={values.firstName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter first name"
                                    autoFocus
                                />
                                {errors.firstName && touched.firstName && (
                                    <div className="form-error" style={{ color: "red" }}>
                                        {errors.firstName}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="lastName"
                                    name="lastName"
                                    value={values.lastName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="Enter last name"
                                />
                                {errors.lastName && touched.lastName && (
                                    <div className="form-error" style={{ color: "red" }}>
                                        {errors.lastName}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="email">
                                    Email
                                </label>
                                <div className="input-group input-group-merge">
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter email"
                                    />
                                </div>
                                {errors.email && touched.email && (
                                    <div className="form-error" style={{ color: "red" }}>
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="address">
                                    Address
                                </label>
                                <div className="input-group input-group-merge">
                                    <input
                                        type="text"
                                        id="address"
                                        className="form-control"
                                        name="address"
                                        value={values.address}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter address"
                                    />
                                </div>
                                {errors.address && touched.address && (
                                    <div className="form-error" style={{ color: "red" }}>
                                        {errors.address}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="city">
                                    City
                                </label>
                                <div className="input-group input-group-merge">
                                    <input
                                        type="text"
                                        id="city"
                                        className="form-control"
                                        name="city"
                                        value={values.city}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter city"
                                    />
                                </div>
                                {errors.city && touched.city && (
                                    <div className="form-error" style={{ color: "red" }}>
                                        {errors.city}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="state">
                                    State
                                </label>
                                <div className="input-group input-group-merge">
                                    <input
                                        type="text"
                                        id="state"
                                        className="form-control"
                                        name="state"
                                        value={values.state}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter state"
                                    />
                                </div>
                                {errors.state && touched.state && (
                                    <div className="form-error" style={{ color: "red" }}>
                                        {errors.state}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="roles" className="form-label d-flex justify-content-between">Roles</label>
                                <Select
                                    id="roles"
                                    name="roles"
                                    options={roles}
                                    isMulti
                                    value={values.roles}
                                    onChange={handleRoleChange}
                                    classNamePrefix="react-select"
                                />
                                {errors.roles && touched.roles && (
                                    <div className="form-error" style={{ color: "red" }}>
                                        {errors.roles}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="group">
                                    Group
                                </label>
                                <Select
                                    id="group"
                                    name="group"
                                    options={groups}
                                    isMulti
                                    value={values.group}
                                    onChange={handleGroupChange}
                                    classNamePrefix="react-select"
                                />
                                {errors.group && touched.group && (
                                    <div className="form-error" style={{ color: "red" }}>
                                        {errors.group}
                                    </div>
                                )}
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

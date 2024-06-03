import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userProfileSchema } from '../../schemas';
import axiosInstance from '../../api/axiosInstance';
import Swal from 'sweetalert2';
import Select from 'react-select';
import axios from 'axios';

const initialValues = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    roles: [],
    group: [],
};

const groupOptions = [
    { value: 'IT', label: 'IT' },
    { value: 'Business', label: 'Business' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Sales', label: 'Sales' },
];

const rolesOptions = [
    { value: 'ADMIN', label: 'Admin', id: 1, desc: 'full access' },
    { value: 'USER', label: 'User', id: 2, desc: 'limited access' },
    { value: 'FRONTEND', label: 'Frontend', id: 3, desc: 'frontend access' },
    { value: 'BACKEND', label: 'Backend', id: 4, desc: 'backend access' },
];

export const UpdateProfile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { id: userId } = useParams();
    const navigate = useNavigate();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue, setValues } = useFormik({
        initialValues: initialValues,
        validationSchema: userProfileSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                console.log("submitted values", values);
                // Transform roles if needed
                const transformedValues = {
                    ...values,
                    roles: values.roles.map(roleValue => {
                        const role = rolesOptions.find(option => option.value === roleValue.value);
                        return {
                            id: role.id,
                            name: role.value,
                            desc: role.desc,
                        };
                    }),
                };
                console.log("transformedValues", transformedValues);
                const response = await axiosInstance.put(`/update-profile?id=${userId}`, transformedValues);
                if (response.status === 201) {
                    Swal.fire({
                        title: "Update Successful",
                        icon: "success",
                        timer: 1500,
                    });
                    navigate("/");
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

    const fetchData = async () => {
        try {
            const response = await axiosInstance.get(`/user?id=${userId}`);
            const userData = response.data;
            console.log("single user", userData);
            setValues({
                username: userData.username,
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: "",
                roles: userData.roleId,
                group: userData.group,
            });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleGroupChange = selectedOptions => {
        setFieldValue('group', selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    const handleRolesChange = selectedOptions => {
        setFieldValue('roles', selectedOptions ? selectedOptions : []);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
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
                            {/* <div className="mb-4">
                                <label htmlFor="roles" className="form-label d-flex justify-content-between">Roles</label>
                                <Select
                                    id="roles"
                                    name="roles"
                                    options={rolesOptions}
                                    isMulti
                                    value={values.roles}
                                    onChange={handleRolesChange}
                                    classNamePrefix="react-select"
                                    getOptionLabel={(option) => option.label}
                                    getOptionValue={(option) => option.value}
                                />
                                {errors.roles && touched.roles && (
                                    <div className="form-error" style={{ color: "red" }}>
                                        {errors.roles}
                                    </div>
                                )}
                            </div> */}
                            {/* <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="group">
                                    Group
                                </label>
                                <Select
                                    id="group"
                                    name="group"
                                    options={groupOptions}
                                    isMulti
                                    value={groupOptions.filter(option => values.group.includes(option.value))}
                                    onChange={handleGroupChange}
                                    classNamePrefix="react-select"
                                />
                                {errors.group && touched.group && (
                                    <div className="form-error" style={{ color: "red" }}>
                                        {errors.group}
                                    </div>
                                )}
                            </div> */}
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

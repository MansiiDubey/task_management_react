import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { userProfileSchema } from '../../schemas';
import axiosInstance from '../../api/axiosInstance';
import Swal from 'sweetalert2';
import Select from 'react-select';

const initialValues = {
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isActive: true,
    roles: [],
    group: [],
};

const groupOptions = [
    { value: 'HR', label: 'HR' },
    { value: 'IT', label: 'IT' },
    { value: 'business', label: 'Business' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'finance', label: 'Finance' },
    { value: 'sales', label: 'Sales' },
];

const rolesOptions = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
];

export const UserProfile  = () => {
    const [showPassword, setShowPassword] = useState(false);
    const userId = useParams().id;
    const navigate = useNavigate();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } =
        useFormik({
            initialValues: initialValues,
            validationSchema: userProfileSchema,
            onSubmit: async (values, { resetForm }) => {
                try {
                  console.log("values",values)
                    const payload = {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        isActive: values.isActive,
                        group: values.group,
                        roles: values.roles.map(role => ({
                            id: rolesOptions.find(r => r.value === role).id,
                            name: role.toUpperCase(),
                            desc: `${role} full access`,
                        })),
                    };
                    const response = await axiosInstance.post(`/api/auth/sign-up`, payload);
                    if (response.status === 201) {
                        Swal.fire({
                            title: "Create user Successful",
                            icon: "success",
                            timer: 1500,
                        });
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "An error occurred while updating profile",
                            icon: "error",
                            timer: 1500,
                        });
                    }
                } catch (error) {
                    console.error("Error:", error.message);
                    Swal.fire({
                        title: "Error",
                        text: "An error occurred while updating profile",
                        icon: "error",
                        timer: 1500,
                    });
                } finally {
                    resetForm();
                }
            }
        });

    const handleGroupChange = selectedOptions => {
        setFieldValue('group', selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    const handleRolesChange = selectedOptions => {
        setFieldValue('roles', selectedOptions ? selectedOptions.map(option => option.value) : []);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="row">
            <div className="col-xl">
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-center align-items-center">
                        <h3 className="mb-0">User Profile</h3>
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
                                <label className="form-label d-flex justify-content-between" htmlFor="password">
                                    Password
                                </label>
                                <div className="input-group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        className="form-control"
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="Enter password"
                                    />
                                    <span className="input-group-text cursor-pointer" onClick={toggleShowPassword}>
                                        <i className={showPassword ? "bx bx-show" : "bx bx-hide"}></i>
                                    </span>
                                </div>
                                {errors.password && touched.password && (
                                    <div className="form-error" style={{ color: "red" }}>
                                        {errors.password}
                                    </div>
                                )}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="roles" className="form-label d-flex justify-content-between">Roles</label>
                                <Select
                                    id="roles"
                                    name="roles"
                                    options={rolesOptions}
                                    isMulti
                                    value={rolesOptions.filter(option => values.roles.includes(option.value))}
                                    onChange={handleRolesChange}
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
}

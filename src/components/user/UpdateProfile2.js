import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axiosInstance from '../../api/axiosInstance';

const rolesOptions = [
    { value: 'ADMIN', label: 'Admin', id: 1, desc: 'full access' },
    { value: 'USER', label: 'User', id: 2, desc: 'limited access' },
    { value: 'FRONTEND', label: 'Frontend', id: 3, desc: 'frontend access' },
    { value: 'BACKEND', label: 'Backend', id: 4, desc: 'backend access' },
];

const groupOptions = [
    { value: 'IT', label: 'IT' },
    { value: 'Business', label: 'Business' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Sales', label: 'Sales' },
];

export const UpdateProfile2 = () => {
    const [userData, setUserData] = useState({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        roles: [],
        group: [],
    });

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        const response = await axiosInstance.get('/users');
        const responseData = response.data;
        console.log('response', responseData);
        setUserData(responseData);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('submit', userData);
        // You can add your update logic here
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="row">
            <div className="col-xl">
                <div className="card mb-4">
                    <div className="card-header d-flex justify-content-center align-items-center">
                        <h3 className="mb-0">Update Profile 2</h3>
                    </div>
                    <div className="card-body">
                        <form id="" onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="username">
                                    User Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="username"
                                    name="username"
                                    value={userData.username}
                                    onChange={handleChange}
                                    placeholder="Enter username"
                                />
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
                                    value={userData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    autoFocus
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    className="form-control"
                                    name="lastName"
                                    value={userData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    autoFocus
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    className="form-control"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email"
                                    autoFocus
                                />
                            </div>
                            <div className="mb-4">
                                <label className="form-label d-flex justify-content-between" htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="text"
                                    id="password"
                                    className="form-control"
                                    name="password"
                                    value={userData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    autoFocus
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

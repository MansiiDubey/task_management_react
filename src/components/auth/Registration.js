import { useFormik } from 'formik'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { registrationSchema } from '../../schemas'

const initialValues = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    roles:"ADMIN"
}

export const Registration = () => {
    
    const navigate = useNavigate();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialValues,
            validationSchema: registrationSchema,
            onSubmit: async (values, { resetForm }) => {
                try {
                    console.log("values", values);

                    const response = await axios.post("http://192.168.1.4:8087/api/auth/sign-up", values)
                    const responseData = response.data;
                    console.log("response", responseData);

                    if (response.status === 201) {
                        Swal.fire({
                            title: "Registration Successful",
                            icon: "success",
                            timer: 1500,
                        });
                        localStorage.setItem("token", responseData.token);
                        navigate("/login");

                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "An error occured while logging in",
                            icon: "error",
                            timer: 1500,
                        });
                    }
                } catch (error) {
                    console.error("Error:", error.message);
                    Swal.fire({
                        title: "Error",
                        text: "An error occured while logging in",
                        icon: "error",
                        timer: 1500,
                    });
                } finally {
                    resetForm();
                }
            }

        }
        )
    return (
        <div>
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner">
                        {/* <!-- Register Card --> */}
                        <div className="card">
                            <div className="card-body">
                                {/* <!-- Logo --> */}
                                <div className="app-brand justify-content-center">
                                    <a href="index.html" className="app-brand-link gap-2">
                                        <span className="app-brand-logo demo">

                                        </span>
                                        <span className="app-brand-text demo text-body fw-bolder">Registration</span>
                                    </a>
                                </div>
                                {/* <!-- /Logo --> */}
                                <h4 className="mb-2">Adventure starts here 🚀</h4>
                                <p className="mb-4">Make your app management easy and fun!</p>

                                <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                                <input
                                            type="hidden"
                                            className="form-control"
                                            id="roles"
                                            name="roles"
                                            value={values.roles}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoFocus
                                        />
                                    <div className="mb-3">
                                        <label htmlFor="username" className="form-label">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your username"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="firstName" className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            name="firstName"
                                            value={values.firstName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your firstname"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            name="lastName"
                                            value={values.lastName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your lastname"
                                            autoFocus
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input type="text" className="form-control"
                                            id="email" name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur} placeholder="Enter your email" />
                                    </div>
                                    <div className="mb-3 form-password-toggle">
                                        <label className="form-label" htmlFor="password">Password</label>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                aria-describedby="password"
                                            />
                                            <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                                            {errors.password && touched.password && (
                                                <div className="form-error" style={{ color: "red" }}>
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="terms-conditions" name="terms" />
                                            <label className="form-check-label" htmlFor="terms-conditions">
                                                I agree to
                                                <a href="#">privacy policy & terms</a>
                                            </label>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary d-grid w-100" type="submit">Sign up</button>
                                </form>

                                <p className="text-center">
                                    <span>Already have an account?</span>
                                    <Link to='/login'>
                                        <span>Sign in instead</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                        {/* <!-- Register Card --> */}
                    </div>
                </div>
            </div>
        </div>

    )
}

import { useFormik } from 'formik'
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { loginSchema } from '../../schemas';


const initialValues = {
    username: "",
    password: "",
};

export const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit ,isSubmitting } =
        useFormik({
            initialValues: initialValues,
            validationSchema: loginSchema,
            onSubmit: async (values, { resetForm }) => {
                try {
                    console.log("values", values);
                    const response = await axiosInstance.post('/api/auth/login', values);
                    // localStorage.setItem("profile", values.username);
                    const responseData = response.data;
                    console.log("response", responseData);

                    if (response.status === 200) {
                        Swal.fire({
                            title: "Login Successful",
                            icon: "success",
                            timer: 1500,
                        });
                        localStorage.setItem("token", responseData.token);
                        navigate("/");
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "An error occurred while logging in",
                            icon: "error",
                            timer: 1500,
                        });
                    }
                } catch (error) {
                    console.error("Error:", error.message);
                    Swal.fire({
                        title: "Error",
                        text: "An error occurred while logging in",
                        icon: "error",
                        timer: 1500,
                    });
                } finally {
                    resetForm();
                }
            }
        });

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div>
            <div className="container-xxl">
                <div className="authentication-wrapper authentication-basic container-p-y">
                    <div className="authentication-inner">
                        {/* <!-- Register --> */}
                        <div className="card">
                            <div className="card-body">
                                {/* <!-- Logo --> */}
                                <div className="app-brand justify-content-center">
                                    <a href="index.html" className="app-brand-link gap-2">
                                        <span className="app-brand-logo demo">
                                            {/* Logo can be added here */}
                                        </span>
                                        <span className="app-brand-text demo text-body fw-bolder">Login</span>
                                    </a>
                                </div>
                                {/* <!-- /Logo --> */}
                                {/* <h4 className="mb-2">Welcome to Sneat! 👋</h4> */}
                                <p className="mb-4">Please sign-in to your account and start the adventure</p>

                                <form id="formAuthentication" className="mb-3" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email or Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            name="username"
                                            // value="Hardik"
                                            value={values.username}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            placeholder="Enter your email or username"
                                            autoFocus
                                        />
                                        {errors.username && touched.username && (
                                            <div className="form-error" style={{ color: "red" }}>
                                                {errors.username}
                                            </div>
                                        )}
                                    </div>
                                    <div className="mb-3 form-password-toggle">
                                        <div className="d-flex justify-content-between">
                                            <label className="form-label" htmlFor="password">Password</label>
                                            <a href="auth-forgot-password-basic.html">
                                                <small>Forgot Password?</small>
                                            </a>
                                        </div>
                                        <div className="input-group input-group-merge">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                id="password"
                                                className="form-control"
                                                name="password"
                                                value={values.password}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                                                aria-describedby="password"
                                            />
                                            <span className="input-group-text cursor-pointer" onClick={toggleShowPassword}>
                                                <i className={showPassword ? "bx bx-show" : "bx bx-hide"}></i>
                                            </span>
                                            {errors.password && touched.password && (
                                                <div className="form-error" style={{ color: "red" }}>
                                                    {errors.password}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" id="remember-me" />
                                            <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <button className="btn btn-primary d-grid w-100" type="submit" disabled={isSubmitting}>Sign in</button>
                                    </div>
                                </form>

                                <p className="text-center">
                                    <span>New on our platform?</span>
                                    <Link to='/'>
                                        <span>Create an account</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                        {/* <!-- /Register --> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

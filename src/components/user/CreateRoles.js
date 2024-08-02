import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { roleSchema } from '../../schemas';
import Swal from 'sweetalert2';
import { createRoles } from '../../services/RoleService';

export const CreateRoles = () => {

    const initialValues = {
        name: "",
        desc: "",
    };

    const navigate = useNavigate();
    const { values, handleChange, handleSubmit } =
        useFormik({
            initialValues: initialValues,
            validationSchema: roleSchema,
            onSubmit: async (values, { resetForm }) => {
                try {
                    console.log("values", values);
                    const response = await createRoles(values);
                    const responseData = response.data;
                    console.log("response", responseData);

                    if (response.status === 200) {
                        Swal.fire({
                            title: "Create Successful",
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
                } finally {
                    resetForm();
                }
            }
        });
    
  return (
    <div className="row">
    <div className="col-xl">
        <div className="card mb-4">
            <div className="card-header d-flex justify-content-center align-items-center">
                <h3 className="mb-0">Create Roles</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label d-flex justify-content-between" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={values.name}
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
                            className="form-control"
                            name="desc"
                            value={values.desc}
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
  )
}

import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    username: Yup.string().min(3, "Username must be at least 3 characters").max(50, "Username must be at most 50 characters").required("Username is required"),
    password: Yup.string().min(3, "Password must be at least 6 characters").required("Password is required"),
});

export const registrationSchema = Yup.object().shape({
    username: Yup.string().min(3, "Username must be at least 3 characters").max(50, "Username must be at most 50 characters").required("Username is required"),
    firstname: Yup.string().min(3, "Firstname must be at least 3 characters").max(50, "Firstname must be at most 50 characters").required("Firstname is required "),
    lastname: Yup.string().min(3, "Lastname must be at least 3 characters").max(50, "Lastname must be at most 50 characters").required("Lastname is required "),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
});


export const userProfileSchema = Yup.object().shape({
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters'),
  
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters'),
  
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters'),
  
  password: Yup.string()
    .required('Password is required')
    .min(3, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters'),
  
  email: Yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  
  roles: Yup.array()
  .of(Yup.string())
  .min(1, 'At least one roles must be selected'),
  
  group: Yup.array()
    .of(Yup.string())
    .min(1, 'At least one group must be selected')
});



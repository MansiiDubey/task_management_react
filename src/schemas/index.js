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
  username: Yup.string().min(3, "Username must be at least 3 characters").max(50, "Username must be at most 50 characters").required("Username is required"),
  firstName: Yup.string().min(2, "First name must be at least 2 characters").max(50, "First name must be at most 50 characters").required("First name is required"),
  lastName: Yup.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be at most 50 characters").required("Last name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  group: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required("Group ID is required"),
      label: Yup.string().required("Group name is required"),
    })
  ).min(1, "At least one group is required").required("Group is required"),
  roleId: Yup.array().of(
    Yup.object().shape({
      value: Yup.string().required("Role ID is required"),
      label: Yup.string().required("Role name is required"),
    })
  ).min(1, "At least one role is required").required("Role is required"),
  address: Yup.string().min(5, "Address must be at least 5 characters").max(100, "Address must be at most 100 characters").required("Address is required"),
  city: Yup.string().min(2, "City must be at least 2 characters").max(50, "City must be at most 50 characters").required("City is required"),
  state: Yup.string().min(2, "State must be at least 2 characters").max(50, "State must be at most 50 characters").required("State is required"),
});



export const roleSchema = Yup.object().shape({
  name: Yup.string().required('Role name is required'),
  desc: Yup.string().required('Description is required'),
});


//   username: Yup.string().min(3, "Username must be at least 3 characters").max(50, "Username must be at most 50 characters").required("Username is required"),
//   firstName: Yup.string().min(2, "First name must be at least 2 characters").max(50, "First name must be at most 50 characters").required("First name is required"),
//   lastName: Yup.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be at most 50 characters").required("Last name is required"),
//   email: Yup.string().email("Invalid email format").required("Email is required"),
//   group: Yup.array().of(
//     Yup.object().shape({
//       value: Yup.string().required("Group ID is required"),
//       label: Yup.string().required("Group name is required"),
//     })
//   ).min(1, "At least one group is required").required("Group is required"),
//   roleId: Yup.array().of(
//     Yup.object().shape({
//       value: Yup.string().required("Role ID is required"),
//       label: Yup.string().required("Role name is required"),
//     })
//   ).min(1, "At least one role is required").required("Role is required"),
//   address: Yup.string().min(5, "Address must be at least 5 characters").max(100, "Address must be at most 100 characters").required("Address is required"),
//   city: Yup.string().min(2, "City must be at least 2 characters").max(50, "City must be at most 50 characters").required("City is required"),
//   state: Yup.string().min(2, "State must be at least 2 characters").max(50, "State must be at most 50 characters").required("State is required"),
// });

export const userSchema = Yup.object().shape({
  username: Yup.string().min(3, "Username must be at least 3 characters").max(50, "Username must be at most 50 characters").required("Username is required"),
  firstName: Yup.string().min(2, "First name must be at least 2 characters").max(50, "First name must be at most 50 characters").required("First name is required"),
  lastName: Yup.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be at most 50 characters").required("Last name is required"),
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  group: Yup.array().of(Yup.object().shape({
      value: Yup.string().required("Group ID is required"),
      label: Yup.string().required("Group name is required")
  })).min(1, "At least one group is required").required("Group is required"),
  roleId: Yup.array().of(Yup.object().shape({
      value: Yup.string().required("Role ID is required"),
      label: Yup.string().required("Role name is required")
  })).min(1, "At least one role is required").required("Role is required"),
  address: Yup.string().min(5, "Address must be at least 5 characters").max(100, "Address must be at most 100 characters").required("Address is required"),
  city: Yup.string().min(2, "City must be at least 2 characters").max(50, "City must be at most 50 characters").required("City is required"),
  state: Yup.string().min(2, "State must be at least 2 characters").max(50, "State must be at most 50 characters").required("State is required"),
});
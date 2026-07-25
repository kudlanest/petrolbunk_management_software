import * as Yup from "yup";

const registerValidation = Yup.object({

  fullName: Yup.string()
    .trim()
    .required("Full Name is required")
    .min(3, "Full Name must be at least 3 characters")
    .max(50, "Full Name cannot exceed 50 characters")
    .matches(
      /^[A-Za-z ]+$/,
      "Only alphabets and spaces are allowed"
    ),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),

  phone: Yup.string()
    .required("Mobile Number is required")
    .matches(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit mobile number"
    ),

  employeeId: Yup.string()
    .trim()
    .required("Employee ID is required")
    .matches(
      /^[A-Za-z0-9]+$/,
      "Employee ID must contain only letters and numbers"
    ),

  username: Yup.string()
    .trim()
    .required("Username is required")
    .min(4, "Username must be at least 4 characters")
    .max(20, "Username cannot exceed 20 characters"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain one uppercase letter")
    .matches(/[a-z]/, "Must contain one lowercase letter")
    .matches(/[0-9]/, "Must contain one number")
    .matches(
      /[@$!%*?&]/,
      "Must contain one special character"
    ),

  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf(
      [Yup.ref("password")],
      "Passwords do not match"
    ),

  role: Yup.string()
    .required("Please select a role"),

  terms: Yup.boolean()
    .oneOf(
      [true],
      "You must accept the Terms & Conditions"
    ),

});

export default registerValidation;
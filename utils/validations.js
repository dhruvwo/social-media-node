const yup = require("yup");

const validationSchema = {
  firstname: yup
    .string()
    .required("Firstname is required")
    .min(2, "Firstname must be at least 2 characters")
    .max(15, "Firstname must be at most 15 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Firstname must contain only alphanumeric characters"
    ),
  lastname: yup
    .string()
    .required("Lastname is required")
    .min(2, "Lastname must be at least 2 characters")
    .max(15, "Lastname must be at most 15 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Lastname must contain only alphanumeric characters"
    ),
  username: yup
    .string()
    .matches(
      /^[a-z][a-z0-9_]*$/,
      "Enter only Alphanumeric or lowercase characters"
    )
    .min(6, "Username is too short - should be 2 chars minimum")
    .max(30, "Username is too long - should be 30 chars maximum")
    .required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "The password must be at least 8 characters")
    .max(15, "The password can be at most 15 characters"),
  isPrivate: yup.boolean().required("Private account or not is required."),
};

module.exports = validationSchema;

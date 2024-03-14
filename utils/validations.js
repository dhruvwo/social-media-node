const yup = require("yup");

const validationSchema = {
  firstname: yup
    .string()
    .required("Firstname is required")
    .min(2, "Firstname must be at least 2 characters")
    .max(15, "Firstname must be at most 15 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Firstname must contain only alphanumeric characters."
    ),
  lastname: yup
    .string()
    .required("Lastname is required")
    .min(2, "Lastname must be at least 2 characters")
    .max(15, "Lastname must be at most 15 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Lastname must contain only alphanumeric characters."
    ),
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required"),
  username: yup
    .string()
    .matches(
      /^[a-z][a-z0-9_]*$/,
      "Username must contain only alphanumeric characters."
    )
    .min(6, "Username is too short - should be 6 chars minimum")
    .max(30, "Username is too long - should be 30 chars maximum")
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "The password must be at least 8 characters")
    .max(15, "The password can be at most 15 characters"),
  isPrivate: yup.boolean().required("Private or not is required."),
  filePath: yup.string(),
  title: yup.string().required("Post title is required."),
  description: yup.string(),
};

module.exports = validationSchema;

const userModel = require("../models/users.model");
const bcrypt = require("bcrypt");
const yup = require("yup");
const HttpError = require("../utils/HttpError");
const config = require("../config");
const jwt = require("jsonwebtoken");
const {
  firstname,
  lastname,
  username,
  email,
  password,
  isPrivate,
} = require("../utils/validations");

const CREATE_USER_VALIDATION = yup.object({
  firstname,
  lastname,
  username,
  email,
  password,
  isPrivate,
});

const signUp = async (req, res, next) => {
  try {
    await CREATE_USER_VALIDATION.validate(req.body);
    const userDocument = new userModel({
      ...req.body,
      email: req.body.email.toLowerCase(),
      password: bcrypt.hashSync(req.body.password, 10),
    });
    await userDocument.save();
    return res
      .status(201)
      .json({ status: "success", message: "User signed up successfully." });
  } catch (e) {
    next(e);
  }
};

const LOGIN_USER_SCHEMA = yup.object({
  email,
  password,
});

const login = async (req, res, next) => {
  try {
    await LOGIN_USER_SCHEMA.validate(req.body);
    const { email, password } = req.body;
    const user = await userModel
      .findOne(
        { email },
        {
          _id: 1,
          firstname: 1,
          lastname: 1,
          username: 1,
          email: 1,
          password: 1,
          isVerified: 1,
        }
      )
      .lean();
    if (!user) {
      throw new HttpError(404, "User not found.");
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new HttpError(403, "Email or password does not match.");
    }
    // if (!user.isVerified) {
    //   throw new HttpError(401, "Account not verified.");
    // }
    delete user.password;
    const accessToken = jwt.sign(user, config.jwtSecret, {
      expiresIn: "24h",
    });
    return res
      .status(200)
      .json({ success: true, data: { ...user, accessToken } });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  signUp,
  login,
};

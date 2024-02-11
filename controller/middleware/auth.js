const config = require("../../config");
const userModel = require("../../models/users.model");
const HttpError = require("../../utils/HttpError");
const jwt = require("jsonwebtoken");

const authorizeUser = async (req, res, next) => {
  try {
    const header = req.headers["authorization"] || null;
    const token = header.split(" ")[1];
    if (!header || !token) {
      throw new HttpError(400, "Token not provided.");
    }
    jwt.verify(token, config.jwtSecret, (err, data) => {
      if (err) {
        throw new HttpError(401, "Invalid token or token expired.");
      }
      const user = userModel.findOne({ _id: data._id });
      if (!user) {
        throw new HttpError(404, "User not found.");
      }
      if (!user.isVerified) {
        throw new HttpError(401, "User not verified.");
      }
      req.user = data;
      next();
    });
  } catch (e) {
    next(e);
  }
};

module.exports = authorizeUser;

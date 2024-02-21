const HttpError = require("./HttpError");

const errorHandler = async (error, req, res, next) => {
  // console.log(error, ":::: in Handler");
  if (error instanceof HttpError) {
    return res
      .status(error.code)
      .json({ status: "error", message: error.message });
  }

  if (error.name === "ValidationError") {
    return res
      .status(400)
      .json({ status: "Validation Error", message: error.message });
  }

  if (error.name === "MongoServerError" && error.code === 11000) {
    if (error.keyPattern && error.keyPattern.email) {
      return res
        .status(409)
        .json({ status: "error", message: "Email already exists." });
    } else if (error.keyPattern && error.keyPattern.username) {
      return res
        .status(409)
        .json({ status: "error", message: "Username already taken." });
    } else {
      return res
        .status(400)
        .json({ error: "Duplicate key error", message: error.message });
    }
  }

  return res
    .status(500)
    .send({ status: "error", message: "Internal server error" });
};

module.exports = errorHandler;

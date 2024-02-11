const userModel = require("../models/users.model");
const yup = require("yup");
const { firstname, lastname, username } = require("../utils/validations");
const HttpError = require("../utils/HttpError");

const getUser = async (req, res, next) => {
  try {
    const userJson = await userModel.findOne(
      { _id: req.user._id },
      {
        password: 0,
        otp: 0,
        otpExpiredAt: 0,
        isVerified: 0,
      }
    );
    return res.status(200).json({
      status: "success",
      data: userJson,
    });
  } catch (e) {
    next(e);
  }
};

const UPDATE_USER_SCHEMA = yup.object({
  firstname,
  lastname,
  username,
  profilePhoto: yup.string(),
});

const updateUser = async (req, res, next) => {
  try {
    delete req.body.email;
    delete req.body.password;
    delete req.body.otp;
    delete req.body.otpExpiredAt;
    delete req.body.isVerified;

    await UPDATE_USER_SCHEMA.validate(req.body);
    const { _id } = req.user;
    const newUserData = await userModel.findByIdAndUpdate(
      _id,
      { ...req.body, updatedAt: new Date().toISOString() },
      {
        new: true,
        select: "-password -otp -otpExpiredAt",
      }
    );

    if (!newUserData) {
      throw new HttpError(404, "User not found.");
    }
    return res.status(200).json({ status: "success", data: newUserData });
  } catch (e) {
    next(e);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      throw new HttpError(400, "User id not provided.");
    }
    const getUserProfile = await userModel.findOne({ _id: userId });
    if (!getUserProfile) {
      throw new HttpError(404, "User not found.");
    }
    const { firstname, lastname, username, isPrivate } = getUserProfile;
    return res.send({
      status: "success",
      data: { firstname, lastname, username, isPrivate },
    });
  } catch (e) {
    next(e);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    let { page, perPage, search } = req.query;

    page = page && page > 0 ? page : 1;
    perPage = perPage && perPage > 0 ? perPage : 5;

    let searchQuery = { $match: { isVerified: true } };

    if (search) {
      searchQuery.$match.$or = [
        { firstname: { $regex: req.query.searchText, $options: "i" } },
        { lastname: { $regex: req.query.searchText, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: { $concat: ["$firstname", " ", "$lastname"] },
              regex: req.query.searchText,
              options: "i",
            },
          },
        },
      ];
    }

    const users = await userModel
      .find(searchQuery, {
        _id: 1,
        firstname: 1,
        lastname: 1,
        username: 1,
        email: 1,
        isPrivate: 1,
      })
      .skip(page * perPage)
      .limit(perPage)
      .sort({ created_at: "desc" });

    return res.status(200).send({
      status: "success",
      data: users,
    });
  } catch (e) {
    next(e);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await userModel.deleteOne(req.user._id);
    res
      .status(200)
      .json({ status: "success", message: "User deleted successfully." });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUser,
  updateUser,
  getUserProfile,
  getAllUsers,
  deleteUser,
};

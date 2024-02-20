const postModal = require("../models/posts.modal");
const yup = require("yup");
const {
  filePath,
  title,
  description,
  isPrivate,
} = require("../utils/validations");

const CREATE_POST_VALIDATION_SCHEMA = yup.object({
  filePath,
  title,
  description,
  isPrivate,
});

const createPost = async (req, res, next) => {
  try {
    await CREATE_POST_VALIDATION_SCHEMA.validate(req.body);
    const createdPost = await postModal.create({
      userId: req.user._id,
      ...req.body,
    });
    return res.status(201).json({
      status: "success",
      data: createdPost,
    });
  } catch (e) {
    next(e);
  }
};

const getFeedPost = async (req, res, next) => {
  try {
    let { page, perPage, search } = req.query;

    page = page && page > 0 ? Number(page) - 1 : 0;
    perPage = perPage && perPage > 0 ? perPage : 5;

    let searchQuery = { isPrivate: false };
    if (search) {
      searchQuery.title = {
        $regex: req.query.search,
        $options: "i",
      };
    }
    if (req.query.isMyPostsOnly) {
      const userId = req.user._id;
      searchQuery.userId = userId;
    }
    if (req.query.isPrivate) {
      searchQuery.isPrivate = req.query.isPrivate == "true";
    }
    const totalPosts = await postModal.countDocuments(searchQuery);
    const getPosts = await postModal
      .find(searchQuery)
      .skip(page * perPage)
      .limit(perPage)
      .sort({ createdAt: "desc" });
    return res.status(200).json({
      status: "success",
      data: {
        total: totalPosts,
        data: getPosts,
      },
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createPost,
  getFeedPost,
};

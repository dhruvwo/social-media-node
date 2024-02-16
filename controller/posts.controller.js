const postModal = require("../models/posts.modal");

const createPost = async (req, res) => {
  try {
    const { title, description, isPrivate } = req.body;
    const mediaLink = req.file?.id;
    const postCreate = await postModal.create({
      userId: req.user._id,
      title,
      description,
      isPrivate,
      mediaLink,
    });
    return res.status(201).send({
      data: postCreate,
    });
  } catch (e) {
    next(e);
  }
};

const getFeedPost = async (req, res) => {
  try {
    let { pageSize, pageNumber } = req.query;
    pageNumber = pageNumber !== 0 && pageNumber ? pageNumber - 1 : 0;
    pageSize = pageSize ?? 5;
    const findObj = { isPrivate: false };
    if (req.query.search) {
      findObj.title = {
        $regex: req.query.search,
        $options: "i",
      };
    }
    if (req.query.isMyPostsOnly) {
      const userId = req.user._id;
      findObj.userId = userId;
    }
    if (req.query.isPrivate) {
      findObj.isPrivate = req.query.isPrivate == "true";
    }
    const totalPosts = await postModal.countDocuments(findObj);
    const getFeedPost = await postModal
      .find(findObj)
      .skip(pageNumber * pageSize)
      .limit(pageSize)
      .sort({ created_at: "desc" });
    return res.send({
      data: getFeedPost,
      total: totalPosts,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createPost,
  getFeedPost,
};

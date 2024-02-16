const express = require("express");
const upload = require("../middleware/multer");
const { createPost, getFeedPost } = require("../controller/posts.controller");
const router = express.Router();

router.post("/create-post", upload.single("image"), createPost);
router.get("/get-feed-posts", getFeedPost);

module.exports = router;

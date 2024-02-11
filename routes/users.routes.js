const express = require("express");
const {
  getUser,
  updateUser,
  getUserProfile,
  getAllUsers,
  deleteUser,
} = require("../controller/users.controller");
const router = express.Router();

router.get("/get-user", getUser);
router.put("/update-user", updateUser);
// router.patch("/update-user-profile", Users.updateProfile);
router.get("/get-users-profile", getUserProfile);
router.get("/get-all-user", getAllUsers);
router.delete("/delete-user", deleteUser);

// router.post("/follow-user", Users.followUser);
// router.get("/get-follow-requests", Users.getFollowRequests);
// router.post("/accept-follow-requests", Users.acceptFollowRequest);
// router.post("/unfollow-user", Users.unfollowUser);

module.exports = router;

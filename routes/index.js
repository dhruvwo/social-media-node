const express = require("express");
const usersRoutes = require("./users.routes");
const authRoutes = require("./auth.routes");
const authorizeUser = require("../controller/middleware/auth");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ status: "success", message: "Social media root." });
});

router.use("/", authRoutes);
router.use("/users", authorizeUser, usersRoutes);

module.exports = router;

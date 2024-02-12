const express = require("express");
const {
  signUp,
  login,
  reSendVerificationMail,
  verifyAccount,
} = require("../controller/auth.controller");
const router = express.Router();

router.post("/sign-up", signUp);
router.get("/login", login);
router.post("/resend-verification", reSendVerificationMail);
router.get("/verify-account", verifyAccount);

module.exports = router;

const express = require("express");
const { signUp, login } = require("../controller/auth.controller");
const router = express.Router();

router.post("/sign-up", signUp);
router.get("/login", login);
// router.post("/send-verification-otp", Auth.sendVerificationMail);
// router.post("/verify-otp", Auth.verifyOtp);
// router.get("/verify-email", Auth.verifyEmail);

module.exports = router;

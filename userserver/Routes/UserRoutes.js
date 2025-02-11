const express = require("express");
const {
  register,
  sendingVerificationEmail,
} = require("../Controller/User/Registration");
const {
  loginUser,
  googleLogin,
  googleCallback,
} = require("../Controller/User/login");
const router = express.Router();

const verifyToken = require("../lib/VerifyToken");
const checkUser = require("../middleware/VerifyUser");

// For User Registration Route
router.post("/register", register);
// For User login Route
router.post("/login", loginUser);
// For google signup and login
router.get("/google", googleLogin);

router.get("/callback/google", googleCallback);

router.post("/verify/token", verifyToken);

router.post("/verify/code", checkUser, sendingVerificationEmail);

module.exports = router;

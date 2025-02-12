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
const {
  sendingCodeToEmail,
  validateCode,
} = require("../lib/SendCodeAndVerify");
const changePass = require("../lib/ChangePassword");

// For User Registration Route
router.post("/register", register);
// For User login Route
router.post("/login", loginUser);
// For google signup and login
router.get("/google", googleLogin);

router.get("/callback/google", googleCallback);

router.post("/verify/token", verifyToken);

router.post("/verify/code", checkUser, sendingVerificationEmail);

// For sending code to the email
router.post("/pass/code", sendingCodeToEmail);
// For validation of reset password
router.post("/pass/verify/code", validateCode);
// For Changing the password
router.post("/pass/change", changePass);

module.exports = router;

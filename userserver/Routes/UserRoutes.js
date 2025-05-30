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
const protectRoute = require("../middleware/ProtectionRoute");
const { getDetails } = require("../Controller/User/UserDetails");
const {
  getUserDetails,
  getRentedRooms,
  changePassword,
  getCurrentRentedRooms,
  changeProfile,
} = require("../Controller/User/PersonalDetails");

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
// For changing the profile details
router.patch("/update", protectRoute, changeProfile);

// to get the userDetails
router.get("/get/details/user", protectRoute, getDetails);

// personal details
router.get("/personal", protectRoute, getUserDetails);
router.get("/room/history", protectRoute, getRentedRooms);
router.get("/room/current", protectRoute, getCurrentRentedRooms);
router.post("/password/change", protectRoute, changePassword);
module.exports = router;

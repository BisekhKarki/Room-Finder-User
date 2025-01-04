const express = require("express");
const register = require("../Controller/User/Registration");
const {
  loginUser,
  googleLogin,
  googleCallback,
} = require("../Controller/User/login");
const router = express.Router();

// For User Registration Route
router.post("/register", register);
// For User login Route
router.post("/login", loginUser);
// For google signup and login
router.get("/google", googleLogin);

router.get("/callback/google", googleCallback);
module.exports = router;

const express = require("express");
const register = require("../Controller/User/Registration");
const loginUser = require("../Controller/User/login");
const router = express.Router();

// For User Registration Route
router.post("/register", register);
// For User login Route
router.post("/login", loginUser);

module.exports = router;

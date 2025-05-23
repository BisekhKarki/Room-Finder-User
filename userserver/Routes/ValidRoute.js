const express = require("express");
const validUser = require("../Controller/Authentication");
const router = express.Router();

router.get("/user", validUser);

module.exports = router;

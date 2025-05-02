const express = require("express");
const { getHomeCategoryRooms } = require("../Controller/Categories");
const router = express.Router();

router.get("/home/:category", getHomeCategoryRooms);

module.exports = router;

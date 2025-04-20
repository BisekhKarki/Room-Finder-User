const express = require("express");
const router = express.Router();
const { featured, userRoom, getSingleRoom } = require("../Controller/Featured");

router.get("/featured", featured);
router.get("/rooms", userRoom);
router.get("/rooms/single/:id", getSingleRoom);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  getRoomById,
} = require("../Controller/landlord/GetMyRooms");

// For approval posting router
router.get("/allRooms", getAllRooms);
router.get("/SingleRoom/:id", getRoomById);

module.exports = router;

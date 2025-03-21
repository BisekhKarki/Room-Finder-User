const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  getRoomById,
} = require("../Controller/landlord/GetMyRooms");

// For approval posting router
router.post("/allRooms", getAllRooms);
router.post("/SingleRoom/:id", getRoomById);

module.exports = router;

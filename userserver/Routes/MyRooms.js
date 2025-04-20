const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  getRoomById,
} = require("../Controller/landlord/GetMyRooms");
const protectRoute = require("../middleware/ProtectionRoute");

// For approval posting router
router.post("/allRooms", protectRoute, getAllRooms);
router.post("/SingleRoom/:id", protectRoute, getRoomById);

module.exports = router;

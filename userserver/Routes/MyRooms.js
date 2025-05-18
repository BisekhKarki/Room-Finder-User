const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  getRoomById,
  editRoomBy,
  saveEditedRooms,
  deleteRoom,
} = require("../Controller/landlord/GetMyRooms");
const protectRoute = require("../middleware/ProtectionRoute");

// For approval posting router
router.post("/allRooms", protectRoute, getAllRooms);
router.post("/SingleRoom/:id", protectRoute, getRoomById);
router.get("/edit/room/get/:id", protectRoute, editRoomBy);
router.patch("/edit/room/details/:id", protectRoute, saveEditedRooms);
router.delete("/delete/:id", protectRoute, deleteRoom);

module.exports = router;

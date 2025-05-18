const express = require("express");
const protectRoute = require("../middleware/ProtectionRoute");
const { getRentedRoom } = require("../Controller/Tenants/Rent/Rooms");
const {
  leaveRent,
  getRoomHistory,
} = require("../Controller/Tenants/Rent/Leave");
const router = express.Router();

router.get("/tenants/rooms", protectRoute, getRentedRoom);
router.post("/tentants/rooms/leave", protectRoute, leaveRent);
router.get("/tenant/room/history/:id", protectRoute, getRoomHistory);

module.exports = router;

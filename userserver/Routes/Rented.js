const express = require("express");
const protectRoute = require("../middleware/ProtectionRoute");
const { getRentedRoom } = require("../Controller/Tenants/Rent/Rooms");
const { leaveRent } = require("../Controller/Tenants/Rent/Leave");
const router = express.Router();

router.get("/tenants/rooms", protectRoute, getRentedRoom);
router.post("/tentants/rooms/leave", protectRoute, leaveRent);

module.exports = router;

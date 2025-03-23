const express = require("express");
const protectRoute = require("../middleware/ProtectionRoute");
const { getRentedRoom } = require("../Controller/Tenants/Rent/Rooms");
const router = express.Router();

router.get("/tenants/rooms", protectRoute, getRentedRoom);

module.exports = router;

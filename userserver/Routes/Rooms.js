const express = require("express");
const protectRoute = require("../middleware/ProtectionRoute");
const {
  getFeaturedRooms,
  getSingleRoomDetailsForTenants,
  getAllRooms,
} = require("../Controller/Tenants/GetRooms");
const { getCategoryRooms } = require("../Controller/Tenants/Rent/Rooms");
const router = express.Router();

router.get("/rooms/featured", protectRoute, getFeaturedRooms);
router.get("/rooms/all/rooms", protectRoute, getAllRooms);
router.get(
  "/rooms/property/details/single/:id",
  protectRoute,
  getSingleRoomDetailsForTenants
);

router.get("/rooms/filter/:category", protectRoute, getCategoryRooms);

module.exports = router;

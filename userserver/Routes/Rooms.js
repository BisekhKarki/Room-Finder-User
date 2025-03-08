const express = require("express");
const protectRoute = require("../middleware/ProtectionRoute");
const {
  getFeaturedRooms,
  getSingleRoomDetailsForTenants,
} = require("../Controller/Tenants/GetRooms");
const router = express.Router();

router.get("/rooms/featured", protectRoute, getFeaturedRooms);
router.get(
  "/rooms/property/details/single/:id",
  protectRoute,
  getSingleRoomDetailsForTenants
);

module.exports = router;

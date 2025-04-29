const express = require("express");
const protectRoute = require("../middleware/ProtectionRoute");
const {
  getFeaturedRooms,
  getSingleRoomDetailsForTenants,
  getAllRooms,
} = require("../Controller/Tenants/GetRooms");
const {
  getCategoryRooms,
  history,
} = require("../Controller/Tenants/Rent/Rooms");
const { filterSearch } = require("../Controller/Tenants/SearchRooms");
const router = express.Router();

router.get("/rooms/featured", protectRoute, getFeaturedRooms);
router.get("/rooms/all/rooms", protectRoute, getAllRooms);
router.get(
  "/rooms/property/details/single/:id",
  protectRoute,
  getSingleRoomDetailsForTenants
);

router.get("/rooms/filter/:category", protectRoute, getCategoryRooms);
router.get("/rooms/history", protectRoute, history);

router.post("/room/search", protectRoute, filterSearch);

module.exports = router;

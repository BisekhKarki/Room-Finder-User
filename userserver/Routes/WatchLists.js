const express = require("express");
const protectRoute = require("../middleware/ProtectionRoute");
const {
  saveToWatchLists,
  getWatchLists,
  deleteItems,
} = require("../Controller/Tenants/Cart");
const router = express.Router();

router.post("/save", protectRoute, saveToWatchLists);
router.get("/get", protectRoute, getWatchLists);
router.delete("/remove/:id", protectRoute, deleteItems);

module.exports = router;

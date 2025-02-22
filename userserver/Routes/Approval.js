const express = require("express");
const router = express.Router();
const {
  getApproval,
  updateRoomApproval,
} = require("../Controller/landlord/SendApproval");
const cancelApproval = require("../Controller/landlord/CancelApproval");
const getMyPendingRooms = require("../Controller/landlord/GetMyPendingRooms");

// For approval posting router
router.post("/approval", getApproval);
router.delete("/cancel/:id", cancelApproval);
router.post("/myRooms/pending", getMyPendingRooms);
router.post("/myRooms/pending/payment", updateRoomApproval);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getApproval,
  updateRoomApproval,
} = require("../Controller/landlord/SendApproval");
const cancelApproval = require("../Controller/landlord/CancelApproval");
const {
  getMyPendingRooms,
  getSinglePendingRooms,
} = require("../Controller/landlord/GetMyPendingRooms");
const { sendApprovalRent } = require("../Controller/Tenants/Rent/SendApproval");
const protectRoute = require("../middleware/ProtectionRoute");

// For approval posting router
router.post("/approval", getApproval);
router.delete("/cancel/:id", cancelApproval);
router.post("/myRooms/pending", getMyPendingRooms);
router.post("/myRooms/pending/single/get/:id", getSinglePendingRooms);

router.post("/myRooms/pending/payment", updateRoomApproval);

// For rent approvals
router.post(
  "/rent/tentants/application/approval",
  protectRoute,
  sendApprovalRent
);

module.exports = router;

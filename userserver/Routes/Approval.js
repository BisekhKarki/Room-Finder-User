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
const {
  sendApprovalRent,
  acceptApproval,
  declineApproval,
} = require("../Controller/Tenants/Rent/Approval");
const protectRoute = require("../middleware/ProtectionRoute");
const {
  application,
  getApprovedApplications,
} = require("../Controller/Tenants/Rent/Applications");

// For approval posting router
router.post("/approval", protectRoute, getApproval);
router.delete("/cancel/:id", protectRoute, cancelApproval);
router.post("/myRooms/pending", protectRoute, getMyPendingRooms);
router.post(
  "/myRooms/pending/single/get/:id",
  protectRoute,
  getSinglePendingRooms
);

router.post("/myRooms/pending/payment", protectRoute, updateRoomApproval);

// For rent approvals
router.post(
  "/rent/tentants/application/approval",
  protectRoute,
  sendApprovalRent
);

// For getting the approval lists
router.get("/rent/tenants/application/:id", protectRoute, application);

// For checking wether the application is approved or not
router.get(
  "/rent/tenant/application/approval/check/:roomId/:landlordId",
  protectRoute,
  getApprovedApplications
);

// For accepting the approval
router.post(
  "/rent/tenant/single/application/approval/accept",
  protectRoute,
  acceptApproval
);

router.post(
  "/rent/tenant/single/application/decline",
  protectRoute,
  declineApproval
);

module.exports = router;

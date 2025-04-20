const express = require("express");
const {
  khaltiPayment,
  saveRoomPostPayement,
  // StripePayment,
} = require("../Controller/Payment/LandlordPayment");
const protectRoute = require("../middleware/ProtectionRoute");
const {
  userkhaltiPayment,
  saveDetails,
  saveCashDetails,
  getCashOnHandStatus,
  getCashOnHandStatusForLandlord,
  accpetPayment,
  declinePayment,
} = require("../Controller/Payment/UserPayment");
const router = express.Router();

router.post("/landlord/khalti", protectRoute, khaltiPayment);

// Teneants Payment via khalti
router.post("/tenants/khalti", protectRoute, userkhaltiPayment);
router.post("/tenants/khalti/purchase/save", protectRoute, saveDetails);
router.post("/tenants/cashOnHand", protectRoute, saveCashDetails);

// Chechking the cash on hand payment
router.get(
  "/tenants/cashOnHand/status/:roomId/:landlordId",
  protectRoute,
  getCashOnHandStatus
);
router.post(
  "/tenants/cashOnHand/status/:roomId/:landlordId",
  protectRoute,
  getCashOnHandStatusForLandlord
);

router.post("/tenants/approval/cashOnHand", protectRoute, accpetPayment);
router.post("/tenants/decline/cashOnHand", protectRoute, declinePayment);

router.post("/pending/save", protectRoute, saveRoomPostPayement);

module.exports = router;

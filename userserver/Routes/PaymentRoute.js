const express = require("express");
const {
  khaltiPayment,
  StripePayment,
} = require("../Controller/Payment/LandlordPayment");
const protectRoute = require("../middleware/ProtectionRoute");
const {
  userkhaltiPayment,
  saveDetails,
} = require("../Controller/Payment/UserPayment");
const router = express.Router();

router.post("/landlord/khalti", khaltiPayment);
router.post("/landlord/stripe", StripePayment);

// Teneants Payment via khalti
router.post("/tenants/khalti", protectRoute, userkhaltiPayment);
router.post("/tenants/khalti/purchase/save", protectRoute, saveDetails);

module.exports = router;

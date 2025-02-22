const express = require("express");
const {
  khaltiPayment,
  StripePayment,
} = require("../Controller/Payment/LandlordPayment");
const router = express.Router();

router.post("/landlord/khalti", khaltiPayment);
router.post("/landlord/stripe", StripePayment);

module.exports = router;

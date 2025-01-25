const express = require("express");
const router = express.Router();
const getApproval = require("../Controller/landlord/SendApproval");
const cancelApproval = require("../Controller/landlord/CancelApproval");

// For approval posting router
router.post("/approval", getApproval);
router.delete("/cancel/:id", cancelApproval);

module.exports = router;

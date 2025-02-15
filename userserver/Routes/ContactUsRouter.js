const express = require("express");
const { sendUserMessage } = require("../Controller/ContactUs/ContactUs");
const router = express.Router();

router.post("/send/message", sendUserMessage);

module.exports = router;

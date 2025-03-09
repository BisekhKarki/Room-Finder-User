const express = require("express");
const { sendUserMessage } = require("../Controller/ContactUs/ContactUs");
const { userMessage } = require("../Controller/ContactUs/UserMessage");
const router = express.Router();

router.post("/send/message", sendUserMessage);
router.post("/message/from/user", userMessage);

module.exports = router;

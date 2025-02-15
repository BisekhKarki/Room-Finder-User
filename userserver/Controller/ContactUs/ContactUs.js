const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendUserMessage = async (req, res) => {
  const { first, last, phone, email, message } = req.body;
  try {
    await transporter.sendMail({
      from: email,
      to: "bisekhkarki2003@gmail.com",
      subject: "Inquiry mail",
      html: `
        Email from: ${first} ${last}
        <br />
        Phone: ${phone}
        <br />
        Email: ${email}
        <br />
        message: ${message}
        `,
    });

    return res.status(200).json({
      success: true,
      message: "You message has been sent.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { sendUserMessage };

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

const userMessage = async (req, res) => {
  const {
    userEmail,
    landlordEmail,
    first,
    last,
    phone,
    message,
    landlordName,
  } = req.body;

  try {
    await transporter.sendMail({
      from: userEmail,
      to: landlordEmail,
      subject: "Message from a user",
      html: `
        <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Room Finder Inquiry</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #007BFF;
            margin: 0;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: auto;
            overflow: hidden;
        }
        .header {
            background: #0056b3;
            color: #ffffff;
            text-align: center;
            padding: 15px;
            font-size: 24px;
            font-weight: bold;
            border-radius: 8px 8px 0 0;
        }
        p {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
        }
        .info {
            background: #f4f4f4;
            padding: 15px;
            border-left: 4px solid #007BFF;
            margin: 10px 0;
            border-radius: 5px;
        }
        .info p {
            margin: 5px 0;
        }
        .message-box {
            background: #e9f5ff;
            padding: 15px;
            border-left: 4px solid #0056b3;
            font-style: italic;
            color: #333;
            border-radius: 5px;
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #fffff;
            padding-top: 10px;
            border-top: 1px solid #ddd;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 15px;
            background: #007BFF;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .button:hover {
            background: #0056b3;
            color:white;
        }
    </style>
</head>
<body>

    <div class="email-container">
        <div class="header">Room Finder</div>

        <p><strong>Dear ${landlordName},</strong></p>
        <p>You have received a message from a user.</p>

        <div class="info">
            <p><strong>Email from:</strong> ${first} ${last}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Email:</strong> <a href="mailto:${userEmail}" style="color: #007BFF;">${userEmail}</a></p>
        </div>

        <p><strong>Message:</strong></p>
        <div class="message-box">
            <p>${message}</p>
        </div>

        <div class="footer">
            <p>This email was sent from the Room Finder platform.</p>
            <a href="mailto:${userEmail}" class="button">Reply Now</a>
        </div>
    </div>

</body>
</html>

        `,
    });

    return res.status(200).json({
      success: true,
      message: "You message has been sent.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { userMessage };

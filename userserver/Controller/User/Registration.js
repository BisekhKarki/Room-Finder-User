const user = require("../../Schemas/UserModel");

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

function getRandomSixDigit() {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}

let randomSixDigit = getRandomSixDigit();
let currentUser = [];

const sendingVerificationEmail = async (req, res) => {
  const userData = req.userData;
  currentUser = userData;
  try {
    // req.session.verificationCode = randomSixDigit;
    await transporter.sendMail({
      from: "Room Finder 🏠<karkidai79@gmail.com>",
      to: userData.Email,
      subject: "Email Verification Code",
      html: `
      Hello ${userData.FirstName}
      Your email verification code is: ${randomSixDigit}
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Code sent to email",
    });
  } catch (error) {
    console.log(error);
  }
};

// Function to regitser user in the database
const register = async (req, res) => {
  const { code } = req.body;

  try {
    if (code !== randomSixDigit.toString()) {
      return res.status(400).json({
        success: false,
        message: "Invalid Verification code",
      });
    }

    const newUser = new user(currentUser);
    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User registered Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { register, sendingVerificationEmail };

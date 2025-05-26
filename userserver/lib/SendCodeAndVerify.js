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

function passCode() {
  const codeGenerator =
    Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  return codeGenerator;
}

let mailCode = passCode();

const sendingCodeToEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const info = await transporter.sendMail({
      from: "Room Finder 🏠<roomfinder@gmail.com>",
      to: email,
      subject: "Password reset Code",
      html: `
      Your email verification code is: ${mailCode}
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Code sent to your email",
      email: email,
    });
  } catch (error) {
    console.log(error);
  }
};

const validateCode = async (req, res) => {
  const { code } = req.body;
  console.log(code);
  try {
    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Code is needed inorder to reset the password",
      });
    }

    if (mailCode.toString() !== code) {
      return res.status(400).json({
        success: false,
        message: "Invalid Code",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Valid Code",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = { sendingCodeToEmail, validateCode };

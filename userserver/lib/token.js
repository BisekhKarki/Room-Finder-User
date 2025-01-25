const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (userId, userType, res) => {
  const token = jwt.sign(
    {
      id: userId,
      type: userType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // Set token as a cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};

module.exports = generateToken;

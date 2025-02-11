const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Access denied. No token provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: "Access denied. Invalid token",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Valid Token",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Access denied",
    });
  }
};

module.exports = verifyToken;

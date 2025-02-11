const jwt = require("jsonwebtoken");
const User = require("../Schemas/UserModel");
const dotenv = require("dotenv");
dotenv.config();

const validateUser = async (req, res) => {
  try {
    const token = res.cookies["jwt"];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login again",
      });
    }

    console.log(token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decodedToken);
    if (!decodedToken) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized- No token provided",
      });
    }

    const user = await User.findById(decodedToken.userId).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // req.user = user;

    return res.status(200).json({
      success: true,
      message: "User authenticated",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = validateUser;

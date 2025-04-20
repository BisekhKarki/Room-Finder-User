const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
// Function to regitser user in the database
const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const splitToken = token.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token provided",
      });
    }

    const decodeUser = jsonwebtoken.decode(splitToken, process.env.JWT_SECRET);

    if (!decodeUser || !decodeUser.id) {
      return res.status(400).json({
        success: false,
        message: "Invalid Token",
      });
    }

    req.userData = decodeUser;
    // console.log(req.userData);
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = protectRoute;

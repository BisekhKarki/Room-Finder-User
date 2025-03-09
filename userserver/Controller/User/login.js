const user = require("../../Schemas/UserModel");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
// const generateToken = require("../../lib/token");

// For Generating token
const generateToken = async (userId, userType) => {
  return jwt.sign(
    {
      id: userId,
      type: userType,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// Function to validate user in order to login
const loginUser = async (req, res) => {
  const { Email, Password, UserType } = req.body;

  try {
    if (!["Landlord", "Tenants"].includes(UserType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User Type",
      });
    }
    const findUser = await user.findOne({ Email });
    if (!findUser) {
      return res.status(400).json({
        success: false,
        message:
          "User with the email do not exists\n Please register you account",
      });
    }

    const checkPassword = await bcrypt.compare(Password, findUser.Password);

    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Password\nPlease try again",
      });
    }
    const token = await generateToken(findUser._id, UserType);
    if (findUser.UserType === UserType) {
      return res.status(200).json({
        success: true,
        message: `You have been logged in as ${UserType}`,
        redirect: UserType === "Landlord" ? "/landlord/Home" : "/user/home",
        token: token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No User Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An unexpected error occured. Please try again later.",
    });
  }
};

const googleLogin = async (req, res) => {
  try {
    const redirectUrl = "http://localhost:4000/api/user/callback/google";
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl
    );

    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",

      scope: [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
      ],
      prompt: "select_account",
    });

    return res.status(200).json({
      success: true,
      url: authorizeUrl,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;
    const redirectUrl = "http://localhost:4000/api/user/callback/google";
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl
    );
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    const userData = await response.json();

    const checkIfUserExists = await user.findOne({ Email: userData.email });

    if (checkIfUserExists) {
      return res.redirect("http://localhost:3000/Home");
    } else {
      const newUser = new user({
        FirstName: userData.given_name,
        LastName: userData.family_name,
        Email: userData.email,
        Phone: "",
        Address: "",
        UserType: "",
        Password: "",
      });
      await newUser.save();
      return res.redirect("http://localhost:3000/Home");
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { loginUser, googleLogin, googleCallback };

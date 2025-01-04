const user = require("../../Schemas/UserModel");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { OAuth2Client } = require("google-auth-library");

// Function to validate user in order to login
const loginUser = async (req, res) => {
  const { Email, Password } = req.body;
  try {
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

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      //   data: findUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
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
      res.redirect("http://localhost:3000/Home");
    }
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

    console.log(userData);

    res.redirect("http://localhost:3000/Home");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { loginUser, googleLogin, googleCallback };

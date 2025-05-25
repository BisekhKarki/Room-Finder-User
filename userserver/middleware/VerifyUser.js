const user = require("../Schemas/UserModel");
const bcrypt = require("bcryptjs");
// Function to regitser user in the database
const checkUser = async (req, res, next) => {
  const { FirstName, LastName, Email, Phone, Address, UserType, Password } =
    req.body;

  if (
    FirstName === " " ||
    LastName === " " ||
    Email === " " ||
    Phone === " " ||
    Address === " " ||
    UserType === " " ||
    Password === " "
  ) {
    return res.status(400).json({
      success: false,
      message: "Input fields cannot be empty",
    });
  }

  if (UserType === "Select a user type") {
    return res.status(400).json({
      success: false,
      message: "You need to select a user type",
    });
  }

  // console.log("Phone: ", getStarts);
  if (!Phone.startsWith("98")) {
    return res.status(400).json({
      success: false,
      message: "Phone number must start with 98",
    });
  }

  if (Password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be atleast 8 characters",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailRegexTest = emailRegex.test(Email);
  // console.log("Email: ", emailRegexTest);
  if (Email && !emailRegexTest) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format. Please use a valid email address",
    });
  }

  try {
    const findUser = await user.findOne({ Email });
    if (findUser) {
      return res.status(400).json({
        success: false,
        message:
          "User with the given email already exist\n Try using a different email",
      });
    }

    if (Password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password should be greater than 6 characters",
      });
    }

    const hashPassword = await bcrypt.hash(Password, 10);

    if (Phone.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Phone numbers cannot be less than 10 digits",
      });
    }

    const newUser = {
      FirstName,
      LastName,
      Email,
      Phone,
      Address,
      UserType,
      Password: hashPassword,
    };
    req.userData = newUser;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = checkUser;

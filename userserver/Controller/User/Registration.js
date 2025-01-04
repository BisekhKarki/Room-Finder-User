const user = require("../../Schemas/UserModel");
const bcrypt = require("bcryptjs");

// Function to regitser user in the database
const register = async (req, res) => {
  const { FirstName, LastName, Email, Phone, Address, UserType, Password } =
    req.body;
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

    const newUser = new user({
      FirstName,
      LastName,
      Email,
      Phone,
      Address,
      UserType,
      Password: hashPassword,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User registered Successfully",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = register;

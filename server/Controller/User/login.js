const user = require("../../Schemas/UserModel");
const bcrypt = require("bcryptjs");

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

module.exports = loginUser;

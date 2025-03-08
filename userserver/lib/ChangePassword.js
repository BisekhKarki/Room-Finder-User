const user = require("../Schemas/UserModel");
const bcrypt = require("bcryptjs");

const changePass = async (req, res) => {
  const { newPass, email } = req.body;

  try {
    const validUser = await user.findOne({ Email: email });

    if (!validUser) {
      return res.status(400).json({
        success: false,
        message:
          "User with the email do not exists\n Please register you account",
      });
    }

    const hashPassword = await bcrypt.hash(newPass, 10);
    validUser.Password = hashPassword;
    await validUser.save();

    return res.status(200).json({
      success: true,
      message: "Your password has been changed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = changePass;

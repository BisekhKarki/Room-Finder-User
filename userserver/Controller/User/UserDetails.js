const user = require("../../Schemas/UserModel");

const getDetails = async (req, res) => {
  const userDetail = req.userData;

  try {
    const findUser = await user
      .findOne({ _id: userDetail.id })
      .select("-Password");
    if (!findUser) {
      return res.status(400).json({
        success: false,
        message: "No user found",
      });
    }

    return res.status(200).json({
      success: false,
      message: findUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getDetails };

const User = require("../../Schemas/UserModel");
const history = require("../../Schemas/Rent_History");
const rented = require("../../Schemas/RentedRoomSchema");
const bcrypt = require("bcryptjs");

const getUserDetails = async (req, res) => {
  const userData = req.userData;
  try {
    const user = await User.findById(userData.id).select("-Password");
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "No user found",
      });
    }
    return res.status(200).json({
      success: true,
      message: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getRentedRooms = async (req, res) => {
  const userData = req.userData;
  try {
    const room = await history
      .find({
        rented_by: userData.id,
      })
      .select(
        "-contact -features -location -reviews -landlordId  -rented_by -updatedAt"
      );
    // if (!user) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "No user found",
    //   });
    // }
    return res.status(200).json({
      success: true,
      message: room,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCurrentRentedRooms = async (req, res) => {
  const userData = req.userData;
  try {
    const room = await rented
      .find({
        rented_by: userData.id,
      })
      .select(
        "-contact -features -location -reviews -landlordId  -rented_by -updatedAt"
      );
    // if (!user) {
    //   return res.status(500).json({
    //     success: false,
    //     message: "No user found",
    //   });
    // }
    return res.status(200).json({
      success: true,
      message: room,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  const userData = req.userData;
  const { currentPassword, newPassword } = req.body;
  try {
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Enter password of at least 8 characters",
      });
    }
    const user = await User.findById(userData.id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user found",
      });
    }

    const validPassword = await bcrypt.compare(currentPassword, user.Password);

    if (!validPassword) {
      return res.status(404).json({
        success: false,
        message: "Incorrect current password",
      });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.Password = hashPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password Changes successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changeProfile = async (req, res) => {
  const userData = req.userData;
  const { FirstName, LastName, Phone, Address } = req.body;

  try {
    if (!FirstName || !LastName || !Address) {
      return res.status(400).json({
        success: false,
        message: "Enter all the details",
      });
    }

    if (!Phone.startsWith("98")) {
      return res.status(400).json({
        success: false,
        message: "Phone number must start with 98",
      });
    }

    if (Phone.length !== 10) {
      return res.status(400).json({
        success: false,
        message: "Phone number must be of 10 digits",
      });
    }
    const user = await User.findOne({
      _id: userData.id,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User Does not exists",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(userData.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "Unable to update the user",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getUserDetails,
  getRentedRooms,
  changePassword,
  getCurrentRentedRooms,
  changeProfile,
};

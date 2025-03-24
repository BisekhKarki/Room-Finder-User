const rentedPropeerties = require("../../../Schemas/RentedRoomSchema");

const getRentedRoom = async (req, res) => {
  const userData = req.userData;

  try {
    const findRoom = await rentedPropeerties.findOne({
      rented_by: userData.id,
    });

    if (!findRoom) {
      return res.status(400).json({
        success: false,
        message: "No room found",
      });
    }

    return res.status(200).json({
      success: true,
      message: findRoom,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getRentedRoom };

const rentedPropeerties = require("../../../Schemas/RentedRoomSchema");
const room = require("../../../Schemas/RoomSchema");
const roomHistory = require("../../../Schemas/Rent_History");

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

const getCategoryRooms = async (req, res) => {
  const { category } = req.params;

  try {
    const findRooms = await room.find({});
    if (!findRooms) {
      return res.status(400).json({
        success: false,
        message: "No rooms found",
      });
    }

    const filterRooms = findRooms.filter(
      (room) => room.basic.type === category && room.show
    );

    if (!filterRooms) {
      return res.status(400).json({
        success: false,
        message: "No rooms found",
      });
    }

    return res.status(200).json({
      success: true,
      message: filterRooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const history = async (req, res) => {
  const userData = req.userData;

  try {
    const findRoom = await roomHistory.find({
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

module.exports = { getRentedRoom, getCategoryRooms, history };

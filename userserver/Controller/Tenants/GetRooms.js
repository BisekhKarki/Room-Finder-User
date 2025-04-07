const rooms = require("../../Schemas/RoomSchema");

const getFeaturedRooms = async (req, res) => {
  try {
    const getRooms = await rooms.find({});

    if (!getRooms) {
      return res.status(400).json({
        success: false,
        message: "No Rooms Available",
      });
    }

    const showRomms = getRooms.filter((room) => room.show === true).slice(0, 3);

    return res.status(200).json({
      success: true,
      message: showRomms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const getRooms = await rooms.find({});

    if (!getRooms) {
      return res.status(400).json({
        success: false,
        message: "No Rooms Available",
      });
    }

    const showRomms = getRooms.filter((room) => room.show === true);

    return res.status(200).json({
      success: true,
      message: showRomms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getSingleRoomDetailsForTenants = async (req, res) => {
  const { id } = req.params;

  try {
    const findRoom = await rooms.findById(id);
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

module.exports = {
  getFeaturedRooms,
  getSingleRoomDetailsForTenants,
  getAllRooms,
};

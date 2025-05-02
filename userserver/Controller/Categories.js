const room = require("../Schemas/RoomSchema");

const getHomeCategoryRooms = async (req, res) => {
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

module.exports = {
  getHomeCategoryRooms,
};

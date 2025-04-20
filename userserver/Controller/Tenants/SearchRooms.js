const room = require("../../Schemas/RoomSchema");

const filterSearch = async (req, res) => {
  const { location, minPrice, maxPrice, propertyType } = req.body;

  try {
    const filteredRooms = await room.find({});

    let search = filteredRooms;

    if (location) {
      search = filteredRooms.filter(
        (room) => room.location.city.toLowerCase() === location.toLowerCase()
      );
    }

    if (type) {
      search = filteredRooms.filter(
        (room) => room.basic.type.toLowerCase() === type.toLowerCase()
      );
    }

    if (minPrice || maxPrice) {
      const min = parseInt(minPrice || 0);
      const max = parseInt(maxPrice || Number.MAX_SAFE_INTEGER);
      search = filteredRooms.filter((room) => {
        const roomPrice = parseInt(room.basic.price);
        return roomPrice >= min && roomPrice <= max;
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = { filterSearch };

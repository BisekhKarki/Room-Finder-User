const history = require("../../../Schemas/Rent_History");
const rented = require("../../../Schemas/RentedRoomSchema");

const leaveRent = async (req, res) => {
  const { roomId, landlordId, comment, rating } = req.body;
  const userData = req.userData;
  try {
    const findRoom = await rented.findOne({
      _id: roomId,
      landlordId,
      rented_by: userData.id,
    });

    if (!findRoom) {
      return res.status(400).json({
        success: false,
        message: "No room rented",
      });
    }

    const roomHistory = new history({
      basic: findRoom.basic,
      location: findRoom.location,
      features: findRoom.features,
      images: findRoom.images,
      contact: findRoom.contact,
      landlordId: findRoom.landlordId,
      rented_by: userData.id,
      rent_leave_date: new Date(),
      rented: false,
      _id: roomId,
    });

    await roomHistory.save();
    console.log(roomHistory);

    await rented.findByIdAndDelete(roomId);

    const updatedProperty = await history.findByIdAndUpdate(
      roomId,
      {
        $push: {
          reviews: { user: userData.id, comment, rating },
        },
      },
      { new: true }
    );

    if (!updatedProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found for review update",
      });
    }

    return res.status(200).json({
      success: true,
      message: "You have left the property successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { leaveRent };

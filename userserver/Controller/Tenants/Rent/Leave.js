const history = require("../../../Schemas/Rent_History");
const rented = require("../../../Schemas/RentedRoomSchema");
const room = require("../../../Schemas/RoomSchema");
const approve = require("../../../Schemas/ApproveRooms");

const leaveRent = async (req, res) => {
  const { roomId, landlordId, comment, rating } = req.body;
  const userData = req.userData;
  console.log(userData);

  try {
    const findRoom = await rented.findOne({
      room_id: roomId,
      landlordId,
      rented_by: userData.id,
    });
    console.log(findRoom);

    if (!findRoom) {
      return res.status(400).json({
        success: false,
        message: "No room rented",
      });
    }

    const findRentedRooms = await history.findOne({
      _id: roomId,
      landlordId,
      rented_by: userData.id,
    });

    if (!findRentedRooms) {
      const roomHistory = new history({
        basic: findRoom.basic,
        location: findRoom.location,
        features: findRoom.features,
        images: findRoom.images,
        contact: findRoom.contact,
        landlordId: findRoom.landlordId,
        rented_by: userData.id,
        rent_leave_date: new Date(),
        rented_date: findRoom.rented_date,
        pinnedLocation: findRoom.pinnedLocation,
        rented: false,
        _id: roomId,
      });

      await roomHistory.save();
    } else {
      await history.updateOne(
        { _id: findRentedRooms._id },
        {
          $set: {
            rent_leave_date: new Date(),
            rented: false,
          },
        }
      );
    }

    await rented.findByIdAndDelete(findRoom._id);

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

    const updatedApprovalRooms = await approve.findById(roomId);
    updatedApprovalRooms.payment = false;
    updatedApprovalRooms.reviews = updatedProperty.reviews;
    updatedApprovalRooms.show = false;
    updatedApprovalRooms.isVerified = false;
    await updatedApprovalRooms.save();

    await room.findByIdAndDelete(roomId);

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

const getRoomHistory = async (req, res) => {
  const userData = req.userData;
  const { id } = req.params;
  try {
    const findRoom = await history.findOne({
      _id: id,
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

module.exports = { leaveRent, getRoomHistory };

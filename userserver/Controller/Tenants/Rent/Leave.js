const history = require("../../../Schemas/Rent_History");
const rented = require("../../../Schemas/RentedRoomSchema");
const room = require("../../../Schemas/RoomSchema");
const approve = require("../../../Schemas/ApproveRooms");
const userApplication = require("../../../Schemas/RentApproval");

const leaveRent = async (req, res) => {
  const { roomId, landlordId, comment, rating } = req.body;
  const userData = req.userData;

  try {
    //  Check if user has rented the room
    const findRoom = await rented.findOne({
      room_id: roomId,
      landlordId,
      rented_by: userData.id,
    });

    if (!findRoom) {
      return res.status(400).json({
        success: false,
        message: "No room rented",
      });
    }

    //  Check for existing room history
    const roomHistory = await history.findOne({
      roomId,
      landlordId,
      rented_by: userData.id,
    });

    if (roomHistory) {
      // Update leave date and rented flag
      roomHistory.rent_leave_date = new Date();
      roomHistory.rented = false;
      await roomHistory.save();
    } else if (!roomHistory) {
      // If no history, create one
      const newRoomHistory = new history({
        basic: findRoom.basic,
        location: findRoom.location,
        features: findRoom.features,
        images: findRoom.images,
        contact: findRoom.contact,
        landlordId: findRoom.landlordId,
        rented_by: userData.id,
        rented_date: findRoom.rented_date,
        rent_leave_date: new Date(),
        pinnedLocation: findRoom.pinnedLocation,
        rented: false,
        roomId,
      });
      await newRoomHistory.save();
    }

    //  Update approve room and manage reviews
    const updatedApprovalRoom = await approve.findById(roomId);
    if (updatedApprovalRoom) {
      updatedApprovalRoom.payment = false;
      updatedApprovalRoom.show = false;
      updatedApprovalRoom.isVerified = false;

      const existingReviewIndex = updatedApprovalRoom.reviews.findIndex(
        (rev) => rev.user.toString() === userData.id.toString()
      );

      if (existingReviewIndex !== -1) {
        // Update existing review
        updatedApprovalRoom.reviews[existingReviewIndex].user = userData.id;
        updatedApprovalRoom.reviews[existingReviewIndex].comment = comment;
        updatedApprovalRoom.reviews[existingReviewIndex].rating = rating;
      } else {
        // Add new review
        updatedApprovalRoom.reviews.push({
          user: userData.id,
          comment,
          rating,
        });
      }

      await updatedApprovalRoom.save();
    }

    //  Delete rented room
    await rented.findByIdAndDelete(findRoom._id);

    // Delete room (optional, if it's a one-time listing)
    await room.findByIdAndDelete(roomId);

    //  Delete user's application for the room
    const application = await userApplication.findOne({
      tenantId: userData.id,
      roomId,
      landlordId,
    });

    console.log(application);

    if (application) {
      // await userApplication.findByIdAndDelete(application._id);
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

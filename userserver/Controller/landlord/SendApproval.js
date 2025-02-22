const ApprovalSchema = require("../../Schemas/ApproveRooms");

const getApproval = async (req, res) => {
  const { basic, location, features, images, contact, landlordId } = req.body;
  try {
    // Check if a room already exists with the same details
    const findRoomExists = await ApprovalSchema.findOne({
      name: basic.name,
      location: location.city,
      landlordId: contact.id,
      phone: contact.phone,
    });

    if (findRoomExists) {
      return res.status(400).json({
        success: false,
        message: "Room for approval already exists",
      });
    }

    const Approving = new ApprovalSchema({
      basic,
      location,
      features,
      images,
      contact,
      landlordId,
    });
    await Approving.save();

    return res.status(200).json({
      success: true,
      message: "Room applied for approval",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};

const updateRoomApproval = async (req, res) => {
  const { status, landlordId, roomId } = req.body;

  console.log(roomId, status, landlordId);
  try {
    const findRoom = await ApprovalSchema.findOne({ _id: roomId });
    // console.log(findRoom);
    if (!findRoom) {
      return res.status(400).json({
        success: false,
        message: "Room not found",
      });
    }

    if (
      status === "Completed" &&
      findRoom.landlordId.toString() === landlordId &&
      !findRoom.payment
    ) {
      findRoom.payment = true;
      await findRoom.save();

      return res.status(200).json({
        success: true,
        message: "Payment successfull",
      });
    }

    return res.status(200).json({
      success: false,
      message: "Payment has been already made",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { getApproval, updateRoomApproval };

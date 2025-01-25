const ApprovalSchema = require("../../Schemas/ApproveRooms");

const getApproval = async (req, res) => {
  const { roomName, location, price, landlordId, phone } = req.body;
  try {
    // Check if a room already exists with the same details
    const findRoomExists = await ApprovalSchema.findOne({
      roomName,
      location,
      price,
      landlordId,
      phone,
    });

    if (findRoomExists) {
      return res.status(400).json({
        success: false,
        message: "Room for approval already exists",
      });
    }

    const Approving = new ApprovalSchema(req.body);
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

module.exports = getApproval;

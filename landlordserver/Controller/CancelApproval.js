const ApprovalSchema = require("../Schemas/ApproveRooms");

const cancelApproval = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if a room already exists with the same details
    const findRoomExists = await ApprovalSchema.findById(id);

    if (!findRoomExists) {
      return res.status(404).json({
        success: false,
        message: "Room do not exists",
      });
    }

    const cancel = await ApprovalSchema.findByIdAndDelete(id);
    if (!cancel) {
      return res.status(400).json({
        success: false,
        message: "Unable to cancel the application",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Room approval canceled successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
};

module.exports = cancelApproval;

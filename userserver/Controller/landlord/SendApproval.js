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

module.exports = getApproval;

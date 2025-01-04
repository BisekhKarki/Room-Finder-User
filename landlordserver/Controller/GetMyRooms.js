const ApprovalSchema = require("../Schemas/ApproveRooms");

const getAllRooms = async (req, res) => {
  const { landlordId } = req.body;
  try {
    const findMyRooms = await ApprovalSchema.find({
      landlordId: landlordId,
    });

    if (!findMyRooms) {
      return res.status(404).json({
        success: false,
        message: "You have not posted rooms",
      });
    }

    return res.status(200).json({
      success: true,
      message: findMyRooms,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getRoomById = async (req, res) => {
  const { landlordId } = req.body;
  const { id } = req.params;
  try {
    const findSingleRoom = await ApprovalSchema.findOne({
      _id: id,
      landlordId: landlordId,
    });

    if (!findSingleRoom) {
      return res.status(404).json({
        success: false,
        message: "The desired room do not exists",
      });
    }

    return res.status(200).json({
      success: true,
      message: findSingleRoom,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { getAllRooms, getRoomById };

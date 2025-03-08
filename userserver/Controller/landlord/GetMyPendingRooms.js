const approval = require("../../Schemas/ApproveRooms");

const getMyPendingRooms = async (req, res) => {
  const { landlordId } = req.body;

  try {
    const findMyRooms = await approval.find({
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

const getSinglePendingRooms = async (req, res) => {
  const { landlordId } = req.body;
  const { id } = req.params;
  try {
    const getSingle = await approval.findOne({
      _id: id,
      landlordId: landlordId,
    });

    if (!getSingle) {
      return res.status(404).json({
        success: false,
        message: "No room found",
      });
    }

    return res.status(200).json({
      success: true,
      message: getSingle,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getMyPendingRooms, getSinglePendingRooms };

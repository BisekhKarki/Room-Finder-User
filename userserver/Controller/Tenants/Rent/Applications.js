const rentApproval = require("../../../Schemas/RentApproval");
const rented = require("../../../Schemas/RentedRoomSchema");

const application = async (req, res) => {
  const { id } = req.params;

  try {
    const findApplication = await rentApproval.find({ roomId: id });
    // console.log(findApplication);
    if (!findApplication) {
      return res.status(400).json({
        success: false,
        message: "No Applications Have been made",
      });
    }

    return res.status(200).json({
      success: true,
      message: findApplication,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getUserLastPayment = async (req, res) => {
  const { id, tenantId } = req.params;

  try {
    const findApplication = await rented.findOne({
      room_id: id,
      rented_by: tenantId,
    });

    if (!findApplication) {
      return res.status(400).json({
        success: false,
        message: "No room rented",
      });
    }

    return res.status(200).json({
      success: true,
      message: findApplication.last_payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getApprovedApplications = async (req, res) => {
  const { roomId, landlordId } = req.params;

  try {
    const id = req.userData.id;
    const findApplication = await rentApproval.findOne({
      landlordId,
      tenantId: id,
      roomId,
    });
    if (!findApplication) {
      return res.status(400).json({
        success: false,
        message: "No Application Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: findApplication.status,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const checkRentedRoom = async (req, res) => {
  const userData = req.userData;
  try {
    const findApplication = await rented.findOne({
      rented_by: userData.id,
    });

    if (!findApplication) {
      return res.status(200).json({
        success: false,
        message: false,
      });
    }

    return res.status(200).json({
      success: true,
      message: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  application,
  getApprovedApplications,
  checkRentedRoom,
  getUserLastPayment,
};

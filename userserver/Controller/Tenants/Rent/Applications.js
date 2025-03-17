const rentApproval = require("../../../Schemas/RentApproval");

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

module.exports = { application };

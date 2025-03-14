const rentApproval = require("../../../Schemas/RentApproval");

const sendApprovalRent = async (req, res) => {
  const { id } = req.userData; // Tenant ID from auth middleware

  try {
    const {
      personalDetails,
      employment_and_income,
      emergency_contact_details,
      rental_history,
      images,
      roomId,
      landlordId,
    } = req.body;

    const findExistingApproval = await rentApproval.findOne({ roomId });

    if (findExistingApproval) {
      return res.status(400).json({
        success: false,
        message: "Rent approval already made",
      });
    }

    const approvalValues = new rentApproval({
      personalDetails,
      employment_and_income,
      emergency_contact_details,
      rental_history,
      images,
      roomId,
      landlordId,
      tenantId: id,
    });

    await approvalValues.save();

    return res.status(201).json({
      success: true,
      message: "Rent approval submitted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { sendApprovalRent };

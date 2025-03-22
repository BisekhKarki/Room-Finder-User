const rentApproval = require("../../../Schemas/RentApproval");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const user = require("../../../Schemas/UserModel");
const room = require("../../../Schemas/RoomSchema");
const approved = require("../../../Schemas/RentApprovedSchema");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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

    const findExistingApproval = await rentApproval.findOne({
      roomId,

      tenantId: id,
    });

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

const acceptApproval = async (req, res) => {
  const { roomId, landlordId, userId } = req.body;
  const userData = req.userData;

  try {
    const findApproval = await rentApproval.findOne({
      roomId: roomId,
      landlordId: landlordId,
      tenantId: userId,
    });

    if (!findApproval) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    if (findApproval.accepted) {
      return res.status(400).json({
        success: false,
        message: "Application already accepted",
      });
    }

    findApproval.accepted = true;
    await findApproval.save();

    const accepted = await approved.findById(findApproval._id);
    if (accepted) {
      return res.status(400).json({
        success: false,
        message: "Application already accepted",
      });
    }

    const newApprovedApplication = await new approved({
      ...findApproval.toObject(),
      _id: undefined,
      acceptedAt: new Date(),
    });
    await newApprovedApplication.save();

    sendEmailToTenant(
      findApproval.personalDetails.email,
      roomId,
      userData.id,
      findApproval.personalDetails.fullName
    );

    return res.status(200).json({
      success: true,
      message: "Application approved Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const sendEmailToTenant = async (email, roomId, landlordId, FullName) => {
  try {
    const findUser = await user.findById(landlordId);

    const landlordName = findUser.FirstName + " " + findUser.LastName;
    console.log(landlordName);
    const getRoom = await room.findById(roomId);
    console.log(getRoom);
    const location =
      getRoom.location.Province +
      ", " +
      getRoom.location.city +
      ", " +
      getRoom.location.landmark;

    const roomName = getRoom.basic.name;

    await transporter.sendMail({
      from: "RoomFinderNepal@np.nepal",
      to: email,
      subject: "Application Update Mail",
      html: `
      <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Room Application Approved</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #007BFF;
            margin: 0;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            margin: auto;
            overflow: hidden;
        }
        .header {
            background: #0056b3;
            color: #ffffff;
            text-align: center;
            padding: 15px;
            font-size: 24px;
            font-weight: bold;
            border-radius: 8px 8px 0 0;
        }
        p {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
        }
        .info {
            background: #f4f4f4;
            padding: 15px;
            border-left: 4px solid #007BFF;
            margin: 10px 0;
            border-radius: 5px;
        }
        .info p {
            margin: 5px 0;
        }
        .message-box {
            background: #e9f5ff;
            padding: 15px;
            border-left: 4px solid #0056b3;
            font-style: italic;
            color: #333;
            border-radius: 5px;
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #333;
            padding-top: 10px;
            border-top: 1px solid #ddd;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 15px;
            background: #007BFF;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .button:hover {
            background: #0056b3;
            color:white;
        }
    </style>
</head>
<body>

    <div class="email-container">
        <div class="header">Room Application Approved</div>

        <p><strong>Dear ${FullName},</strong></p>
        <p>Congratulations! Your application for <strong>${roomName}</strong> has been approved. You may now proceed with the payment to finalize your booking.</p>

        <div class="info">
            <p><strong>Room Name:</strong> ${roomName}</p>
            <p><strong>Landlord:</strong> ${landlordName}</p>
            <p><strong>Location:</strong> ${location}</p>
        </div>

        <p><strong>Next Steps:</strong></p>
        <div class="message-box">
            <p>Please complete the payment at your earliest convenience to secure your stay. If you have any questions, feel free to contact us.</p>
        </div>

        <div class="footer">
            <p>This email was sent from the Room Finder platform.</p>
            
        </div>
    </div>

</body>
</html>
`,
    });
    return;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendApprovalRent, acceptApproval };

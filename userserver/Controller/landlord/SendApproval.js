const ApprovalSchema = require("../../Schemas/ApproveRooms");
const nodemailer = require("nodemailer");
const userSchema = require("../../Schemas/UserModel");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmailToLandord = async (email, locationRoom, FullName, roomName) => {
  try {
    const location =
      locationRoom.province +
      ", " +
      locationRoom.city +
      ", " +
      locationRoom.landmark;

    await transporter.sendMail({
      from: "RoomFinderNepal@np.nepal",
      to: email,
      subject: "Room Post Application Mail",
      html: `
      <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Room Application Approval</title>
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
        <div class="header">Room Application Approval</div>

        <p><strong>Dear ${FullName},</strong></p>
        <p>Your room post application for <strong>${roomName}</strong> is on pending list. You may now proceed with the payment to finalize your room post approval and get verified.</p>

        <div class="info">
            <p><strong>Room Name:</strong> ${roomName}</p>
            <p><strong>Landlord:</strong> ${FullName}</p>
            <p><strong>Location:</strong> ${location}</p>
        </div>

        <p><strong>Next Steps:</strong></p>
        <div class="message-box">
            <p>Please complete the payment at your earliest convenience inorder to proceed with the room posting. If you have any questions, feel free to contact us.</p>
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

const getApproval = async (req, res) => {
  const { basic, location, features, images, contact, landlordId } = req.body;

  try {
    const user = await userSchema.findOne({ _id: landlordId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // Check if a room already exists with the same details
    const findRoomExists = await ApprovalSchema.findOne({
      "basic.name": basic.name,
      "location.city": location.city,
      landlordId: landlordId,
      "contact.phone": contact.phone,
    });
    console.log(findRoomExists);

    if (findRoomExists) {
      return res.status(400).json({
        success: false,
        message: "Room for approval already exists",
      });
    }

    const Approving = new ApprovalSchema(req.body);
    await Approving.save();
    // console.log(Approving);

    sendEmailToLandord(
      user.Email,
      Approving.location,
      user.firstName + user.LastName,
      Approving.basic.name
    );

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

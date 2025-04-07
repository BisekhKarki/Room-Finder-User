const cron = require("node-cron");
const rented = require("../Schemas/RentedRoomSchema");
const dotenv = require("dotenv");
dotenv.config();
const nodemailer = require("nodemailer");
const user = require("../Schemas/UserModel");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const emailTemplate = (FullName, roomName, landlordName, location, dueDate) => `
    <!DOCTYPE html>
    <html> 
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Reminder</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
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
            background: #d9534f;
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
            background: #f8f9fa;
            padding: 15px;
            border-left: 4px solid #d9534f;
            margin: 10px 0;
            border-radius: 5px;
        }
        .info p {
            margin: 5px 0;
        }
        .message-box {
            background: #fff3cd;
            padding: 15px;
            border-left: 4px solid #d9534f;
            font-style: italic;
            color: #856404;
            border-radius: 5px;
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #777;
            padding-top: 10px;
            border-top: 1px solid #ddd;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 15px;
            background: #d9534f;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
        }
        .button:hover {
            background: #c9302c;
            color: white;
        }
    </style>
</head>
<body>

    <div class="email-container">
        <div class="header">Payment Reminder</div>

        <p><strong>Dear ${FullName},</strong></p>
        <p>This is a gentle reminder that your payment for <strong>${roomName}</strong> is due soon. Please ensure the payment is made on time to avoid any issues with your booking.</p>

        <div class="info">
            <p><strong>Room Name:</strong> ${roomName}</p>
            <p><strong>Landlord:</strong> ${landlordName}</p>
            <p><strong>Location:</strong> ${location}</p>
            <p><strong>Due Date:</strong> ${dueDate}</p>
            
        </div>

        <p><strong>What to do next?</strong></p>
        <div class="message-box">
            <p>Please proceed with the payment before <strong>${dueDate}</strong>. If you have already made the payment, kindly ignore this reminder.</p>
        </div>

        <p>If you have any questions, feel free to contact us.</p>

        <div class="footer">
            <p>This email was sent from the Room Finder Nepal platform.</p>
        </div>
    </div>

</body>
    </html>
`;

const sendReminderEmail = async ({
  email,
  FullName,
  roomName,
  landlordName,
  location,
  dueDate,
}) => {
  try {
    await transporter.sendMail({
      from: "RoomFinderNepal@np.nepal",
      to: email,
      subject: "Room Rent Payment Reminder!!!",
      html: emailTemplate(FullName, roomName, landlordName, location, dueDate),
    });
  } catch (error) {
    console.log(error);
  }
};

const scheduleUserEmails = async () => {
  try {
    const now = new Date();
    const getLatestDate = new Date(now.toLocaleDateString());
    // console.log(getLatestDate);

    const rentedRooms = await rented.find({});

    const filteredRoom = rentedRooms.filter((r) => {
      const room_time = new Date(new Date(r.rented_date).toLocaleDateString());
      const minusedTime = (getLatestDate - room_time) / (1000 * 60 * 60 * 24);

      return minusedTime === 30;
    });

    const getHours = now.getHours();
    const getMinutes = now.getMinutes();
    // console.log(getHours, getMinutes);

    filteredRoom.forEach(async (r) => {
      const getUser = await user.findOne({ _id: r.rented_by });
      console.log(getUser.Email);
      if (!getUser || !getUser.Email) {
        console.error(`No email found for user ID: ${r.rented_by}`);
        return; // Skip this user
      }

      cron.schedule(`0 10 * * *`, async () => {
        try {
          console.log(`Sending reminder email to ${r.rented_user_name}`);

          await sendReminderEmail({
            email: getUser.Email,
            FullName: r.rented_user_name,
            roomName: r.basic.name,
            landlordName: r.contact.name,
            location: r.location.city,
            dueDate: r.rented_date.toISOString().split("T")[0],
          });
          console.log(`Reminder email sent to ${r.rented_user_name}`);
        } catch (error) {
          console.log(error);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  scheduleUserEmails,
};

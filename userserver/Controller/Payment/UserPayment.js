const dotenv = require("dotenv");
dotenv.config();
const purchaseSchema = require("../../Schemas/PaymentSchema");
const rentedProperties = require("../../Schemas/RentedRoomSchema");
const roomSchema = require("../../Schemas/RoomSchema");
const room = require("../../Schemas/RoomSchema");
const user = require("../../Schemas/UserModel");
const nodemailer = require("nodemailer");

const puppeteer = require("puppeteer");
const receiptHtml = require("../../ReceiptTemplate");

const path = require("path");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const userkhaltiPayment = async (req, res) => {
  const {
    room_id,
    buyer_name,

    purchase_amount,
  } = req.body;
  const convertedAmount = String(purchase_amount);
  try {
    // const findPayment = await purchaseSchema.findOne({
    //   buyer_name,
    //   seller_name,
    //   room_id,
    //   purchase_type,
    // });

    const response = await fetch(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          return_url: `${FRONTEND_URL}/user/verify`,
          website_url: `${FRONTEND_URL}/user/home`,

          amount: convertedAmount,
          purchase_order_id: room_id,
          purchase_order_name: buyer_name,
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      return res.status(200).json({
        success: true,
        message: data.payment_url,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const checkuserPaymentStatus = async (req, res) => {
  const { pidx } = req.body;
  try {
    const response = await fetch(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pidx: pidx }),
      }
    );

    const data = await response.json();
    return res.status(200).json({
      message: data,
    });
  } catch (error) {
    console.error("Error checking payment status:", error);
  }
};

const saveDetails = async (req, res) => {
  const {
    purchase_type,
    room_id,
    buyer_name,
    seller_name,
    landlord_id,
    purchase_amount,
    purchase_date,
    payment_method,
  } = req.body;
  const userData = req.userData;
  try {
    const newPurchaseDetails = await purchaseSchema({
      purchase_type,
      room_id,
      buyer_name,
      seller_name,
      purchase_amount,
      purchase_date,
      landlord_id,
      payment_method,
      payment_status: "completed",
      buyer_id: userData.id,
    });
    await newPurchaseDetails.save();

    const findRentedRooms = await roomSchema.findById(room_id);

    const findRented = await rentedProperties.findById(room_id);
    if (findRented) {
      findRented.last_payment = new Date();
      await findRented.save();
      console.log("Hello world");
      saveRoomPayement({
        room: findRented,
        purchase_amount: purchase_amount,
        renter: userData.id,
      });

      return res.status(200).json({
        success: true,
        message: "Purchase successfull",
      });
    } else {
      const saveRoomToRented = await rentedProperties({
        basic: findRentedRooms.basic,
        location: findRentedRooms.location,
        features: findRentedRooms.features,
        images: findRentedRooms.images,
        contact: findRentedRooms.contact,
        landlordId: findRentedRooms.landlordId,
        rented_by: userData.id,
        room_id: room_id,
        last_payment: new Date(),
        rented_user_name: buyer_name,
        reviews: findRentedRooms.reviews,
        rented_date: new Date(),
        rented: true,
      });

      await saveRoomToRented.save();
      saveRoomPayement({
        room: saveRoomToRented,
        purchase_amount: purchase_amount,
        renter: userData.id,
      });

      const findRoomById = await room.findById(room_id);
      findRoomById.show = false;
      await findRoomById.save();
      return res.status(200).json({
        success: true,
        message: "Purchase successfull",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const saveRoomPayement = async ({ room, purchase_amount, renter }) => {
  try {
    const tenant = await user.findById(renter);

    const data = {
      name: room.rented_user_name,
      amount: Number(purchase_amount),
      roomName: room.basic.name,
    };

    console.log(data);

    const receiptPath = await generateReceipt(data);

    await transporter.sendMail({
      from: "RoomFinderNepal@np.nepal",
      to: tenant.Email,
      subject: "Room Payment Receipt",
      html: `
        <p>Hello ${data.name},</p>
        <p>Thank you for your payment. Attached is your official payment receipt.</p>
        <p><strong>Status:</strong> Completed</p>
        <p><strong>Amount:</strong> Rs. ${Number(purchase_amount)}</p>
        <p>Regards,<br>Room Finder Nepal</p>
      `,
      // text: w"Attached is your payment receipt.",
      attachments: [
        {
          filename: "RoomPaymentReceipt.pdf",
          path: receiptPath,
        },
      ],
    });

    await transporter.sendMail({
      from: "RoomFinderNepal@np.nepal",
      to: room.contact.email,
      subject: "Tenant Room Payment Receipt",
      html: `
        <p>Hello ${room.contact.username},</p>
        <p>A user has completed the payment process and has booked you room you can see the details in you rooms</p>
        <p><strong>Status:</strong>Payment Completed</p>
        <p><strong>Amount:</strong> Rs. ${Number(purchase_amount)}</p>
        <p>Regards,<br>Room Finder Nepal</p>
      `,
      // text: w"Attached is your payment receipt.",
      attachments: [
        {
          filename: "RoomPaymentReceipt.pdf",
          path: receiptPath,
        },
      ],
    });

    return receiptPath;
  } catch (error) {
    return error.message;
  }
};

const saveCashDetails = async (req, res) => {
  try {
    const {
      purchase_type,
      room_id,
      buyer_name,
      seller_name,
      landlord_id,
      purchase_amount,
      purchase_date,
      payment_method,
    } = req.body;
    const userData = req.userData;
    const newPurchaseDetails = await purchaseSchema({
      purchase_type,
      room_id,
      buyer_name,
      seller_name,
      purchase_amount,
      purchase_date,
      payment_status: "pending",
      landlord_id,
      payment_method,
      buyer_id: userData.id,
    });
    await newPurchaseDetails.save();

    return res.status(200).json({
      success: true,
      message: "Transaction saved",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getCashOnHandStatus = async (req, res) => {
  const userData = req.userData;
  const { roomId, landlordId } = req.params;

  try {
    const findUserPurchase = await purchaseSchema
      .findOne({
        buyer_id: userData.id,
        room_id: roomId,
        landlord_id: landlordId,
      })
      .sort({ purchase_date: -1 });

    if (!findUserPurchase) {
      return res.status(200).json({
        success: false,
        message: "No transaction found",
      });
    }

    return res.status(200).json({
      success: true,
      message: findUserPurchase.payment_status,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getCashOnHandStatusForLandlord = async (req, res) => {
  const { roomId, landlordId } = req.params;
  const { userId } = req.body;
  console.log({
    userId,
    roomId,
    landlordId,
  });

  try {
    const findUserPurchase = await purchaseSchema
      .findOne({
        buyer_id: userId,
        room_id: roomId,
        landlord_id: landlordId,
      })
      .sort({ purchase_date: -1 });
    // console.log(findUserPurchase);

    if (!findUserPurchase) {
      return res.status(400).json({
        success: false,
        message: "No transaction found",
      });
    }

    return res.status(200).json({
      success: true,
      message: findUserPurchase,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const accpetPayment = async (req, res) => {
  const userData = req.userData;
  const { roomId, buyerId } = req.body;
  try {
    const purchase = await purchaseSchema
      .findOne({
        room_id: roomId,
        buyer_id: buyerId,
        landlord_id: userData.id,
      })
      .sort({
        purchase_date: -1,
      });

    purchase.payment_status = "completed";
    await purchase.save();
    console.log(purchase);
    savePaymentDetails(roomId, purchase.buyer_name, buyerId);

    return res.status(200).json({
      success: true,
      message: "Tenant added to the room",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const savePaymentDetails = async (room_id, buyer_name, tenantId) => {
  try {
    const findAlreadyRented = await rentedProperties.findOne({
      room_id: room_id,
      rented_by: tenantId,
    });
    console.log(findAlreadyRented);

    if (findAlreadyRented) {
      findAlreadyRented.last_payment = new Date();
      await findAlreadyRented.save();
    } else {
      const findRentedRooms = await roomSchema.findById(room_id);
      const saveRoomToRented = await rentedProperties({
        basic: findRentedRooms.basic,
        location: findRentedRooms.location,
        features: findRentedRooms.features,
        images: findRentedRooms.images,
        contact: findRentedRooms.contact,
        landlordId: findRentedRooms.landlordId,
        rented_by: tenantId,
        room_id: room_id,
        rented_user_name: buyer_name,
        reviews: findRentedRooms.reviews,
        rented_date: new Date(),
        rented: true,
      });

      await saveRoomToRented.save();
      const findRoomById = await room.findById(room_id);
      findRoomById.show = false;
      await findRoomById.save();
    }

    return;
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const declinePayment = async (req, res) => {
  const userData = req.userData;
  const { roomId, buyerId } = req.body;
  try {
    const purchase = await purchaseSchema.findOne({
      room_id: roomId,
      buyer_id: buyerId,
      landlord_id: userData.id,
    });

    const room = await roomSchema.findById(roomId);
    const tenant = await user.findById(buyerId);

    sendDeclineEmail(
      purchase.buyer_name,
      roomId,
      room.basic.name,
      tenant.Email
    );

    console.log(purchase);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const sendDeclineEmail = async (buyer_name, roomId, roomName, email) => {
  console.log({
    buyer_name,
    roomId,
    roomName,
    email,
  });
  try {
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
    <title>Payment Declined Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            background: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            margin: auto;
        }
        .header {
            color: #e74c3c;
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 2px solid #eee;
        }
        .content {
            margin: 25px 0;
        }
        .details-box {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 6px;
            margin: 20px 0;
        }
        .detail-item {
            margin: 10px 0;
            color: #555;
        }
        .detail-item strong {
            color: #333;
            width: 120px;
            display: inline-block;
        }
        .action-button {
            display: inline-block;
            background: #e74c3c;
            color: white !important;
            padding: 12px 25px;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 15px;
        }
        .footer {
            text-align: center;
            color: #777;
            font-size: 14px;
            padding-top: 20px;
            border-top: 2px solid #eee;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h2>Payment Not Received</h2>
        </div>
        
        <div class="content">
            <p>Dear ${buyer_name},</p>
            
            <p>We regret to inform you that your payment for the room application has not be accepted. As a result, your application for <strong>${roomName}</strong> has been declined. <br /> Please pay either with online or cash in hand and contact it with landlord after the payment is made</p>
            
            <div class="details-box">
                <div class="detail-item">
                  <strong>Room Name:</strong> ${roomId}
                    <strong>Room Name:</strong> ${roomName}
                </div>
                <div class="detail-item">
                    <strong>Applicant Name:</strong> ${buyer_name}
                </div>
                <div class="detail-item">
                    <strong>Status:</strong> <span style="color: #e74c3c;">Declined</span>
                </div>
            </div>

            <p>Please take the following actions:</p>
            <ul style="color: #555; line-height: 1.6;">
                <li>Verify your payment method details</li>
                <li>Ensure sufficient funds are available</li>
                <li>Contact your financial institution if needed</li>
            </ul>

            // <center>
            //     <a href="[Your_Portal_Link]" class="action-button">
            //         View Application Details
            //     </a>
            // </center>
        </div>

        <div class="footer">
            <p>If you believe this is an error, please contact our support team immediately.</p>
            <p>© 2024 Room Finder Nepal. All rights reserved.</p>
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

const generateReceipt = async (data) => {
  const fileName = `receipt_${Date.now()}.pdf`;
  const filePath = path.join(__dirname, `../../receipts/${fileName}`);

  const html = receiptHtml({
    name: data.name,
    amount: data.amount,
    date: new Date().toLocaleDateString(),
    roomName: data.roomName,
    status: "Completed",
  });

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "domcontentloaded" });
  await page.pdf({
    path: filePath,
    format: "A4",
    printBackground: true,
  });
  await browser.close();
  return filePath;
};

module.exports = {
  userkhaltiPayment,
  saveDetails,
  saveCashDetails,
  getCashOnHandStatus,
  getCashOnHandStatusForLandlord,
  accpetPayment,
  declinePayment,
};

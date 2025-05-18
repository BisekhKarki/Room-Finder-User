const dotenv = require("dotenv");
dotenv.config();
const Approval = require("../../Schemas/ApproveRooms");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const roomPayment = require("../../Schemas/RoomPaymentSchema");
const nodemailer = require("nodemailer");
const puppeteer = require("puppeteer");
const receiptHtml = require("../../ReceiptTemplate");

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const khaltiPayment = async (req, res) => {
  const { id, name, amount, roomId } = req.body;
  const getAmount = parseInt(amount);
  const resultedAmount = (12 * getAmount) / 100;
  const validAmount = String(resultedAmount);

  try {
    const response = await fetch(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          return_url: `${FRONTEND_URL}/landlord/verify`,
          website_url: `${FRONTEND_URL}/landlord/MyRooms`,

          amount: validAmount,
          purchase_order_id: id,
          purchase_order_name: name,
        }),
      }
    );
    const data = await response.json();

    if (response.ok) {
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

const checkPaymentStatus = async (req, res) => {
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

// const StripePayment = async (req, res) => {
//   const { id, amount, name } = req.body;
//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: name,
//               description: `Payment for product ID: ${id}`,
//             },
//             unit_amount: amount,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       success_url: "http://localhost:3000/landlord/successfull",
//       cancel_url: "http://localhost:3000/landlord/unsuccessfull",
//     });

//     // if (name === "Cart payment") {
//     //   await cartModel.deleteMany({});
//     // }
//     return res.status(200).json({
//       id: session.id,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(200).json({
//       success: false,
//       message: error,
//     });
//   }
// };

const generateReceipt = async (data) => {
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

  // Generate PDF as buffer
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();
  return pdfBuffer;
};

const saveRoomPostPayement = async (req, res) => {
  const { roomId, status } = req.body;

  try {
    const room = await Approval.findById(roomId);
    if (!room) {
      return res.status(400).json({
        success: false,
        message: "No room found",
      });
    }

    const getAmount = room.basic.price;
    const resultedAmount = (12 * getAmount) / 100;
    const convertedAmount = String(resultedAmount);

    const payment = new roomPayment({
      purchase_type: status,
      room_id: roomId,
      landlord_id: room.landlordId,
      name_of_person: room.contact.username,
      payment_amount: convertedAmount,
    });

    const data = {
      name: room.contact.username,
      amount: Number(convertedAmount),
      roomName: room.basic.name,
      status,
    };

    const pdfBuffer = await generateReceipt(data);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: "RoomFinderNepal@np.nepal",
      to: room.contact.email,
      subject: "Room Payment Receipt",
      html: `
        <p>Hello ${room.contact.username},</p>
        <p>Thank you for your payment. Attached is your official payment receipt.</p>
        <p><strong>Status:</strong> ${status}</p>
        <p><strong>Amount:</strong> Rs. ${convertedAmount}</p>
        <p>Regards,<br>Room Finder Nepal</p>
      `,
      attachments: [
        {
          filename: "RoomPaymentReceipt.pdf",
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });

    await payment.save();

    return res.status(200).json({
      success: true,
      message: "Payment done and email sent.",
    });
  } catch (error) {
    console.error("Payment email error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  khaltiPayment,
  //  StripePayment
  saveRoomPostPayement,
  checkPaymentStatus,
};

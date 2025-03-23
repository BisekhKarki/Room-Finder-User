const dotenv = require("dotenv");
dotenv.config();
const purchaseSchema = require("../../Schemas/PaymentSchema");
const rentedProperties = require("../../Schemas/RentedRoomSchema");
const roomSchema = require("../../Schemas/RoomSchema");

const userkhaltiPayment = async (req, res) => {
  const {
    purchase_type,
    room_id,
    buyer_name,
    seller_name,
    purchase_amount,
    purchase_date,
    payment_type,
    landlord_id,
    tenant_id,
  } = req.body;
  const convertedAmount = String(purchase_amount);
  try {
    const findPayment = await purchaseSchema.findOne({
      buyer_name,
      seller_name,
      room_id,
      purchase_type,
    });

    if (findPayment) {
      return res.status(400).json({
        success: false,
        message: "Payment has already been made",
      });
    }
    const response = await fetch(
      "https://a.khalti.com/api/v2/epayment/initiate/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          return_url: `http://localhost:3000/successfull/user`,
          website_url: `http://localhost:3000/successfull/user`,

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

const saveDetails = async (req, res) => {
  const {
    purchase_type,
    room_id,
    buyer_name,
    seller_name,
    landlord_id,
    purchase_amount,
    purchase_date,
    payment_type,
  } = req.body;
  const userData = req.userData;
  try {
    const findPayment = await purchaseSchema.findOne({
      buyer_name,
      seller_name,
      room_id,
      purchase_type,
      landlord_id,
      tenant_id: userData.id,
    });

    if (findPayment) {
      return res.status(400).json({
        success: false,
        message: "Payment has already been made",
      });
    }

    const newPurchaseDetails = await purchaseSchema({
      purchase_type,
      room_id,
      buyer_name,
      seller_name,
      purchase_amount,
      purchase_date,
      payment_type,
      landlord_id,
      landlord_id,
    });
    await newPurchaseDetails.save();

    const findRentedRooms = await roomSchema.findById(room_id);

    const saveRoomToRented = await rentedProperties({
      basic: findRentedRooms.basic,
      location: findRentedRooms.location,
      features: findRentedRooms.features,
      images: findRentedRooms.images,
      contact: findRentedRooms.contact,
      landlordId: findRentedRooms.landlordId,
      rented_by: userData.id,
      rented_user_name: buyer_name,
      rented_date: new Date(),
      rented: true,
    });

    await saveRoomToRented.save();

    return res.status(200).json({
      success: true,
      message: "Purchase successfull",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { userkhaltiPayment, saveDetails };

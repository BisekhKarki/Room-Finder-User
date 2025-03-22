const mongoose = require("mongoose");
const { Schema } = mongoose;

const purchase_schema = new mongoose.Schema({
  purchase_type: {
    type: String,
    required: true,
  },
  room_id: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },
  buyer_name: {
    type: String,
    require: true,
  },
  seller_name: {
    type: String,
  },
  purchase_amount: {
    type: String,
    required: true,
  },
  purchase_date: {
    type: Date,
  },
  payment_type: {
    type: String,
    required: true,
  },
});

const purchase =
  mongoose.models.purchase_schema ||
  mongoose.model("Purchase_Schema", purchase_schema);

module.exports = purchase;

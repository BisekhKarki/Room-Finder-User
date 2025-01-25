const mongoose = require("mongoose");

const forApproval = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
  roomType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  landlordId: {
    type: String,
    required: true,
  },
  landlordName: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  payment: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
  },
  facilities: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: false,
  },
});

const approveRoom =
  mongoose.models.forApproval || mongoose.model("For_Approval", forApproval);

module.exports = approveRoom;

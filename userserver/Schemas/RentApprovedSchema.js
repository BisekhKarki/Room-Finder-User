const mongoose = require("mongoose");
const { Schema } = mongoose;

const approved_rent = new mongoose.Schema({
  personalDetails: {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    perosonalContact: {
      type: String,
    },
    age: {
      type: String,
    },
    numberOfRenters: {
      type: String,
    },
    permanentAddress: {
      type: String,
    },
    marital_status: {
      type: String,
    },
  },
  employment_and_income: {
    job: {
      type: String,
    },
    income: {
      type: String,
    },
  },
  emergency_contact_details: {
    name: {
      type: String,
    },
    contact: {
      type: String,
    },
    relationship: {
      type: String,
    },
    alternateContact: {
      type: String,
    },
  },
  rental_history: {
    previous_address: {
      type: String,
    },
    length_of_stay: {
      type: String,
    },
    current_landlord_contact: {
      type: String,
    },
    reason_for_leave: {
      type: String,
    },
    criminal_record: {
      type: String,
    },
  },
  images: {
    citizen_front: {
      type: String,
    },
    citizen_back: {
      type: String,
    },
    personal_photo: {
      type: String,
    },
  },
  tenantId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  landlordId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "Rooms",
  },
  accepted: {
    type: Boolean,
  },
  acceptedAt: Date,
});

const rentApproved =
  mongoose.models.approved_rent ||
  mongoose.model("Approved_Rent", approved_rent);

module.exports = rentApproved;

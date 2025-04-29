const mongoose = require("mongoose");
const { Schema } = mongoose;

const rooms = new mongoose.Schema({
  basic: {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
    },
  },
  location: {
    street: {
      type: String,
    },
    zip: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    landmark: {
      type: String,
    },
    address: {
      type: String,
    },
    region: {
      type: String,
    },
  },
  features: {
    parking: {
      type: String,
    },
    Kitchen: {
      type: String,
    },
    balcony: {
      type: String,
    },
    category: {
      type: String,
    },
    waterfacility: {
      type: String,
    },
    direction: {
      type: String,
    },
    floor: {
      type: String,
    },
  },
  images: {
    type: Array,
  },
  contact: {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  landlordId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isVerified: {
    type: Boolean,
  },
  payment: {
    type: Boolean,
  },
  show: {
    type: Boolean,
  },
  reviews: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
      },
      rating: { type: Number, min: 0, max: 5 },
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const roomSchema = mongoose.models.rooms || mongoose.model("Rooms", rooms);

module.exports = roomSchema;

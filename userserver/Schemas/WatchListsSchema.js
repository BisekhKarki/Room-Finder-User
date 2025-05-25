const mongoose = require("mongoose");
const { Schema } = mongoose;

const user_WatchLists = new mongoose.Schema({
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
    Province: {
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
  pinnedLocation: {
    locationName: {
      type: String,
    },
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
  roomId: {
    type: Schema.Types.ObjectId,
    ref: "Rooms",
  },
  userId: {
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
      user: {
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

const userWatchLists =
  mongoose.models.rooms || mongoose.model("User_WatchLists", user_WatchLists);

module.exports = userWatchLists;

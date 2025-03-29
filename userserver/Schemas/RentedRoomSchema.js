const mongoose = require("mongoose");
const { Schema } = mongoose;

const rented_properties = new mongoose.Schema(
  {
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
    rented_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    room_id: {
      type: Schema.Types.ObjectId,
      ref: "Rooms",
    },
    rented_user_name: {
      type: String,
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
    rented_date: {
      type: Date,
    },
    rented: {
      type: Boolean,
    },

    price: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const rented_room =
  mongoose.models.rented_properties ||
  mongoose.model("rented_properties", rented_properties);

module.exports = rented_room;

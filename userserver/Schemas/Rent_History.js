const mongoose = require("mongoose");
const { Schema } = mongoose;

const rented_history = new mongoose.Schema(
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
    reviews: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
        },
        rating: { type: Number, min: 1, max: 5 },
      },
    ],
    rented_date: {
      type: Date,
    },
    rent_leave_date: {
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

const history =
  mongoose.models.rented_history ||
  mongoose.model("rented_history", rented_history);

module.exports = history;

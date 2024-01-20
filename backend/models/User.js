const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "username is required"],
  },

  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  oldOrders: [
    {
      date: {
        type: Date,
        default: Date.now,
      },
      items: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      total: {
        type: Number,
        required: true,
      },
    },
  ],
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  orderDate: {
    type: Date,
  },
});

module.exports = mongoose.model("User", userSchema, "users");

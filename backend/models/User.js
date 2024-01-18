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
});

module.exports = mongoose.model("User", userSchema, "users");

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  overview: {
    type: String,
    required: [true, "Product overview is required"],
    trim: true,
  },
  long_description: {
    type: String,
    required: [true, "Product long description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: 0,
  },
  poster: {
    type: String,
    required: [true, "Product poster image URL is required"],
  },

  rating: {
    type: Number,
    required: [true, "Product rating is required"],
    min: 1,
    max: 5,
  },
  in_stock: {
    type: Boolean,
    default: true,
  },
  size: {
    type: Number,
    required: [true, "Product size is required"],
  },
  best_seller: {
    type: Boolean,
    default: false,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

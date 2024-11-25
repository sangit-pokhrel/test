const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    countInStock: {
      type: Number,
      default: 0,
    },
    productImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const product = mongoose.model("Product", productSchema);
module.exports = product;

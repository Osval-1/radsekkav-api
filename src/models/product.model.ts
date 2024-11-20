import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  short_description: { type: String, required: true },
  is_new: {
    type: Boolean,
    required: true,
  },
  is_hot: {
    type: Boolean,
  },
  is_sold: {
    type: Boolean,
  },
  large_images: {
    type: Array,
    required: true,
  },
  small_images: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
});

const Product = mongoose.model("Member", productSchema);
module.exports = Product;

import mongoose from "mongoose";
import { Schema } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxLength: [50, "Product name should be less than 50 characters"]
  },
  description: {
    type: String,
    required: [true, "Product description is required"]
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    maxLength: [5, "Product price should not be more than 5 digits"]
  },
  count : {
    type: Number,
    required: [true, "Product count is required"],
    maxLength: [4, "Product count should not be more than 4 digits"],
    default: 0
  },
  category: {
    type: String,
    required: [true, "Please select product category"]
  },
  images: [
    {
      type : String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {timestamps: true});

export const Product = mongoose.model("Product", productSchema);
        
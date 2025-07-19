import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    maxLength: [120, "Product name should be less than 120 characters"]
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
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    maxLength: [4, "Product stock should not be more than 4 digits"],
    default: 0
  },
  category: {
    type: String,
    required: [true, "Please select product category"]
  },
  images: [
    {
      public_id: String,
      url: String
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {timestamps: true});

export const Product = mongoose.model("Product", productSchema);
        
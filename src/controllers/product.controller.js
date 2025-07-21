import { Product } from "../models/product.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * @description Add a new product
 * @route POST /api/products
 * @access Private (Admin only)
 */
export const addProduct = asyncHandler(async (req, res) => {
  // Extract product data from request body
  const { name, description, price, count, category, images } = req.body;
  
  // Validate required fields
  if (!name || !description || !price || !category) {
    throw new ApiError(400, "All required fields must be provided");
  }
  
  // Additional validation for price
  if (price <= 0) {
    throw new ApiError(400, "Price must be greater than 0");
  }
  
  // Create product
  const product = await Product.create({
    name,
    description,
    price,
    count: count || 0, // Default to 0 if not provided
    category,
    images: images || [] // Default to empty array if not provided
  });
  
  // Verify product was created successfully
  if (!product) {
    throw new ApiError(500, "Product creation failed");
  }
  
  // Return success response
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        product,
        "Product created successfully"
      )
    );
});

import { Product } from "../models/product.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/**
 * @route POST /api/products
 * @description Add a new product
 * @access Private (Admin)
 */
const addProduct = asyncHandler(async (req, res) => {
  // Extract product data from request body
  const { name, description, price, category, stock } = req.body;

  // Validate required fields
  if (!name || !description || !price || !category) {
    throw new ApiError(400, "All fields are required");
  }

  // Create a new product
  const product = await Product.create({
    name,
    description,
    price,
    category,
    stock: stock || 0,
    images: req.body.images || [] // Optional images
  });

  // Check if product was created successfully
  if (!product) {
    throw new ApiError(500, "Failed to add product");
  }

  // Return success response
  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product added successfully"));
});

/**
 * @route GET /api/products/search
 * @description Search for products
 * @access Public
 */
const searchProducts = asyncHandler(async (req, res) => {
  const { keyword, category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

  // Build the search query
  const query = {};

  // Add keyword search condition for name and description
  if (keyword) {
    query.$or = [
      { name: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } }
    ];
  }

  // Add category filter
  if (category) {
    query.category = category;
  }

  // Add price range filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  // Calculate pagination
  const skip = (Number(page) - 1) * Number(limit);

  // Execute search query
  const products = await Product.find(query)
    .skip(skip)
    .limit(Number(limit));

  // Get total count for pagination
  const totalProducts = await Product.countDocuments(query);
  
  // Return search results
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
        currentPage: Number(page),
        totalPages: Math.ceil(totalProducts / Number(limit)),
        totalProducts
      },
      "Products retrieved successfully"
    )
  );
});

export { addProduct, searchProducts };

import productModel from "../models/product.model..js";
import AppError from "../utils/error.util.js";

// controller function to create a new product
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, category, stock } = req.body;

    if (!name || !description || !price || !category || !stock) {
      return next(new AppError(400, "All fields are required"));
    }

    const product = await productModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to get all products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await productModel.find();

    if (!products) {
      return next(new AppError("Oops! products not fetched"));
    }

    res.status(200).json({
      success: true,
      message: "All products fetched successfully",
      products,
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to update product
const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return next(new AppError(400, "Product not found"));
    }

    const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct,
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to delete product
const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return next(new AppError(400, "Product not found"));
    }

    const deleteProduct = await productModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to get product details
const productDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id);

    if (!product) {
      return next(new AppError(400, "Product not found"));
    }

    res.status(200).json({
      success: true,
      message: "Product fetched successfully",
      product
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

export { createProduct, getAllProducts, updateProduct, deleteProduct, productDetails };

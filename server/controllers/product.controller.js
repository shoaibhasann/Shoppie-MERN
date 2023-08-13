import catchAsyncError from "../middlewares/catchAsyncError.middleware.js"
import productModel from "../models/product.model.js";
import AppError from "../utils/error.util.js";

const createProduct = catchAsyncError(async (req, res, next) => {
  const product = await productModel.create(req.body);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product,
  });
});

const getAllProducts = catchAsyncError(async (req, res, next) => {
  const products = await productModel.find();

  if (!products || products.length === 0) {
    return next(new AppError(404, "Oops! Products not found"));
  }

  res.status(200).json({
    success: true,
    message: "All products fetched successfully",
    products,
  });
});

const updateProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return next(new AppError(404, "Product not found"));
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
});

const deleteProduct = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return next(new AppError(404, "Product not found"));
  }

  await productModel.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

const productDetails = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  const product = await productModel.findById(id);

  if (!product) {
    return next(new AppError(404, "Product not found"));
  }

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    product,
  });
});

export {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  productDetails,
};

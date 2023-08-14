import productModel from "../models/product.model.js";
import AppError from "../utils/error.util.js";
import Feature from "../utils/features.util.js";

const createProduct = async (req, res, next) => {
  try {
      req.body.user = req.user.id;

      const product = await productModel.create(req.body);

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        product,
      });
  } catch (error) {
    return next(new AppError(500, 'Internal Server Error' || error.message));
  }
};

const getAllProducts = async (req, res, next) => {
  try {
      const productCount = await productModel.countDocuments();
      const resultPerPage = 5;

      const apiFeature = new Feature(productModel.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);

      const products = await apiFeature.query;

      if (!products || products.length === 0) {
        return next(new AppError(404, "Oops! Products not found"));
      }

      res.status(200).json({
        success: true,
        message: "All products fetched successfully",
        products,
        productCount,
      });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

const updateProduct = async (req, res, next) => {
  try {
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
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
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
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

const productDetails = async (req, res, next) => {
  try {
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
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

export {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  productDetails,
};

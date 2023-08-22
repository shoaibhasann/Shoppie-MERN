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
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    const productsCount = await productModel.countDocuments();
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
      productsCount,
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

// controller function to create and update review
const productReview = async (req, res, next) => {
  try {
    const { rating, comment, productId } = req.body;
    const { name, id } = req.user;

    const newReview = {
      user: id,
      name,
      rating: Number(rating),
      comment,
    };

    const product = await productModel.findById(productId);

    let reviewed = false;

    for (const review of product.reviews) {
      if (review.user.toString() === id.toString()) {
        review.rating = rating;
        review.comment = comment;
        reviewed = true;
        break;
      }
    }

    if (!reviewed) {
      product.reviews.push(newReview);
      product.numberOfReviews = product.reviews.length;
    }

    const totalRatings = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    product.ratings = totalRatings / product.reviews.length;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Thanks for the feedback!",
    });
  } catch (error) {
    return next(new AppError(500, error.message || "Internal Server Error"));
  }
};

// controller function to get all reviews of product
const getAllReviews = async (req, res, next) => {
  try {
    const { id } = req.query;

    if(!id){
      return next(new AppError(400, 'Product id is required'));
    }

    const product = await productModel.findById(id);

    if (!product) {
      return next(new AppError(404, "Product not found"));
    }

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews: product.reviews,
    });
  } catch (error) {
    return next(new AppError(500, error.message || "Internal Server Error"));
  }
};

const deleteReview = async (req, res, next) => {
  try {
    const { productId, id } = req.query;

    const product = await productModel.findById(productId);

    if (!product) {
      return next(new AppError(404, "Product not found"));
    }

    const reviews = product.reviews.filter((review) => review._id.toString() !== id.toString());

    const totalRatings = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    let ratings = reviews.length > 0 ? totalRatings / reviews.length : 0;


    let numberOfReviews = reviews.length;

    await productModel.findByIdAndUpdate(productId, {
      reviews,
      ratings,
      numberOfReviews
    },{
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    return next(new AppError(500, error.message || "Internal Server Error"));
  }
};

export {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  productDetails,
  productReview,
  getAllReviews,
  deleteReview
};

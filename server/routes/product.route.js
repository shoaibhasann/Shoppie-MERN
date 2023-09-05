import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getAllReviews,
  productDetails,
  productReview,
  updateProduct,
} from "../controllers/product.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

// Admin Routes
router.post(
  "/admin",
  isLoggedIn,
  authorizedRoles("Admin"),
  upload.array("images", 5),
  createProduct
);
router.put("/admin/:id", isLoggedIn, authorizedRoles("Admin"), updateProduct);
router.delete(
  "/admin/:id",
  isLoggedIn,
  authorizedRoles("Admin"),
  deleteProduct
);

// Review Routes
router.put("/review", isLoggedIn, productReview);
router.delete("/review", isLoggedIn, deleteReview);

// Public Routes
router.get("/", getAllProducts);
router.get("/product/:id", productDetails);
router.get("/reviews", getAllReviews);

export default router;

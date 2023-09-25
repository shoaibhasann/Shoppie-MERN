import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  deleteReview,
  getAdminProducts,
  getAllProducts,
  getAllReviews,
  productDetails,
  productReview,
  updateProduct,
} from "../controllers/product.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";


const router = Router();

// Admin Routes
router.post(
  "/admin",
  isLoggedIn,
  authorizedRoles("Admin"),
  createProduct
);
router.put("/admin/:id", isLoggedIn, authorizedRoles("Admin"), updateProduct);
router.delete(
  "/admin/:id",
  isLoggedIn,
  authorizedRoles("Admin"),
  deleteProduct
);
router.get("/admin", isLoggedIn, authorizedRoles("Admin"), getAdminProducts);

// Review Routes
router.put("/review", isLoggedIn, productReview);
router.delete("/review", isLoggedIn, deleteReview);

// Public Routes
router.get("/", getAllProducts);
router.get("/product/:id", productDetails);
router.get("/reviews", getAllReviews);

export default router;

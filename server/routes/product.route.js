import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, productDetails, productReview, updateProduct } from "../controllers/product.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";


const router = Router();

router.post('/admin', isLoggedIn, authorizedRoles('Admin'), createProduct);

router.get("/", getAllProducts);

router.put("/admin/:id", isLoggedIn, authorizedRoles("Admin"), updateProduct);

router.put('/review', isLoggedIn, productReview);

router.delete("/admin/:id", isLoggedIn, authorizedRoles("Admin"), deleteProduct);

router.get('/:id', productDetails);

export default router;
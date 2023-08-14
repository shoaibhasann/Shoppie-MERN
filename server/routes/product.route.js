import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, productDetails, updateProduct } from "../controllers/product.controller.js";
import { authorizedRoles, isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.post('/', isLoggedIn, authorizedRoles('Admin'), createProduct);
router.get("/", getAllProducts);
router.put("/:id", isLoggedIn, authorizedRoles("Admin"), updateProduct);
router.delete("/:id", isLoggedIn, authorizedRoles("Admin"), deleteProduct);
router.get('/:id', productDetails);

export default router;
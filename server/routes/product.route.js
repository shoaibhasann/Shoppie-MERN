import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, productDetails, updateProduct } from "../controllers/product.controller.js";

const router = Router();

router.post('/', createProduct);
router.get('/', getAllProducts);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/:id', productDetails);

export default router;
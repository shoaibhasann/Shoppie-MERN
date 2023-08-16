import { Router } from "express";
import { isLoggedIn, authorizedRoles } from "../middlewares/auth.middleware.js";
import { createOrder, deleteOrder, getAllOrders, getSingleOrder, myOrders, updateOrderStatus } from "../controllers/order.controllers.js";

const router = Router();

// Routes related to orders
router.post("/", isLoggedIn, createOrder); // Create a new order (requires authentication)
router.get("/my-orders", isLoggedIn, myOrders); // Get orders for the logged-in user (requires authentication)
router.get("/all-orders", isLoggedIn, authorizedRoles("Admin"), getAllOrders); // Get all orders (Admin role required)
router.put("/:id", isLoggedIn, authorizedRoles("Admin"), updateOrderStatus); // update order status (Admin role required)
router.delete("/:id", isLoggedIn, authorizedRoles("Admin"), deleteOrder); // delete order (Admin role required)
router.get("/:id", isLoggedIn, getSingleOrder); // Get a single order by ID (requires authentication)

export default router;

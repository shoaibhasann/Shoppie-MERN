import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth.middleware.js";
import { createPaymentIntent, sendStripeKey } from "../controllers/payment.controller.js";

const router = Router();

router.post('/process', isLoggedIn, createPaymentIntent);
router.get('/stripeapikey', isLoggedIn, sendStripeKey);

export default router;


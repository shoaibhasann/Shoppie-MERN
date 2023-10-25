import dotenv from "dotenv";
import express from "express";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";
import paymentRoutes from "./routes/payment.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";

// loding enviroment variables
dotenv.config();

// create an instance of express app
const app = express();

// Middleware for Parsing request body
app.use(express.json());

// Middleware for file uploading
app.use(fileUpload());

// Middleware for url decode
app.use(express.urlencoded({ extended: true }));

// Middleware for parsing cookie
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Handling product routes
app.use("/api/v1/products", productRoutes);

// Handling user routes
app.use("/api/v1", userRoutes);

// Handle order  routes
app.use("/api/v1/orders", orderRoutes);

// Handle payment routes
app.use("/api/v1/payment", paymentRoutes);

// Handling not defined routes
app.use("*", (req, res) => {
  res.status(404).send("Oops! page not found");
});

// Middleware for error handling
app.use(errorMiddleware);

export default app;

import express from 'express';
import productRoutes from './routes/product.route.js';
import userRoutes from './routes/user.route.js';
import orderRoutes from './routes/order.route.js';
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from 'cookie-parser';

// create an instance of express app
const app = express();

// Middleware for Parsing request body 
app.use(express.json());

// Middleware for parsing cookie
app.use(cookieParser());

// Middleware for url decode
app.use(express.urlencoded({
    extended: true,
}));

// Handling product routes
app.use('/api/v1/products', productRoutes);

// Handling user routes
app.use('/api/v1', userRoutes);

// Handle order  routes
app.use('/api/v1/orders', orderRoutes);

// Handling not defined routes
app.use("*", (req,res) => {
    res.send("Oops: 404 Page not Found!")
});

// Middleware for error handling
app.use(errorMiddleware);

export default app;
import express from 'express';
import productRoutes from './routes/product.route.js';
import errorMiddleware from "./middlewares/error.middleware.js";

// create an instance of express app
const app = express();

// Middleware for Parsing request body 
app.use(express.json());

// Middleware for url decode
app.use(express.urlencoded({
    extended: true,
}));

// Handling product routes
app.use('/api/v1/products', productRoutes);

// Handling not defined routes
app.use("*", (req,res) => {
    res.send("Oops: 404 Page not Found!")
});

// Middleware for error handling
app.use(errorMiddleware);

export default app;
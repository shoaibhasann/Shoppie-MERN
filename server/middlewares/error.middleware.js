import AppError from "../utils/error.util.js";

const errorMiddleware = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Something went wrong';

    // Handling MongoDB error
    if(err.name === 'CastError'){
        const message = `Resource not found, Invalid: ${err.path}`
        return res.status(400).json({
            success: false,
            message,
        });
    }

    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
        stack: err.stack
    });
}

export default errorMiddleware;

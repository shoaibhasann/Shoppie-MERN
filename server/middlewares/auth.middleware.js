import AppError from "../utils/error.util.js";
import jwt from "jsonwebtoken";

// Middlewarer to check login or not
const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new AppError(400, "Unauthenticaed, please log in again"));
  }

  const userDetails = await jwt.verify(token, process.env.JWT_SECRET);
  req.user = userDetails;

  next();
};

// Middleware to check user or admin
const authorizedRoles =
  (...roles) =>
  async (req, res, next) => {
    const currentUserRole = req.user.role;

    if (!roles.includes(currentUserRole)) {
      return next(
        new AppError(403, "You do not have permission to acess this route.")
      );
    }

    next();
  };

export { isLoggedIn, authorizedRoles };

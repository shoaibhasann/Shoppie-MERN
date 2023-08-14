import catchAsnycError from "../middlewares/catchAsyncError.middleware.js";
import userModel from "../models/user.model.js";
import AppError from "../utils/error.util.js";
import sendToken from "../utils/jwt.util.js";


// controller function to register user
const registerUser = catchAsnycError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return next(new AppError(400, "All fields are required"));
  }

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    return next(new AppError(400, "Email already exists"));
  }

  const user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: "sample id",
      secure_url: "sample url",
    },
  });

  user.password = undefined;

  // send jwt token in cookie
  await sendToken(user, res);


  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
});

// controller function to login user
const loginUser = catchAsnycError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(400, "Please enter email & password"));
  }

  // Find the user in the database
  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError(400, "Invalid email or password"));
  }

  // Compare passwords using the comparePassword method
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new AppError(400, "Password is incorrect"));
  }

  user.password = undefined;

  // sending jwt token in cookie and with response
  sendToken(user,200,'Login successfull',res);
});

export { registerUser, loginUser };

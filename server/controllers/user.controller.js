import userModel from "../models/user.model.js";
import sendEmail from "../utils/email.util.js";
import AppError from "../utils/error.util.js";
import sendToken from "../utils/jwt.util.js";
import crypto from 'crypto';

// controller function to register user
const registerUser = async (req, res, next) => {
  try {
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

    // sending jwt token in cookie and with response
    sendToken(user, 201, "User registered successfully", res);
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to login user
const loginUser = async (req, res, next) => {
  try {
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
    sendToken(user, 200, "Login successfully", res);
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to logout user
const logoutUser = async (req, res, next) => {
  try {
    // clear jwt token from cookie
    res.cookie("token", null, {
      secure: true,
      maxAge: 0,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to forgot password
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return next(new AppError(400, "Please enter your email"));
    }

    // check email exists in db
    const emailExists = await userModel.findOne({ email });

    if (!emailExists) {
      return next(new AppError(404, "User not found"));
    }

    // generate forgot password token for the user
    const resetToken = await emailExists.GenerateForgotPasswordToken();

    await emailExists.save();

    // create forgot password url for the email
    const forgotPasswordURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/password/reset/${resetToken}`;

    const subject = "Shoppie Password Recovery";

    // Create the content of the reset password email as an HTML link
    const message = `
      <h1>Dear ${emailExists.name},</h1>
      <p>You have requested to reset your password. Please click on the following link to reset your password:</p>
      <a href="${forgotPasswordURL}">${forgotPasswordURL}</a>
      <p>If you did not request this password reset, you can ignore this email.</p>
      <p>Best regards,</p>
      <p>Shoppie</p>
    `;

    try {
      // send reset password email to the user
      await sendEmail(email, subject, message);

      res.status(200).json({
        success: true,
        message: `Email sent to ${emailExists.email} successfully`,
      });
    } catch (error) {
      emailExists.resetPasswordToken = undefined;
      emailExists.resetPasswordExpire = undefined;
      await emailExists.save();

      return next(new AppError(500, "Error in sending reset password email"));
    }
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to reset password
const resetPassword = async (req, res, next) => {
  try {
    // extract token from request parameters
    const { resetToken } = req.params;

    const { password, confirmPassword } = req.body;

    if (!password) {
      return next(new AppError(400, "Password is required"));
    }

    if (password !== confirmPassword) {
      return next(new AppError(400, "Password does not match"));
    }

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await userModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new AppError(400, "Token is invalid or expired, please try again")
      );
    }

    // update old password with new
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });

  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

export { registerUser, loginUser, logoutUser, forgotPassword, resetPassword };

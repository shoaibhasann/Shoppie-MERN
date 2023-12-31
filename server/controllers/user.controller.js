import userModel from "../models/user.model.js";
import sendEmail from "../utils/email.util.js";
import AppError from "../utils/error.util.js";
import crypto from "crypto";
import cloudinary from "cloudinary";
import fs from "fs/promises";
import generateDefaultAvatar from "../utils/avatar.js";
import path from 'path';
import dotenv from 'dotenv';
import emailTemplate from "../utils/template.util.js";

// load enviroment variables
dotenv.config();

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000, // Valid for 7 days
  httpOnly: true,
  sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
  secure: process.env.NODE_ENV === 'Development' ? false : true
};


// function to register new user
const registerUser = async (req, res, next) => {
  try {
    
    const { name, email, password } = req.body;

    // Check if all fields are provided
    if (!name || !email || !password) {
      return next(new AppError("All fields are required", 400));
    }

    if (password.length < 8) {
      return next(new AppError("Password should be greater than 8 characters", 400));
    }

    // Check if the user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return next(new AppError("Email already exists", 400));
    }

    // Create a new user
    const user = await userModel.create({
      name,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url: "http://dummyurl.com",
      },
    });

    // Generate default avatar
    const defaultAvatarBuffer = await generateDefaultAvatar(name);

    // Create a temporary file from the buffer
    const tempFilePath = path.join(process.cwd(), "temp_avatar.png"); // Change the filename and extension as needed

    await fs.writeFile(tempFilePath, defaultAvatarBuffer);

    // Upload the default avatar to Cloudinary
    try {
      const uploadResult = await cloudinary.v2.uploader.upload(tempFilePath, {
        folder: "Shoppie_Users",
        width: 250,
        height: 250,
        gravity: "faces",
        crop: "fill",
      });

      if (!uploadResult) {
        throw new Error("Avatar upload failed");
      }

      // Update user with Cloudinary data and save
      user.avatar.public_id = uploadResult.public_id;
      user.avatar.secure_url = uploadResult.secure_url;
      await user.save();

    } catch (error) {
      return next(new AppError("Error while cloudinary upload", 500));
    } finally {
      // Delete the temporary file
      await fs.unlink(tempFilePath);
    }

    // generate jwt token
    const token = await user.generateToken();

    // Remove sensitive data
    user.password = undefined;

    // Set the JWT token in the cookie
    res.cookie("token", token, cookieOptions);

    // Respond with success message and user details
    res.status(201).json({
      success: true,
      message: "Registered successfuly!",
      user
    });

  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to login user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError(400, "Please enter both email and password"));
    }

    // Find the user in the database
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(
        new AppError(
          401,
          "Email address you entered is not associated with an account"
        )
      );
    }

    // Compare passwords securely using bcrypt
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new AppError(401, "The password you entered is incorrect"));
    }

    // Generate a JWT token
    const token = await user.generateToken();

    user.password = undefined;

    // Set the JWT token in the cookie or response headers
    res.cookie("token", token, cookieOptions);

    // Respond with success message and user details
    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      user,
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};


// controller function to logout user
const logoutUser = (req, res, next) => {
  try {
    // Clear the JWT token in the cookie
    res.cookie("token", null, {
      sameSite: process.env.NODE_ENV === 'Development' ? 'lax' : 'none',
      secure: process.env.NODE_ENV === 'Development' ? false : true ,
      maxAge: 0,
      httpOnly: true,
    });

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Logged out successfuly!",
    });
  } catch (error) {
    return next(new AppError(500, error.message));
  }
};

// controller function to get user profile details
const getProfile = async (req, res, next) => {
  try {
    const { id: userId } = req.user.id;

    const user = await userModel.findById(userId);

    res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to update profile
const updateProfile = async (req, res, next) => {
  try {

    const { name, email, avatar } = req.body;

    const { id } = req.user;

    const user = await userModel.findById(id);

    // Update user full name
    if (name) {
      user.name = name;
    }

    // Update user email
    if(email){
      user.email = email;
    }

    // Delete and update user profile image
    if (avatar) {

      // Remove the existing profile image from Cloudinary
      await cloudinary.v2.uploader.destroy(user.avatar.public_id);

      try {
        // Upload the new profile image to Cloudinary
        const result = await cloudinary.v2.uploader.upload(avatar, {
          folder: "Shoppie_Users",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill",
        });

        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;
        }

      } catch (error) {
        return next(
          new AppError(400, "File not uploaded, please try again" || error)
        );
      }
    }

    // Save the updated user profile to the database
    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      user
    });
  } catch (error) {
    return next(new AppError(500, error.message));
  }
};

// controller function to initiate forgot password process
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
    const forgotPasswordURL = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const { subject, message } = emailTemplate(forgotPasswordURL, emailExists.name);

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

// controller function to change or update password
const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword, confirmPassword } = req.body;

    if (!oldPassword || !newPassword || !confirmPassword) {
      return next(new AppError(400, "All fields are required"));
    }

    if (newPassword !== confirmPassword) {
      return next(new AppError(400, `Password doesn't match`));
    }

    const { id } = req.user;

    const user = await userModel.findById(id).select("+password");

    if (!user) {
      return next(new AppError(404, `User doesn't exist`));
    }

    const isPasswordMatch = await user.comparePassword(oldPassword);

    if (!isPasswordMatch) {
      return next(new AppError(400, "Old password is incorrect"));
    }

    user.password = newPassword;

    await user.save();

    user.password = undefined;

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to get all users details -- (Admin)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userModel.find();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to get user detail -- (Admin)
const getUserDetails = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);

    if (!user) {
      return next(new AppError(400, `User doesn't exists`));
    }

    res.status(200).json({
      success: true,
      message: "User details fetched succesfully",
      user,
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};

// controller function to update user role -- (Admin)
const updateRole = async (req, res, next) => {
  try {

    const { name, email, role } = req.body;
    const { id } = req.params;

    const updatedUserData = {
      name,
      email,
      role,
    };

    // Validate the provided role against allowed values (Admin, User)
    if (!["Admin", "User"].includes(role)) {
      return next(new AppError(400, "Invalid role value"));
    }

    const user = await userModel.findByIdAndUpdate(id, updatedUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!user) {
      return next(new AppError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
};


// controller function to delete user -- (Admin)
const deleteUser = async(req,res,next) => {
  try {
    const { id } = req.params;
    
    const user = await userModel.findByIdAndDelete(id);

    
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (error) {
    return next(new AppError(500, "Internal Server Error" || error.message));
  }
}
export {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  getAllUsers,
  getUserDetails,
  updateRole,
  deleteUser
};

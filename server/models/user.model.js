import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      minLength: [4, "Name should have more than 5 characters"],
      maxLength: [30, "Name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      validate: [validator.isEmail, "Please Enter a Valid Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware for password hashing
userSchema.pre("save", async function (next) {
  // Ensure we only hash the password if it's being modified
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);

    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// jwt token authentication
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        id: this._id,
        email: this.email,
        name: this.name,
        role: this.role,
        avatar: this.avatar,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );
  } catch (error) {
    throw error;
  }
};

// method to compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  try {
    return bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw error;
  }
};

// method to generate forgot password token
userSchema.methods.GenerateForgotPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing buffer reset token
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 24 * 1000; // 15 minutes from now

  return resetToken;
};
const userModel = model("User", userSchema);

export default userModel;

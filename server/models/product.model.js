import { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
      trim: true,
      unique: true
    },
    description: {
      type: String,
      required: [true, "Please enter product description"],
    },
    price: {
      type: Number,
      required: [true, "Please enter product price"],
      maxLength: [10, "Price cannot exceed 10 characters"],
    },
    rating: {
      type: Number,
      default: 0,
      max: 5,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter product category"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      maxLength: [5, "Stock cannot exceed 5 characters"],
      default: 1
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: Schema.ObjectId,
      ref: 'User',

    },
  },
  {
    timestamps: true,
  }
);

const productModel = model("Product", productSchema);

export default productModel;

import { Schema, model } from "mongoose";

// Define the inquiry schema
const inquirySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create a model using the schema
const inquiryModel = model("Inquiry", inquirySchema);

export default inquiryModel;
import mongoose from "mongoose";
import User from "./userModel";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: mongoose.Schema.Types.ObjectId,
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
      },
    ],
  },
  {timestamps: true}
);

const Product =
  mongoose.models.products || mongoose.model("products", productSchema);
export default Product;

import mongoose from "mongoose";
import { IDraft } from "../config/interface";

const draftSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    title: {
      type: String,
      trim: true,
      default:
        "A blog title Grab attention with vivid and descriptive language.",
      maxLength: 1000,
      minLenght: 20,
    },
    content: {
      type: String,
      maxLength: 10000,
    },
    description: {
      type: String,
      trim: true,
      default:
        "A blog descript is an overall and brief description of the whole topic on which you are writing a blog.",
      maxLength: 1000,
    },
    thumbnail: {
      type: String,
      default:
        "https://res.cloudinary.com/aababcab/image/upload/v1655885679/blog/vaxwltxu54q0exumvaer.png",
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IDraft>("draft", draftSchema);

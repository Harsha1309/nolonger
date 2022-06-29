import mongoose from "mongoose";
import { IDraft } from "../config/interface";

const draftSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    title: {
      type: String,
      require: true,
      trim: true,
      minLength: 40,
      maxLength: 100,
      default:
        "A blog title Grab attention with vivid and descriptive language.",
    },
    content: {
      type: String,
      minLength: 2000,
    },
    description: {
      type: String,
      trim: true,
      default:
        "A blog descript is an overall and brief description of the whole topic on which you are writing a blog.",
      minLength: 100,
      maxLength: 250,
    },
    thumbnail: {
      type: String,
    },
    category: { type: mongoose.Types.ObjectId, ref: "category" },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<IDraft>("draft", draftSchema);

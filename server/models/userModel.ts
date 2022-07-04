import mongoose from "mongoose";
import { IUser } from "../config/interface";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add your name"],
      trim: true,
      maxLength: [30, "Your name is up to 20 chars long."],
    },
    account: {
      type: String,
      required: [true, "Please add your email or phone"],
      trim: true,
      unique: true,
    },
    about: {
      type: String,
      trim: true,
      default: "I am a passionate blogger at PediaGeek.",
    },
    paytm: {
      type: String,
      trim: true,
    },
    blogcount: {
      type: Number,
      default: 0,
    },
    referer:{
      type: String,
      default: 'PediaGeek',
    },
    password: {
      type: String,
      required: [true, "Please add your password"],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    role: {
      type: String,
      default: "user", // admin
    },
    type: {
      type: String,
      default: "register", // login
    },
    follower: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        index: true, unique: true ,
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Users",
        index: true, unique: true ,
        default: [],
      },
    ],
    rf_token: { type: String, select: false },
  },
  {
    timestamps: true,
  }
);


export default mongoose.model<IUser>("user", userSchema);

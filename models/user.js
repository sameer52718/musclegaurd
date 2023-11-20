import mongoose from "mongoose";
import { domain } from "../constants/index.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
      get: function (profile) {
        return `${domain}/${profile}`;
      },
      default: null,
    },
    status: {
      type: Boolean,
      default: true,
    },
    otp: {
      type: Number,
    },
    phone: {
      type: String,
    },
    gendor: {
      type: String,
      enum: ["male", "female","unspecified"],
    },
    address:{
        type:String,
    },
    state:{
        type:mongoose.Types.ObjectId,
        ref:"State"
    },
    city:{
        type:mongoose.Types.ObjectId,
        ref:"City"
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

export const User = mongoose.model("User", userSchema);

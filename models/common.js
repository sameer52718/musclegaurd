import mongoose from "mongoose";

const stateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const State = mongoose.model("State", stateSchema);

const citySchema = new mongoose.Schema(
  {
    state: {
      type: mongoose.Types.ObjectId,
      ref: "State",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const City = mongoose.model("City", citySchema);

import mongoose from "mongoose";
import { User } from "./user.model";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      unique: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "urgent"],
    },
    deadline: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Tasks", TaskSchema);

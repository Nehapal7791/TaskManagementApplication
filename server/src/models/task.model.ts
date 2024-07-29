import mongoose from "mongoose";
import { User } from "./user.model";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
    },
    description: {
      type: String,
      unique: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "urgent"],
    },
    deadline: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["Under Review", "in progress", "completed", "to-do"],
    },
    isFavorite: {
      type: Boolean,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required to specify task "],
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Tasks", TaskSchema);

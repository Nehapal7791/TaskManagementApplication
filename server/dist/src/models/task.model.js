"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required to specify task "],
    },
}, { timestamps: true });
exports.Task = mongoose_1.default.model("Tasks", TaskSchema);

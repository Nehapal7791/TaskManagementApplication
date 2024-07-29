"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false,
        validate: {
            validator: function (v) {
                return v.length >= 6;
            },
            message: () => "Password must be at least 6 characters long",
        },
    },
}, { timestamps: true });
UserSchema.index({ email: 1 });
exports.User = mongoose_1.default.model("Users", UserSchema);

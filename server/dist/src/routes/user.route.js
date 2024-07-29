"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const UserRouter = express_1.default.Router();
UserRouter.post("/login", user_controller_1.loginUser);
UserRouter.post("/register", user_controller_1.registerUser);
UserRouter.get("/all-users", user_controller_1.getAllUsers);
UserRouter.get("/user-by-id/:id", user_controller_1.getUserById);
UserRouter.post("/logout", auth_middleware_1.verifyToken, user_controller_1.logoutUser);
exports.default = UserRouter;

import express from "express";
import {
  loginUser,
  registerUser,
  getAllUsers,
  getUserById,
  logoutUser,
} from "../controllers/user.controller";
import { verifyToken } from "../middleware/auth.middleware";

const UserRouter = express.Router();

UserRouter.post("/login", loginUser);
UserRouter.post("/register", registerUser);
UserRouter.get("/all-users", getAllUsers);
UserRouter.get("/user-by-id/:id", getUserById);
UserRouter.post("/logout", verifyToken, logoutUser);

export default UserRouter;

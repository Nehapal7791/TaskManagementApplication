import express from "express";
import {
  createTaskForUser,
  getTasksForUser,
  getTaskForUserById,
  updateTaskForUser,
  deleteTaskForUser,
} from "../controllers/task.controller";
import { verifyToken } from "../middleware/auth.middleware";

const taskRouter = express.Router();

taskRouter.post("/:userId/create-task", verifyToken, createTaskForUser);
taskRouter.get("/:userId/all-tasks", verifyToken, getTasksForUser);
taskRouter.get(
  "/:userId/get-tasks-by/:taskId",
  verifyToken,
  getTaskForUserById
);
taskRouter.put("/:userId/update-tasks/:taskId", verifyToken, updateTaskForUser);
taskRouter.delete(
  "/:userId/delete-tasks/:taskId",
  verifyToken,
  deleteTaskForUser
);

export default taskRouter;

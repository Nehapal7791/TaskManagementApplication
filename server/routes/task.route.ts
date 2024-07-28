import express from "express";
import {
  createTaskForUser,
  getTasksForUser,
  getTaskForUserById,
  updateTaskForUser,
  deleteTaskForUser,
} from "../controllers/task.controller";

const taskRouter = express.Router();

taskRouter.post("/:userId/create-task", createTaskForUser);
taskRouter.get("/:userId/all-tasks", getTasksForUser);
taskRouter.get("/:userId/get-tasks-by/:taskId", getTaskForUserById);
taskRouter.put("/:userId/update-tasks/:taskId", updateTaskForUser);
taskRouter.delete("/:userId/delete-tasks/:taskId", deleteTaskForUser);

export default taskRouter;

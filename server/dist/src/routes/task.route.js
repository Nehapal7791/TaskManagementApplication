"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = require("../controllers/task.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const taskRouter = express_1.default.Router();
taskRouter.post("/:userId/create-task", auth_middleware_1.verifyToken, task_controller_1.createTaskForUser);
taskRouter.get("/:userId/all-tasks", auth_middleware_1.verifyToken, task_controller_1.getTasksForUser);
taskRouter.get("/:userId/get-tasks-by/:taskId", auth_middleware_1.verifyToken, task_controller_1.getTaskForUserById);
taskRouter.put("/:userId/update-tasks/:taskId", auth_middleware_1.verifyToken, task_controller_1.updateTaskForUser);
taskRouter.delete("/:userId/delete-tasks/:taskId", auth_middleware_1.verifyToken, task_controller_1.deleteTaskForUser);
exports.default = taskRouter;

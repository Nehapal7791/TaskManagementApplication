"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskForUser = exports.updateTaskForUser = exports.getTaskForUserById = exports.getTasksForUser = exports.createTaskForUser = void 0;
const task_model_1 = require("../models/task.model");
const user_model_1 = require("../models/user.model");
const createTaskForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority, deadline, status, isFavorite } = req.body;
    const userId = req.params.userId;
    try {
        const user = yield user_model_1.User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (!title || !priority || !deadline || !status) {
            return res.status(400).json({ message: "Required fields are missing" });
        }
        const task = new task_model_1.Task({
            title,
            description,
            priority,
            deadline,
            status,
            isFavorite,
            user: userId,
        });
        const savedTask = yield task.save();
        res.status(201).json(savedTask);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
});
exports.createTaskForUser = createTaskForUser;
// Get all tasks for a user
const getTasksForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const tasks = yield task_model_1.Task.find({ user: userId });
        if (!tasks) {
            return res.status(404).json({ message: "No tasks found for this user" });
        }
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching tasks", error });
    }
});
exports.getTasksForUser = getTasksForUser;
// Get a specific task for a user
const getTaskForUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    try {
        const task = yield task_model_1.Task.findOne({ _id: taskId, user: userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching task", error });
    }
});
exports.getTaskForUserById = getTaskForUserById;
// Update a task for a user
const updateTaskForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, priority, deadline, status, isFavorite } = req.body;
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    try {
        if (!title || !priority || !deadline || !status) {
            return res.status(400).json({ message: "Required fields are missing" });
        }
        const task = yield task_model_1.Task.findOneAndUpdate({ _id: taskId, user: userId }, { title, description, priority, deadline, status, isFavorite }, { new: true });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating task", error });
    }
});
exports.updateTaskForUser = updateTaskForUser;
// Delete a task for a user
const deleteTaskForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const taskId = req.params.taskId;
    try {
        const task = yield task_model_1.Task.findOneAndDelete({ _id: taskId, user: userId });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting task", error });
    }
});
exports.deleteTaskForUser = deleteTaskForUser;

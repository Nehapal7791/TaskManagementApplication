import { Request, Response } from "express";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";

export const createTaskForUser = async (req: Request, res: Response) => {
  const { title, description, priority, deadline, status, isFavorite } =
    req.body;
  const userId = req.params.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!title || !priority || !deadline || !status) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const task = new Task({
      title,
      description,
      priority,
      deadline,
      status,
      isFavorite,
      user: userId,
    });

    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

// Get all tasks for a user
export const getTasksForUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const tasks = await Task.find({ user: userId });
    if (!tasks) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
};

// Get a specific task for a user
export const getTaskForUserById = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const taskId = req.params.taskId;

  try {
    const task = await Task.findOne({ _id: taskId, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
};

// Update a task for a user
export const updateTaskForUser = async (req: Request, res: Response) => {
  const { title, description, priority, deadline, status, isFavorite } =
    req.body;
  const userId = req.params.userId;
  const taskId = req.params.taskId;

  try {
    if (!title || !priority || !deadline || !status) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user: userId },
      { title, description, priority, deadline, status, isFavorite },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
};

// Delete a task for a user
export const deleteTaskForUser = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const taskId = req.params.taskId;

  try {
    const task = await Task.findOneAndDelete({ _id: taskId, user: userId });
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
};

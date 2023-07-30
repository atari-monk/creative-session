import { Request, Response } from 'express';
import moment from 'moment-timezone';
import { Task } from '../models/Task';
import User from '../models/User';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { description, userId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const task = new Task({
      description,
      user: userId,
    });
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const allTasks = await Task.find();
    res.json(allTasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId parameter is missing' });
    }

    const tasks = await Task.find({ user: userId });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description, finishedAt, summary, userId } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (description) {
      task.description = description;
    }
    if (userId) {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      task.user = userId;
    }
    task.finishedAt = finishedAt || new Date();
    task.finishLocalTimestamp = moment(task.finishedAt)
      .tz('Europe/Warsaw')
      .format('DD-MM-YYYY HH:mm');
    task.summary = summary;
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

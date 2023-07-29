import { Request, Response } from 'express';
import moment from 'moment-timezone';
import { Task } from '../models/Task';

export const createTask = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const task = new Task({ description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description, finishedAt, summary } = req.body;
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    if (description) {
      task.description = description;
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
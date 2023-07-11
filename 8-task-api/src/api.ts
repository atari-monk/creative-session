import express, { Request, Response } from 'express';
import mongoose, { Schema, Document, ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import moment from 'moment-timezone';

dotenv.config({ path: path.resolve(__dirname, './../.env') });

// Define the task schema
interface ITask extends Document {
  description: string;
  createdAt: Date;
  localTimestamp: string;
  finishedAt?: Date;
  finishLocalTimestamp?: string;
  summary?: string;
}

const taskSchema = new Schema<ITask>({
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  localTimestamp: {
    type: String,
    default: function () {
      return moment(this.createdAt)
        .tz('Europe/Warsaw')
        .format('DD-MM-YYYY HH:mm');
    },
  },
  finishedAt: { type: Date },
  finishLocalTimestamp: { type: String },
  summary: { type: String },
});

const Task = mongoose.model<ITask>('Task', taskSchema);

const password = process.env.ATARI_MONK_TASK_API_PASSWORD;
if (!password) throw new Error('Password not set!');

mongoose.connect(
  `mongodb+srv://atart-monk:${password}@cluster0.bybecih.mongodb.net/?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
  } as ConnectOptions
);

// Create Express server
const app = express();

// Middleware
app.use(express.json());

// Define routes

// Create a new task
app.post('/tasks', async (req: Request, res: Response) => {
  try {
    const { description } = req.body;

    // Create a new task
    const task = new Task({ description });

    // Save the task to the database
    await task.save();

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Get all tasks
app.get('/tasks', async (req: Request, res: Response) => {
  try {
    // Retrieve all tasks from the database
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.put('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description, finishedAt, summary } = req.body;

    // Find the task by ID
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task fields
    if (description) {
      task.description = description;
    }
    task.finishedAt = finishedAt || new Date();
    task.finishLocalTimestamp = moment(task.finishedAt)
      .tz('Europe/Warsaw')
      .format('DD-MM-YYYY HH:mm');
    task.summary = summary;

    // Save the updated task to the database
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

app.delete('/tasks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the task by ID and delete it
    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

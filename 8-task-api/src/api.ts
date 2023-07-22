import express, { Request, Response } from 'express';
import mongoose, { Schema, Document, ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import moment from 'moment-timezone';
import cors from 'cors';

dotenv.config({ path: path.resolve(__dirname, './../.env') });

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

const dbConnectionString = process.env.ATARI_MONK_TASK_API_DB;
if (!dbConnectionString) throw new Error('Database connection string not set!');

mongoose.connect(dbConnectionString, {
  useUnifiedTopology: true,
} as ConnectOptions);

const app = express();

app.use(express.json());
app.use(cors());

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

app.get('/tasks', async (req: Request, res: Response) => {
  try {
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
});

app.delete('/tasks/:id', async (req: Request, res: Response) => {
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
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

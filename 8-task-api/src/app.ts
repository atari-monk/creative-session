import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import './db';
import { taskController } from './controllers/taskController';

dotenv.config({ path: path.resolve(__dirname, './../.env') });

const app = express();

app.use(express.json());
app.use(cors());

app.post('/tasks', taskController.createTask);
app.get('/tasks', taskController.getTasks);
app.put('/tasks/:id', taskController.updateTask);
app.delete('/tasks/:id', taskController.deleteTask);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
//
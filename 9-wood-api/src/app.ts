import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import './db';
import stockRouter from './routes/stock-router';
import userRouter from './routes/user-router';

dotenv.config({ path: path.resolve(__dirname, './../.env') });

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/stocks', stockRouter);
app.use('/api/v1/users', userRouter);

export default app;

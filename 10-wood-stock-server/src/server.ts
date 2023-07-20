// server.ts

import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 4000;

interface IStock {
  _id: string;
  width: number;
  depth: number;
  height: number;
  description?: string;
}

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

let stocks: IStock[] = [];

app.get('/stocks', (req: Request, res: Response) => {
  res.json(stocks);
});

app.post('/stocks', (req: Request, res: Response) => {
  const newStock: IStock = { ...req.body, _id: uuidv4() };
  stocks.push(newStock);
  res.status(201).json(newStock);
});

app.delete('/stocks/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  stocks = stocks.filter((stock) => stock._id !== id);
  res.json({ message: 'Stock deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import express, { Request, Response } from 'express';
import mongoose, { Schema, Document, ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

dotenv.config({ path: path.resolve(__dirname, './../.env') });

interface IStock extends Document {
  _id: string;
  stockId: string;
  width: number;
  depth: number;
  height: number;
  description?: string;
  count?: number;
}

const stockSchema = new Schema<IStock>({
  stockId: { type: String, required: true },
  width: { type: Number, required: true },
  depth: { type: Number, required: true },
  height: { type: Number, required: true },
  description: { type: String },
  count: { type: Number, default: 1 },
});

const Stock = mongoose.model<IStock>('Stock', stockSchema);

const dbConnectionString = process.env.ATARI_MONK_TASK_API_DB;
if (!dbConnectionString) throw new Error('Database connection string not set!');

mongoose.connect(dbConnectionString, {
  useUnifiedTopology: true,
} as ConnectOptions);

const app = express();

app.use(express.json());
app.use(cors());

app.post('/stocks', async (req: Request, res: Response) => {
  try {
    const { stockId, width, depth, height, description, count } = req.body;

    const stock = new Stock({
      stockId,
      width,
      depth,
      height,
      description,
      count,
    });

    await stock.save();

    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create stock' });
  }
});

app.get('/stocks', async (req: Request, res: Response) => {
  try {
    const stocks = await Stock.find({}, '-__v');

    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stocks' });
  }
});

app.put('/stocks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { stockId, width, depth, height, description, count } = req.body;

    const stock = await Stock.findById(id);

    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    if (stockId) {
      stock.stockId = stockId;
    }
    if (width) {
      stock.width = width;
    }
    if (depth) {
      stock.depth = depth;
    }
    if (height) {
      stock.height = height;
    }
    if (description) {
      stock.description = description;
    }
    if (count !== undefined) {
      stock.count = count;
    }

    await stock.save();

    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stock' });
  }
});

app.delete('/stocks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const stock = await Stock.findByIdAndDelete(id);

    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    res.json({ message: 'Stock deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete stock' });
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

import express, { Request, Response } from 'express';
import mongoose, { Schema, Document, ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

dotenv.config({ path: path.resolve(__dirname, './../.env') });

// Define the stock schema
interface IStock extends Document {
  width: number;
  depth: number;
  height: number;
  description?: string;
}

const stockSchema = new Schema<IStock>({
  width: { type: Number, required: true },
  depth: { type: Number, required: true },
  height: { type: Number, required: true },
  description: { type: String },
});

const Stock = mongoose.model<IStock>('Stock', stockSchema);

const dbConnectionString = process.env.ATARI_MONK_TASK_API_DB;
if (!dbConnectionString) throw new Error('Database connection string not set!');

mongoose.connect(dbConnectionString, {
  useUnifiedTopology: true,
} as ConnectOptions);

// Create Express server
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// Define routes

// Create a new stock
app.post('/stocks', async (req: Request, res: Response) => {
  try {
    const { width, depth, height, description } = req.body;

    // Create a new stock
    const stock = new Stock({ width, depth, height, description });

    // Save the stock to the database
    await stock.save();

    res.status(201).json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create stock' });
  }
});

// Get all stocks
app.get('/stocks', async (req: Request, res: Response) => {
  try {
    // Retrieve all stocks from the database
    const stocks = await Stock.find();

    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stocks' });
  }
});

app.put('/stocks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { width, depth, height, description } = req.body;

    // Find the stock by ID
    const stock = await Stock.findById(id);

    if (!stock) {
      return res.status(404).json({ error: 'Stock not found' });
    }

    // Update the stock fields
    if (width) {
      stock.width = width;
    }
    if (depth) {
      stock.depth = depth;
    }
    if (height) {
      stock.height = height;
    }
    stock.description = description;

    // Save the updated stock to the database
    await stock.save();

    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stock' });
  }
});

app.delete('/stocks/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Find the stock by ID and delete it
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

// Start the server
app.listen(port, () => {
  console.log('Server listening on port 3000');
});

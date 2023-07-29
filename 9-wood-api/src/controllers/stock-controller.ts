import { Request, Response } from 'express';
import { Stock } from '../models/Stock';

export const createStock = async (req: Request, res: Response) => {
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
};

export const getStocks = async (req: Request, res: Response) => {
  try {
    const stocks = await Stock.find({}, '-__v');
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stocks' });
  }
};

export const updateStock = async (req: Request, res: Response) => {
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
    if (count) {
      stock.count = count;
    }
    await stock.save();
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update stock' });
  }
};

export const deleteStock = async (req: Request, res: Response) => {
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
};

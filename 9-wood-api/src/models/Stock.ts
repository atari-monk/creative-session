import mongoose, { Schema } from 'mongoose';
import { IStock } from './IStock';

const stockSchema = new Schema<IStock>({
  stockId: { type: String, required: true },
  width: { type: Number, required: true },
  depth: { type: Number, required: true },
  height: { type: Number, required: true },
  description: { type: String },
  count: { type: Number, default: 1 },
});

export const Stock = mongoose.model<IStock>('Stock', stockSchema);

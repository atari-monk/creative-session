import mongoose, { Schema } from 'mongoose';
import IProject from './IProject';

const typeName = 'Project';

const projectSchema = new Schema<IProject>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Project = mongoose.model<IProject>(typeName, projectSchema);

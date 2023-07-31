import { Document } from 'mongoose';

export default interface IProject extends Document {
  name: string;
  description: string;
  createdAt: Date;
}

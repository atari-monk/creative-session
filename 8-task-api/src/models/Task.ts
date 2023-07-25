import moment from 'moment';
import mongoose, { Schema } from 'mongoose';
import { ITask } from './ITask';

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

export const Task = mongoose.model<ITask>('Task', taskSchema);

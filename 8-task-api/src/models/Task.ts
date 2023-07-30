import moment from 'moment';
import mongoose, { Schema } from 'mongoose';
import { ITask } from './ITask';

const typeName = 'Task';

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
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export const Task = mongoose.model<ITask>(typeName, taskSchema);

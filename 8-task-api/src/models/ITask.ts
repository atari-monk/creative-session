export interface ITask extends Document {
  description: string;
  createdAt: Date;
  localTimestamp: string;
  finishedAt?: Date;
  finishLocalTimestamp?: string;
  summary?: string;
}

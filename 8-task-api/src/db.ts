import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { utils } from './utils';

dotenv.config({ path: path.resolve(__dirname, './../.env') });

utils.printMatchingEnvVariableNames('ATARI_MONK_TASK_API_DB');
const dbConnectionString = process.env.CUSTOMCONNSTR_ATARI_MONK_TASK_API_DB;
if (!dbConnectionString) throw new Error('Database connection string not set!');

mongoose.connect(dbConnectionString, {
  useUnifiedTopology: true,
} as ConnectOptions);

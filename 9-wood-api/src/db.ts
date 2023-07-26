import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, './../.env') });

const dbConnectionString = process.env.ATARI_MONK_WOOD_API_DB;
console.log('dbConnectionString:', dbConnectionString);
if (!dbConnectionString) throw new Error('Database connection string not set!');

mongoose.connect(dbConnectionString, {
  useUnifiedTopology: true,
} as ConnectOptions);

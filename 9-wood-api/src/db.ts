import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, './../.env') });

console.log('Process Environment:', process.env);
let dbConnectionString;
try {
  dbConnectionString = process.env.ATARI_MONK_WOOD_API_DB;
} catch (error) {
  console.log(error);
}
console.log('dbConnectionString:', dbConnectionString);
if (!dbConnectionString) throw new Error('Database connection string not set!');

mongoose.connect(dbConnectionString, {
  useUnifiedTopology: true,
} as ConnectOptions);

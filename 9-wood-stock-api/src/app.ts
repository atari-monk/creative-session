import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import './db';
import { stockController } from './controllers/stockController';

dotenv.config({ path: path.resolve(__dirname, './../.env') });

const app = express();

app.use(express.json());
app.use(cors());

app.post('/stocks', stockController.createStock);
app.get('/stocks', stockController.getStocks);
app.put('/stocks/:id', stockController.updateStock);
app.delete('/stocks/:id', stockController.deleteStock);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

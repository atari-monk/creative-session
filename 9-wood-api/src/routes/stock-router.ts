import express from 'express';
import * as stockController from '../controllers/stock-controller';

const router = express.Router();

router
  .route('/')
  .get(stockController.getStocks)
  .post(stockController.createStock);

router
  .route('/:id')
  .patch(stockController.updateStock)
  .delete(stockController.deleteStock);

export default router;

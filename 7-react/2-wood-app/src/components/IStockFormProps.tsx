import React from 'react';
import { IStock } from './IStock';

export interface IStockFormProps {
  formData: IStock;
  setFormData: React.Dispatch<React.SetStateAction<IStock>>;
}

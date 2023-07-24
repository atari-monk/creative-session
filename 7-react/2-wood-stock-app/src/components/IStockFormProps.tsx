import { ChangeEvent, FormEvent } from 'react';

export interface IStockFormProps {
  formData: {
    stockId: string;
    width: string;
    depth: string;
    height: string;
    description?: string;
    count: string;
  };
  validationErrors: {
    [key: string]: string;
  };
  message: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
}

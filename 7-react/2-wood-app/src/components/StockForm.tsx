import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { IStock } from './IStock';
import { IFormValidationErrors } from './IFormValidationErrors';
import { IStockFormProps } from './IStockFormProps';

const API_BASE_URL = 'https://atari-monk-wood-api.azurewebsites.net';

const StockForm: React.FC<IStockFormProps> = ({ formData, setFormData }) => {
  const [message, setMessage] = useState<string>('');
  const [validationErrors, setValidationErrors] =
    useState<IFormValidationErrors>({
      stockId: '',
      width: '',
      depth: '',
      height: '',
      description: '',
      count: '',
    });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors: IFormValidationErrors = {};

    if (isNaN(parseFloat(formData.width))) {
      errors.width = 'Width must be a valid number.';
    }

    if (isNaN(parseFloat(formData.depth))) {
      errors.depth = 'Depth must be a valid number.';
    }

    if (isNaN(parseFloat(formData.height))) {
      errors.height = 'Height must be a valid number.';
    }

    if (formData.stockId.trim() === '') {
      errors.stockId = 'Stock ID is required.';
    }

    if (formData.description && formData.description.length > 300) {
      errors.description = 'Description must not exceed 300 characters.';
    }

    const countNumber = Number(formData.count);
    if (!Number.isInteger(countNumber) || countNumber < 1) {
      errors.count = 'Count must be a valid positive integer (one or greater).';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (formData._id) {
        await axios.put<IStock>(
          `${API_BASE_URL}/stocks/${formData._id}`,
          formData
        );
        setMessage('Stock updated successfully.');
      } else {
        await axios.post<IStock>(`${API_BASE_URL}/stocks`, formData);
        setMessage('Stock created successfully.');
        setFormData({
          _id: '',
          stockId: '',
          width: '',
          depth: '',
          height: '',
          description: '',
          count: '1',
        });
      }
    } catch (error) {
      console.error('Failed to save stock:', error);
      setMessage('Failed to save stock. Please try again.');
    }
  };

  return (
    <div>
      <h1>Wood Stock Form</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Stock ID:
          <input
            type="text"
            name="stockId"
            value={formData.stockId}
            onChange={handleInputChange}
          />
        </label>
        {validationErrors.stockId && (
          <p className="error">{validationErrors.stockId}</p>
        )}
        <br />
        <label>
          Width:
          <input
            type="text"
            name="width"
            value={formData.width}
            onChange={handleInputChange}
          />
        </label>
        {validationErrors.width && (
          <p className="error">{validationErrors.width}</p>
        )}
        <br />
        <label>
          Depth:
          <input
            type="text"
            name="depth"
            value={formData.depth}
            onChange={handleInputChange}
          />
        </label>
        {validationErrors.depth && (
          <p className="error">{validationErrors.depth}</p>
        )}
        <br />
        <label>
          Height:
          <input
            type="text"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
          />
        </label>
        {validationErrors.height && (
          <p className="error">{validationErrors.height}</p>
        )}
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        {validationErrors.description && (
          <p className="error">{validationErrors.description}</p>
        )}
        <br />
        <label>
          Count:
          <input
            type="text"
            name="count"
            value={formData.count}
            onChange={handleInputChange}
          />
        </label>
        {validationErrors.count && (
          <p className="error">{validationErrors.count}</p>
        )}
        <br />
        <button type="submit">Save Stock</button>
      </form>
    </div>
  );
};

export default StockForm;

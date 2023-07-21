import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';

import './styles/App.css';

interface IStock {
  _id: string;
  stockId: string;
  width: string;
  depth: string;
  height: string;
  description?: string;
  count: string;
}

const API_BASE_URL = 'https://atari-monk-wood-stock-api.azurewebsites.net';

const App: React.FC = () => {
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [formData, setFormData] = useState<IStock>({
    _id: '',
    stockId: '',
    width: '',
    depth: '',
    height: '',
    description: '',
    count: '1',
  });

  const [message, setMessage] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({
    stockId: '',
    width: '',
    depth: '',
    height: '',
    description: '',
    count: '',
  });

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get<IStock[]>(`${API_BASE_URL}/stocks`);
      setStocks(response.data);
    } catch (error) {
      console.error('Failed to fetch stocks:', error);
      setMessage('Failed to fetch stocks. Please try again.');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors: { [key: string]: string } = {};

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
        const updatedStocks = stocks.map((stock) =>
          stock._id === formData._id ? formData : stock
        );
        setStocks(updatedStocks);
        setMessage('Stock updated successfully.');
      } else {
        const response = await axios.post<IStock>(
          `${API_BASE_URL}/stocks`,
          formData
        );
        setStocks([...stocks, response.data]);
        setMessage('Stock created successfully.');
      }

      setFormData({
        _id: '',
        stockId: '',
        width: '',
        depth: '',
        height: '',
        description: '',
        count: '',
      });
    } catch (error) {
      console.error('Failed to save stock:', error);
      setMessage('Failed to save stock. Please try again.');
    }
  };

  const handleEdit = (stock: IStock) => {
    setFormData({ ...stock });
    setMessage('');
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/stocks/${id}`);
      setStocks(stocks.filter((stock) => stock._id !== id));
      setMessage('Stock deleted successfully.');
    } catch (error) {
      console.error('Failed to delete stock:', error);
      setMessage('Failed to delete stock. Please try again.');
    }
  };

  return (
    <div className="app-container">
      <h1>Stocks</h1>
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
      <h2>All Stocks</h2>
      {stocks.map((stock) => (
        <div className="stock-item" key={stock._id}>
          <p>ID: {stock._id}</p>
          <p>Stock ID: {stock.stockId}</p>
          <p>Width: {stock.width}</p>
          <p>Depth: {stock.depth}</p>
          <p>Height: {stock.height}</p>
          <p>Description: {stock.description}</p>
          <p>Count: {stock.count}</p>
          <button className="edit-button" onClick={() => handleEdit(stock)}>
            Edit
          </button>
          <button
            className="delete-button"
            onClick={() => handleDelete(stock._id)}
          >
            Delete
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);

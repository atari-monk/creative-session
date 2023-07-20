import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';

interface IStock {
  _id: string;
  stockId: string;
  width: number;
  depth: number;
  height: number;
  description?: string;
}

const API_BASE_URL = 'https://atari-monk-wood-stock-api.azurewebsites.net';

const App: React.FC = () => {
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [formData, setFormData] = useState<IStock>({
    _id: '',
    stockId: '',
    width: 0,
    depth: 0,
    height: 0,
    description: '',
  });

  const [message, setMessage] = useState<string>(''); // State variable for displaying messages

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get<IStock[]>(`${API_BASE_URL}/stocks`);
      setStocks(response.data);
    } catch (error) {
      console.error('Failed to fetch stocks:', error);
      setMessage('Failed to fetch stocks. Please try again.'); // Set the error message
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (formData._id) {
        // If '_id' exists, it's an update/edit operation
        await axios.put<IStock>(
          `${API_BASE_URL}/stocks/${formData._id}`,
          formData
        );
        const updatedStocks = stocks.map((stock) =>
          stock._id === formData._id ? formData : stock
        );
        setStocks(updatedStocks);
        setMessage('Stock updated successfully.'); // Set the success message
      } else {
        // If '_id' is empty, it's a create operation
        const response = await axios.post<IStock>(
          `${API_BASE_URL}/stocks`,
          formData
        );
        setStocks([...stocks, response.data]);
        setMessage('Stock created successfully.'); // Set the success message
      }

      // Reset the form data after successful form submission
      setFormData({
        _id: '',
        stockId: '',
        width: 0,
        depth: 0,
        height: 0,
        description: '',
      });
    } catch (error) {
      console.error('Failed to save stock:', error);
      setMessage('Failed to save stock. Please try again.'); // Set the error message
    }
  };

  const handleEdit = (stock: IStock) => {
    // When the edit button is clicked, set the stock data to the form for editing
    setFormData({ ...stock });
    setMessage(''); // Clear any previous messages when starting an edit
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/stocks/${id}`);
      setStocks(stocks.filter((stock) => stock._id !== id));
      setMessage('Stock deleted successfully.'); // Set the success message
    } catch (error) {
      console.error('Failed to delete stock:', error);
      setMessage('Failed to delete stock. Please try again.'); // Set the error message
    }
  };

  return (
    <div>
      <h1>Stocks</h1>
      {message && <p>{message}</p>} {/* Display the message to the user */}
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
        <br />
        <label>
          Width:
          <input
            type="number"
            name="width"
            value={formData.width}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Depth:
          <input
            type="number"
            name="depth"
            value={formData.depth}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Height:
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleInputChange}
          />
        </label>
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
        <br />
        <button type="submit">Save Stock</button>
      </form>
      <h2>All Stocks</h2>
      {stocks.map((stock) => (
        <div key={stock._id}>
          <p>ID: {stock._id}</p>
          <p>Stock ID: {stock.stockId}</p>
          <p>Width: {stock.width}</p>
          <p>Depth: {stock.depth}</p>
          <p>Height: {stock.height}</p>
          <p>Description: {stock.description}</p>
          <button onClick={() => handleEdit(stock)}>Edit</button>
          <button onClick={() => handleDelete(stock._id)}>Delete</button>
          <hr />
        </div>
      ))}
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);

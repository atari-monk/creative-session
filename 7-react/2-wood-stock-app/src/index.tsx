import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { createRoot } from 'react-dom/client';

interface IStock {
  _id: string;
  width: number;
  depth: number;
  height: number;
  description?: string;
}

const API_BASE_URL = 'https://atari-monk-wood-stock-api.azurewebsites.net';

const App: React.FC = () => {
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [formData, setFormData] = useState({
    id: '', // Add the 'id' field to the form data
    width: '',
    depth: '',
    height: '',
    description: '',
  });

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stocks`);
      setStocks(response.data);
    } catch (error) {
      console.error('Failed to fetch stocks:', error);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post<IStock>(
        `${API_BASE_URL}/stocks`,
        formData
      );
      setStocks([...stocks, response.data]);
      setFormData({
        id: '', // Reset the 'id' field to empty string after submission
        width: '',
        depth: '',
        height: '',
        description: '',
      });
    } catch (error) {
      console.error('Failed to create stock:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/stocks/${id}`);
      setStocks(stocks.filter((stock) => stock._id !== id));
    } catch (error) {
      console.error('Failed to delete stock:', error);
    }
  };

  return (
    <div>
      <h1>Stocks</h1>

      <form onSubmit={handleSubmit}>
        <label>
          ID: {/* Add a field to input the 'id' */}
          <input
            type="text"
            name="id"
            value={formData.id}
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
        <button type="submit">Create Stock</button>
      </form>

      <h2>All Stocks</h2>
      {stocks.map((stock) => (
        <div key={stock._id}>
          <p>ID: {stock._id}</p> {/* Display the 'id' property */}
          <p>Width: {stock.width}</p>
          <p>Depth: {stock.depth}</p>
          <p>Height: {stock.height}</p>
          <p>Description: {stock.description}</p>
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

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [stocks, setStocks] = useState([]);
  const [formData, setFormData] = useState({
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
      const response = await axios.get('/stocks');
      setStocks(response.data);
    } catch (error) {
      console.error('Failed to fetch stocks:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/stocks', formData);
      setStocks([...stocks, response.data]);
      setFormData({
        width: '',
        depth: '',
        height: '',
        description: '',
      });
    } catch (error) {
      console.error('Failed to create stock:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/stocks/${id}`);
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

export default App;

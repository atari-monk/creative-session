import React, { useState } from 'react';
import axios from 'axios';
import { StyledStockList } from '../styles';
import { IStockListProps } from './IStockListProps';

const API_BASE_URL = 'https://atari-monk-wood-api.azurewebsites.net';

const StockList: React.FC<IStockListProps> = ({ stocks, handleEdit }) => {
  const [message, setMessage] = useState<string>('');

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/stocks/${id}`);
      //setStocks(stocks.filter((stock) => stock._id !== id));
      setMessage('Stock deleted successfully.');
    } catch (error) {
      console.error('Failed to delete stock:', error);
      setMessage('Failed to delete stock. Please try again.');
    }
  };

  return (
    <StyledStockList>
      {stocks.map((stock) => (
        <div key={stock._id}>
          <p>ID: {stock._id}</p>
          <p>Stock ID: {stock.stockId}</p>
          <p>Width: {stock.width}</p>
          <p>Depth: {stock.depth}</p>
          <p>Height: {stock.height}</p>
          {stock.description && <p>Description: {stock.description}</p>}
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
      {message && <p>{message}</p>}
    </StyledStockList>
  );
};

export default StockList;

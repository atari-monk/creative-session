import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IStock } from './IStock';
import StockForm from './StockForm';
import StockList from './StockList';

const API_BASE_URL = 'https://atari-monk-wood-api.azurewebsites.net';

const StockManagementComponent: React.FC = () => {
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

  const handleEdit = (stock: IStock) => {
    setFormData({ ...stock });
    setMessage('');
  };

  const fetchStocks = async () => {
    try {
      const response = await axios.get<IStock[]>(`${API_BASE_URL}/stocks`);
      setStocks(response.data);
    } catch (error) {
      console.error('Failed to fetch stocks:', error);
      setMessage('Failed to fetch stocks. Please try again.');
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  return (
    <div className="stock-management-container">
      <StockForm formData={formData} setFormData={setFormData} />
      {message && <p className="message">{message}</p>}
      <StockList stocks={stocks} handleEdit={handleEdit} />
    </div>
  );
};

export default StockManagementComponent;

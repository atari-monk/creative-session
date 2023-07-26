import React from 'react';
import { IStockFormProps } from './IStockFormProps';

export const StockForm: React.FC<IStockFormProps> = ({
  formData,
  validationErrors,
  message,
  handleInputChange,
  handleSubmit,
}) => {
  return (
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
      {message && <p className="message">{message}</p>}
    </form>
  );
};

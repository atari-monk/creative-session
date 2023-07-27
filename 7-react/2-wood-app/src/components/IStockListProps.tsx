import { IStock } from './IStock';

export interface IStockListProps {
  stocks: IStock[];
  handleEdit: (stock: IStock) => void;
}

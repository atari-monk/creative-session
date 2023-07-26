export interface IStock extends Document {
  _id: string;
  stockId: string;
  width: number;
  depth: number;
  height: number;
  description?: string;
  count: number;
}

export interface IVector2d {
  x: number;
  y: number;
  getMagnitude(): number;
  normalize(): void;
  isEqual(b: IVector2d): boolean;
  toString(name: string): string;
}

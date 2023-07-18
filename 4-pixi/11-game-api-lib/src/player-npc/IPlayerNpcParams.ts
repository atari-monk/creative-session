import { IVector2d } from '../data-structure/IVector2d';
import { IColorParams } from '../params/IColorParams';

export interface IPlayerNpcParams {
  position: IVector2d;
  radius: number;
  colors: IColorParams;
  toString(): string;
}

import { IVector2d } from '../../model/IVector2d';
import { IColorOptions } from './IColorOptions';

export interface IPlayerNpcParams {
  position: IVector2d;
  radius: number;
  colors: IColorOptions;
  toString(): string;
}

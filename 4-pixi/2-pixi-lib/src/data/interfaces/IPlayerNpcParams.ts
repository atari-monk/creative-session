import { IVector2d } from '../../model/IVector2d';
import { IColorParams } from './IColorParams';

export interface IPlayerNpcParams {
  position: IVector2d;
  radius: number;
  colors: IColorParams;
  toString(): string;
}

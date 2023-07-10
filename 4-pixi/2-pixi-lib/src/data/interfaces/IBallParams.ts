import { IVector2d } from '../../model/IVector2d';
import { IColorParams } from './IColorParams';

export interface IBallParams {
  position: IVector2d;
  velocity: IVector2d;
  radius: number;
  colors: IColorParams;
  toString(): string;
}

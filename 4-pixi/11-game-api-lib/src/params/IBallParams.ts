import { IVector2d } from '../data-structure/IVector2d';
import { IColorParams } from './IColorParams';

export interface IBallParams {
  position: IVector2d;
  velocity: IVector2d;
  radius: number;
  colors: IColorParams;
  toString(): string;
}

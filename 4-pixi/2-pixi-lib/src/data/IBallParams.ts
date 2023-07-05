import { IVector2d } from '../model/IVector2d';
import { IColorOptions } from './configTypes';

export interface IBallParams {
  position: IVector2d;
  velocity: IVector2d;
  radius: number;
  colors: IColorOptions;
  toString(): string;
}

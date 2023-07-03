import { IPosition } from './IPosition';
import { IVector2d } from '../IVector2d';

export interface ISteerable extends IPosition {
  direction: IVector2d;
  speed: number;
}

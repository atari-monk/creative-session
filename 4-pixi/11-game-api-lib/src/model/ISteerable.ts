import { IVector2d } from '../data-structure/IVector2d';
import { IPosition } from './IPosition';

export interface ISteerable extends IPosition {
  direction: IVector2d;
  speed: number;
}

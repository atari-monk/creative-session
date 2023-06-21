import { IPosition } from './IPosition';
import { Vector2d } from './Vector2d';

export interface ISteerable extends IPosition {
  direction: Vector2d;
  speed: number;
}

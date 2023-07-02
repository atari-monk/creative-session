import { IGameObject } from '../gameObject/IGameObject';
import { IPosition } from '../model/IPosition';
import { IRadius } from '../model/IRadius';
import { IVelocity } from '../model/IVelocity';
import { IToString } from './IToString';

export interface IBall
  extends IGameObject,
    IPosition,
    IVelocity,
    IRadius,
    IToString {
  bounce(): void;
  emittVelocity(): void;
}

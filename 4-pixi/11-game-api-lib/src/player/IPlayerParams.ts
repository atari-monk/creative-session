import { IVector2d } from '../data-structure/IVector2d';
import { IColorParams } from '../params/IColorParams';
import { IKeys } from '../params/IKeys';
import { IScreenSize } from '../params/IScreenSize';

export interface IPlayerParams {
  position: IVector2d;
  direction: IVector2d;
  speed: number;
  radius: number;
  screenSize: IScreenSize;
  keys: IKeys;
  colors: IColorParams;
}

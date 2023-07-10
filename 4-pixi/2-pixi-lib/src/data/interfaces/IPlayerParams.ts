import { IVector2d } from '../../model/IVector2d';
import { IColorParams } from './IColorParams';
import { IKeys } from './IKeys';
import { IScreenSize } from './IScreenSize';

export interface IPlayerParams {
  position: IVector2d;
  direction: IVector2d;
  speed: number;
  radius: number;
  screenSize: IScreenSize;
  keys: IKeys;
  colors: IColorParams;
}

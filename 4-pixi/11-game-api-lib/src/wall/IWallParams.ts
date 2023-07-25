import { IVector2d } from '../data-structure/IVector2d';
import { IColorParams } from '../params/IColorParams';
import { IScreenSize } from '../params/IScreenSize';

export interface IWallParams {
  position: IVector2d;
  screenSize: IScreenSize;
  colors: IColorParams;
}

import { IVector2d } from '../model/IVector2d';

export interface IBallParams {
  position: IVector2d;
  velocity: IVector2d;
  radius: number;
}

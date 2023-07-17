import { IVector2d, IColorParams } from 'atari-monk-game-api-lib';

export interface IPlayerNpcParams {
  position: IVector2d;
  radius: number;
  colors: IColorParams;
  toString(): string;
}

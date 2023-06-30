import { IVector2d } from '../model/IVector2d';

interface ISize {
  width: number;
  height: number;
}

export interface IScreenSize extends ISize {}

export interface IAppHelperOptions {
  screenSize: IScreenSize;
  backgroundColor: number;
  fullScreen: boolean;
  canvasId: string;
}

export type DirectionMap = {
  [key: string]: string;
};

export interface IKeys extends DirectionMap {}

export interface IColorOptions {
  body: number;
  position: number;
  direction: number;
}

export interface IPlayerOptions {
  radius: number;
  speed: number;
  screenSize: IScreenSize;
  keys: IKeys;
  color: IColorOptions;
  isPlayable: boolean;
}

export interface IBallOptions {
  radius: number;
  speed: number;
  screenSize: IScreenSize;
  color: IColorOptions;
  isBall: boolean;
}

//GameBall2
export interface IRivalPlayer {
  rivalPosition: IVector2d;
  radius: number;
  rivalColors: IColorOptions;
}

// export interface IPlayerParams {
//   rivalPosition: IVector2d;
//   radius: number;
//   rivalColors: IColorOptions;
// }

export interface IPlayerOptionsV2 extends IPlayerOptions {
  position: IVector2d;
  direction: IVector2d;
}

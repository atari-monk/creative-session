import { IScreenSize } from 'atari-monk-game-api-lib';

export interface IAppHelperParams {
  screenSize: IScreenSize;
  backgroundColor: number;
  fullScreen: boolean;
  canvasId: string;
}

import { IScreenSize } from './IScreenSize';

export interface IAppHelperOptions {
  screenSize: IScreenSize;
  backgroundColor: number;
  fullScreen: boolean;
  canvasId: string;
}

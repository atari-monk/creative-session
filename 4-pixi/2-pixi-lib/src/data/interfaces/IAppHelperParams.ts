import { IScreenSize } from './IScreenSize';

export interface IAppHelperParams {
  screenSize: IScreenSize;
  backgroundColor: number;
  fullScreen: boolean;
  canvasId: string;
}

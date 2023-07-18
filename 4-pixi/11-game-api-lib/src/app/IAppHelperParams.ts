import { IScreenSize } from '../params/IScreenSize';

export interface IAppHelperParams {
  screenSize: IScreenSize;
  backgroundColor: number;
  fullScreen: boolean;
  canvasId: string;
}

import { ICanvas } from 'pixi.js';
import { appHelperParams } from '../data/ballGameParams';

export function getCanvas(): ICanvas {
  try {
    return document.getElementById(
      appHelperParams.canvasId
    ) as HTMLCanvasElement as ICanvas;
  } catch (error) {
    console.log(error);
    return new HTMLCanvasElement() as ICanvas;
  }
}

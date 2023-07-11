import { ICanvas } from 'pixi.js';
import { appHelperParams } from '../data/ballGameParams';

export function getCanvas(): HTMLCanvasElement {
  try {
    return document.getElementById(
      appHelperParams.canvasId
    ) as HTMLCanvasElement;
  } catch (error) {
    console.log(`Error getting canvas with id: '${appHelperParams.canvasId}'`);
    return new HTMLCanvasElement();
  }
}

export function getCanvasForPixi(): ICanvas {
  return getCanvas() as ICanvas;
}

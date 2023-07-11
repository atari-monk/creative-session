import { ICanvas } from 'pixi.js';
import { appHelperParams } from '../data/ballGameParams';

export function getCanvas(caller: string): HTMLCanvasElement | undefined {
  try {
    return document.getElementById(
      appHelperParams.canvasId
    ) as HTMLCanvasElement;
  } catch (error) {
    console.log(`Error getting canvas with id: '${appHelperParams.canvasId}' from ${caller}`);
  }
}

export function getCanvasForPixi(caller: string): ICanvas {
  return getCanvas(caller) as ICanvas;
}

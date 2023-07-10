import * as PIXI from 'pixi.js';
import { Game } from '../Game';

export interface IAppHelper {
  canvas: HTMLCanvasElement;
  backgroundColor: number;
  fullScreen: boolean;
  width: number;
  height: number;

  initializeApp(pixiApp: PIXI.Application<PIXI.ICanvas>): void;
  startAnimationLoop(game: Game): void;
}

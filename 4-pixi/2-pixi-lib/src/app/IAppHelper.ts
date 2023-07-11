import * as PIXI from 'pixi.js';
import { IBallGame } from '../ball-game/IBallGame';

export interface IAppHelper {
  canvas: HTMLCanvasElement | undefined;
  backgroundColor: number;
  fullScreen: boolean;
  width: number;
  height: number;

  initializeApp(pixiApp: PIXI.Application<PIXI.ICanvas>): void;
  startAnimationLoop(game: IBallGame): void;
}

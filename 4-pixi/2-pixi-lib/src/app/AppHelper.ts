import * as PIXI from 'pixi.js';
import { Game } from '../Game';
import { IAppHelper } from './IAppHelper';
import { IAppHelperParams } from '../data/interfaces/IAppHelperParams';
import { getCanvas } from '../utils/ui';

export class AppHelper implements IAppHelper {
  private pixiApp!: PIXI.Application<PIXI.ICanvas>;
  private _canvas?: HTMLCanvasElement;

  private _width: number;
  private _height: number;
  private _backgroundColor: number;
  private _fullScreen: boolean;

  get canvas() {
    return this._canvas;
  }

  get backgroundColor() {
    return this._backgroundColor;
  }

  get fullScreen() {
    return this._fullScreen;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  set backgroundColor(value) {
    this._backgroundColor = value;
  }

  set fullScreen(value) {
    this._fullScreen = value;
  }

  set width(value) {
    this._width = value;
  }

  set height(value) {
    this._height = value;
  }

  constructor(options: IAppHelperParams) {
    const { screenSize, backgroundColor, fullScreen } = options;
    this._width = screenSize.width;
    this._height = screenSize.height;
    this._backgroundColor = backgroundColor;
    this._fullScreen = fullScreen;
    this.setFullScreen();
    this._canvas = getCanvas('appHelper');
  }

  private setFullScreen() {
    try {
      if (this._fullScreen) {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
      }
    } catch (error) {
      console.log('Error setting fullscreen.');
    }
  }

  public initializeApp(pixiApp: PIXI.Application<PIXI.ICanvas>) {
    this.pixiApp = pixiApp;
    this.setCanvasStyles();
    this.pixiApp.stage.sortableChildren = true;
    this.resizeCanvas();
  }

  private setCanvasStyles() {
    if (!this._canvas) return;
    this._canvas.style.position = 'absolute';
    this._canvas.style.top = '50%';
    this._canvas.style.left = '50%';
    this._canvas.style.transform = 'translate(-50%, -50%)';
    const full = '100%';
    this._canvas.style.width = this._fullScreen ? full : `${this._width}`;
    this._canvas.style.height = this._fullScreen ? full : `${this._height}`;
    this._canvas.style.border = this._fullScreen ? 'none' : '1px solid white';
  }

  public startAnimationLoop(game: Game) {
    this.pixiApp.ticker.add((deltaTime) => {
      game.gameLoop(deltaTime);
    });
  }

  private resizeCanvas() {
    window.addEventListener('resize', () => {
      if (this._fullScreen) {
        this._width = window.innerWidth;
        this._height = window.innerHeight;
      }
      this.pixiApp.renderer.resize(this._width, this._height);
    });
  }
}

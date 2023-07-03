import * as PIXI from 'pixi.js';
import { Game } from './Game';
import {
  IAppHelperOptions,
  GameObject,
  BallObject,
  PlayerObject,
} from './index';
import { Ball } from './ball/Ball';
import { Player } from './player/Player';

export class AppHelper {
  private pixiApp!: PIXI.Application<PIXI.ICanvas>;
  private _canvas!: HTMLCanvasElement;

  private _width: number;
  private _height: number;
  private _backgroundColor: number;
  private _fullScreen: boolean;

  private _gameObjects: GameObject[] = [];

  constructor(options: IAppHelperOptions) {
    const { screenSize, backgroundColor, fullScreen, canvasId } = options;

    this._width = screenSize.width;
    this._height = screenSize.height;
    this._backgroundColor = backgroundColor;
    this._fullScreen = fullScreen;
    this._canvas = document.getElementById(canvasId) as HTMLCanvasElement;
  }

  public initializeApp(pixiApp: PIXI.Application<PIXI.ICanvas>) {
    this.pixiApp = pixiApp;
    this.setCanvasStyles();
    this.pixiApp.stage.sortableChildren = true;
    this.resizeCanvas();
  }

  private setCanvasStyles() {
    if (this._canvas === null) return;
    this._canvas.style.position = 'absolute';
    this._canvas.style.top = '50%';
    this._canvas.style.left = '50%';
    this._canvas.style.transform = 'translate(-50%, -50%)';
    const full = '100%';
    this._canvas.style.width = this._fullScreen ? full : `${this._width}`;
    this._canvas.style.height = this._fullScreen ? full : `${this._height}`;
    this._canvas.style.border = this._fullScreen ? 'none' : '1px solid white';
  }

  public getPixiAppOptions(): Partial<PIXI.IApplicationOptions> {
    const appOptions: Partial<PIXI.IApplicationOptions> = {
      view: this.canvas as PIXI.ICanvas,
      backgroundColor: this._backgroundColor,
    };

    if (this._fullScreen) {
      appOptions.resizeTo = window;
      this._width = window.innerWidth;
      this._height = window.innerHeight;
    } else {
      appOptions.width = this._width;
      appOptions.height = this._height;
    }

    return appOptions;
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

  public addGameObject(gameObject: GameObject) {
    this._gameObjects.push(gameObject);
  }

  public removeGameObject(gameObject: GameObject) {
    const index = this._gameObjects.indexOf(gameObject);
    if (index !== -1) {
      this._gameObjects.splice(index, 1);
    }
  }

  get canvas() {
    return this._canvas;
  }

  get backgroundColor() {
    return this._backgroundColor;
  }

  set backgroundColor(value) {
    this._backgroundColor = value;
  }

  get fullScreen() {
    return this._fullScreen;
  }

  set fullScreen(value) {
    this._fullScreen = value;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    this._width = value;
  }

  get height() {
    return this._height;
  }

  set height(value) {
    this._height = value;
  }

  get gameObjects() {
    return this._gameObjects;
  }

  private findGameObject<T>(predicate: (obj: any) => boolean): T {
    return this.gameObjects.find(predicate) as T;
  }

  public findBall(): Ball {
    return this.findGameObject<Ball>((obj) => obj instanceof Ball);
  }

  public findPlayer(): Player {
    return this.findGameObject<Player>(
      (obj) => obj instanceof Player && obj.model.isPlayable
    );
  }

  public findBallObject(): BallObject {
    return this.findGameObject<BallObject>((obj) => obj instanceof BallObject);
  }

  public findPlayerObject(): PlayerObject {
    return this.findGameObject<PlayerObject>(
      (obj) => obj instanceof PlayerObject && obj.isPlayable
    );
  }
}

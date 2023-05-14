import { App } from '../pixi-lib/App.js';
import { CircleObject } from '../pixi-lib/CircleObject.js';

const appOptions = {
  canvasId: 'mainCanvasId',
  backgroundColor: 0x000000,
  width: 800,
  height: 600,
  fullScreen: true,
  log: true,
};

const app = new App(appOptions);

const playerOptions = {
  radius: 50,
  speed: 2,
  width: app.width,
  height: app.height,
};

const player = new CircleObject(playerOptions);
player.position.x = app.width / 2;
player.position.y = app.height / 2;
app.addGameObject(player);

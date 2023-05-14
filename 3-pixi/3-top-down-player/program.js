import { App } from './../pixi-lib/App.js';
import { KeyboardInput } from './../pixi-lib/keyboardInput.js';
import { PlayerObject } from './../pixi-lib/PlayerObject.js';

const keyboard = new KeyboardInput({
  arrows: false,
});

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
  keyboard: keyboard,
  keys: {
    left: 37,
    right: 39,
    up: 38,
    down: 40,
  },
};

const player = new PlayerObject(playerOptions);
player.position.x = app.width / 2;
player.position.y = app.height / 2;
app.addGameObject(player);

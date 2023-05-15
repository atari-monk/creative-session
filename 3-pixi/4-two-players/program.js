import { App } from './../pixi-lib/App.js';
import { KeyboardInput } from './../pixi-lib/keyboardInput.js';
import { PlayerObject } from './../pixi-lib/PlayerObject.js';
import { GameClient } from './../pixi-lib/GameClient.js';

const client = new GameClient();

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

const green = 0x00ff00;
const blue = 0x0000ff;

const playerOptions = {
  radius: 50,
  speed: 2,
  width: app.width,
  height: app.height,
  keyboard: keyboard,
  keys: {
    a: 65,
    d: 68,
    w: 87,
    s: 83,
  },
  color: {
    player: green,
    position: blue,
    direction: blue,
  },
  client: client,
};

const player = new PlayerObject(playerOptions);
player.position.x = app.width / 2;
player.position.y = app.height / 2;
app.addGameObject(player);

const playerOptions2 = {
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
  color: {
    player: 0xff0000,
    position: 0x0000ff,
    direction: 0x0000ff,
  },
  client: client,
};

const player2 = new PlayerObject(playerOptions2);
player2.position.x = app.width / 2;
player2.position.y = app.height / 2 + 100;
app.addGameObject(player2);

client.addPlayers([player, player2]);

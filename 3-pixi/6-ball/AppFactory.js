import { App } from '../pixi-lib/App.js';
import { KeyboardInput } from '../pixi-lib/KeyboardInput.js';
import { PlayerObject } from '../pixi-lib/PlayerObject.js';
import { GameClient } from '../pixi-lib/GameClient.js';

export class AppFactory {
  static createAndRunApp(
    canvasId,
    backgroundColor,
    width,
    height,
    fullScreen,
    log,
    playerUrlParam
  ) {
    const client = new GameClient();

    const keyboard = new KeyboardInput({
      arrows: false,
    });

    const appOptions = {
      canvasId: canvasId,
      backgroundColor: backgroundColor,
      width: width,
      height: height,
      fullScreen: fullScreen,
      log: log,
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
        left: 37,
        right: 39,
        up: 38,
        down: 40,
      },
      color: {
        player: green,
        position: blue,
        direction: blue,
      },
      isPlayable: 1 === playerUrlParam,
    };
    console.log(playerOptions);

    const player1 = new PlayerObject(playerOptions);
    player1.position.x = app.width / 2 - 50;
    player1.position.y = app.height / 2;
    app.addGameObject(player1);

    const playerOptions2 = {
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
      isPlayable: 2 === playerUrlParam,
    };
    console.log(playerOptions2);

    const player2 = new PlayerObject(playerOptions2);
    player2.position.x = app.width / 2 + 50;
    player2.position.y = app.height / 2;
    app.addGameObject(player2);

    client.addPlayerObjs([player1, player2]);
  }
}

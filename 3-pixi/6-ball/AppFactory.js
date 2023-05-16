import { App } from './../pixi-lib/App.js';
import { KeyboardInput } from './../pixi-lib/KeyboardInput.js';
import { PlayerObject } from './../pixi-lib/PlayerObject.js';
import { GameClient } from './../pixi-lib/GameClient.js';
import { gameObjData } from './gameObjData.js';
import { BallObject } from './../pixi-lib/BallObject.js';

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
    const client = new GameClient();

    for (const playerOption of gameObjData) {
      const player = new PlayerObject({
        ...playerOption,
        width: app.width,
        height: app.height,
        keyboard: keyboard,
      });
      player.isPlayable = player.playerNr === playerUrlParam;
      player.position.x = app.width / 2 + (player.playerNr === 1 ? -250 : 250);
      player.position.y = app.height / 2;
      app.addGameObject(player);
      client.addPlayerObj(player);
    }

    const ball = new BallObject({
      ...{
        id: 3,
        radius: 20,
        speed: 2,
        color: {
          player: 0xff0000,
          position: 0x0000ff,
          direction: 0x0000ff,
        },
        isBall: true,
      },
      width: app.width,
      height: app.height,
    });
    ball.position.x = app.width / 2;
    ball.position.y = app.height / 2;
    ball.client = client;
    app.addGameObject(ball);
    client.addPlayerObj(ball);
  }
}

import { App } from '../pixi-lib/App.js';
import { KeyboardInput } from '../pixi-lib/KeyboardInput.js';
import { PlayerObject } from '../pixi-lib/PlayerObject.js';
import { GameClient } from '../pixi-lib/GameClient.js';
import { gameObjData } from './gameObjData.js';

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
      player.position.x = app.width / 2 + (player.playerNr === 1 ? -50 : 50);
      player.position.y = app.height / 2;
      app.addGameObject(player);
      client.addPlayerObj(player);
    }
  }
}

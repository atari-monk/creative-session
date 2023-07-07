import { IVector2d, SocketLogicUnit, Vector2d } from 'atari-monk-pixi-lib';
import { IPlayerManager } from '../IPlayerManager.js';
import { IVectorData } from 'atari-monk-pixi-lib';

export class PlayerMovement extends SocketLogicUnit {
  constructor(
    eventName: string,
    private readonly playerManager: IPlayerManager
  ) {
    super(eventName);
  }

  protected logicUnit(jsObj: any) {
    try {
      const data: IVectorData = {
        clientId: jsObj.clientId,
        newVector: new Vector2d(jsObj.newVector.x, jsObj.newVector.y),
      };
      if (!data.clientId) throw new Error('No clientId data!');
      this.updatePlayerPosition(data.clientId, data.newVector);
    } catch (error) {
      console.log(error);
    }
  }

  private updatePlayerPosition(clientId: string, newPosition: IVector2d): void {
    const player = this.playerManager.getPlayerNpc(clientId);
    if (!player) {
      throw new Error(`No player with id: ${clientId}`);
    }
    player.model.position = newPosition;
  }
}

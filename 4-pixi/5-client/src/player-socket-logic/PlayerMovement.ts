import { SocketLogicUnit } from '../socket-logic/SocketLogicUnit.js';
import { IPlayerManager } from '../IPlayerManager.js';
import { VectorData } from '../../../2-pixi-lib/dist/VectorData.js';

export class PlayerMovement extends SocketLogicUnit {
  constructor(
    eventName: string,
    private readonly playerManager: IPlayerManager
  ) {
    super(eventName);
  }

  protected logicUnit(data: VectorData): void {
    if (!data.clientId) throw new Error('No clientId data!');
    if (!data.newVector) throw new Error('No position data!');
    this.updatePlayerPosition(data.clientId, data.newVector);
  }

  private updatePlayerPosition(
    clientId: string,
    newPosition: { x: number; y: number }
  ): void {
    const player = this.playerManager.getPlayer(clientId);
    if (!player) {
      throw new Error(`No player with id: ${clientId}`);
    }
    player.position = newPosition;
  }
}

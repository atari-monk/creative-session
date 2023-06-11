import { Socket } from 'socket.io-client';
import { IPlayerManager } from './IPlayerManager.js';
import { VectorData } from '../../2-pixi-lib/dist/VectorData.js';
import { SocketLogicBase } from './SocketLogicBase.js';

export class PlayerMovement extends SocketLogicBase {
  private readonly playerManager: IPlayerManager;

  constructor(socket: Socket, playerManager: IPlayerManager) {
    super(socket, 'movement');
    this.playerManager = playerManager;
  }

  protected eventLogic(data: VectorData): void {
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

import { Socket } from 'socket.io-client';
import { IPlayerManager } from './IPlayerManager.js';
import { ISetSocketOnHandler } from './ISetSocketOnHandler.js';
import { VectorData } from '../../2-pixi-lib/dist/VectorData.js';

export class PlayerMovement implements ISetSocketOnHandler {
  private readonly socket: Socket;
  private readonly playerManager: IPlayerManager;
  private readonly eventName: string = 'movement';

  constructor(socket: Socket, playerManager: IPlayerManager) {
    this.socket = socket;
    this.playerManager = playerManager;
  }

  public setSocketOnHandler() {
    this.socket.on(this.eventName, this.handleMovement.bind(this));
  }

  private handleMovement(data: VectorData): void {
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

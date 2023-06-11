import { Socket } from 'socket.io-client';
import { EventEmitter } from 'eventemitter3';
import { VectorData } from '../../2-pixi-lib/dist/VectorData.js';
import { IPlayerManager } from './IPlayerManager.js';

export class PlayerSocket {
  private readonly socket: Socket;
  private readonly playerManager: IPlayerManager;
  private readonly emitter: EventEmitter;

  constructor(
    socket: Socket,
    playerManager: IPlayerManager,
    emitter: EventEmitter
  ) {
    this.socket = socket;
    this.playerManager = playerManager;
    this.emitter = emitter;
  }

  public setupEventHandlers(): void {
    //this.socket.on('movement', this.handleMovement.bind(this));
    this.socket.on('disconnect', this.handleDisconnect.bind(this));
    //this.socket.on('clientIdList', this.handleClientIdList.bind(this));
    this.socket.on('connect_error', this.handleConnectError.bind(this));
  }

//   private handleMovement(data: VectorData): void {
//     if (!data.clientId) throw new Error('No clientId data!');
//     if (!data.newVector) throw new Error('No position data!');
//     this.updatePlayerPosition(data.clientId, data.newVector);
//   }

  private handleDisconnect(): void {
    console.log('Disconnected from server');
  }

//   private handleClientIdList(clientIdList: string[]): void {
//     const newClientId = clientIdList.find((id) => id !== this.socket.id);
//     if (!newClientId) return;
//     const player = this.playerManager.getNonPlayablePlayer();
//     if (!player) throw new Error('No second player!');
//     player.clientId = newClientId;
//     this.playerManager.addPlayer(newClientId, player);
//     console.log(`New player connected, id: ${newClientId}'`);
//   }

  private handleConnectError(error: Error): void {
    console.error('Connection error:', error.message);
  }

//   private updatePlayerPosition(
//     clientId: string,
//     newPosition: { x: number; y: number }
//   ): void {
//     const player = this.playerManager.getPlayer(clientId);
//     if (!player) {
//       throw new Error(`No player with id: ${clientId}`);
//     }
//     player.position = newPosition;
//   }
}

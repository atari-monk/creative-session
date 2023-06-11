import { Socket } from 'socket.io-client';
import { IPlayerManager } from './IPlayerManager.js';
import { ISetSocketOnHandler } from './ISetSocketOnHandler.js';

export class PlayerList implements ISetSocketOnHandler {
  private readonly socket: Socket;
  private readonly playerManager: IPlayerManager;
  private readonly eventName: string = 'clientIdList';

  constructor(socket: Socket, playerManager: IPlayerManager) {
    this.socket = socket;
    this.playerManager = playerManager;
  }

  public setSocketOnHandler() {
    this.socket.on(this.eventName, this.handleClientIdList.bind(this));
  }

  private handleClientIdList(clientIdList: string[]): void {
    const newClientId = clientIdList.find((id) => id !== this.socket.id);
    if (!newClientId) return;
    const player = this.playerManager.getNonPlayablePlayer();
    if (!player) throw new Error('No second player!');
    player.clientId = newClientId;
    this.playerManager.addPlayer(newClientId, player);
    console.log(`New player connected, id: ${newClientId}'`);
  }
}

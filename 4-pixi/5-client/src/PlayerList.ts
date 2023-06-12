import { Socket } from 'socket.io-client';
import { IPlayerManager } from './IPlayerManager.js';
import { SocketLogicBase } from './SocketLogicBase.js';

export class PlayerList extends SocketLogicBase {
  private readonly playerManager: IPlayerManager;

  constructor(socket: Socket, playerManager: IPlayerManager) {
    super(socket, 'clientIdList');
    this.playerManager = playerManager;
  }

  protected eventLogic(clientIdList: string[]) {
    const newClientId = clientIdList.find((id) => id !== this.socket.id);
    if (!newClientId) return;
    const player = this.playerManager.getNonPlayablePlayer();
    if (!player) throw new Error('No second player!');
    player.clientId = newClientId;
    this.playerManager.addPlayer(newClientId, player);
    console.log(`New player connected, id: ${newClientId}'`);
  }
}

import { SocketLogicUnit } from 'atari-monk-pixi-lib';
import { Socket } from 'socket.io-client';
import { IPlayerManager } from '../IPlayerManager.js';

export class PlayerList extends SocketLogicUnit {
  constructor(
    eventName: string,
    private readonly socket: Socket,
    private readonly playerManager: IPlayerManager
  ) {
    super(eventName);
  }

  protected logicUnit(clientIdList: string[]) {
    const newClientId = clientIdList.find((id) => id !== this.socket.id);
    if (!newClientId) return;
    const player = this.playerManager.getNonPlayablePlayer();
    if (!player) throw new Error('No second player!');
    player.id = newClientId;
    this.playerManager.addPlayer(newClientId, player);
    console.log(`New player connected, id: ${newClientId}'`);
  }
}

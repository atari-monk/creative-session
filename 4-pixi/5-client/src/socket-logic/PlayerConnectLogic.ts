import { Socket } from 'socket.io-client';
import { SocketLogicUnit } from 'atari-monk-pixi-lib';
import { IPlayerManager } from '../IPlayerManager.js';

export class PlayerConnectLogic extends SocketLogicUnit {
  constructor(
    eventName: string,
    private readonly socket: Socket,
    private readonly playerManager: IPlayerManager
  ) {
    super(eventName);
  }

  protected logicUnit() {
    try {
      const clientId = this.socket.id;
      const player = this.playerManager.getPlayer('0');

      if (!player) {
        this.noPlayerError();
        return;
      }

      player.model.clientId = clientId;
      this.playerManager.removePlayer('0');
      this.playerManager.addPlayer(clientId, player);

      console.log(`Player connected to server, id: ${clientId}`);
    } catch (err) {
      console.error('Connection error:', (err as Error).message);
    }
  }

  private noPlayerError() {
    const message =
      'Please add ?player=1 or 2 to url and refresh to select your player. Select a number other than your friend.';
    throw new Error(message);
  }
}

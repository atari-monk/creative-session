import { Socket } from 'socket.io-client';
import { IPlayerManager } from './IPlayerManager.js';
import { ISetSocketOnHandler } from './ISetSocketOnHandler.js';

export class PlayerConnectLogic implements ISetSocketOnHandler {
  private readonly socket: Socket;
  private readonly playerManager: IPlayerManager;
  private readonly eventName: string = 'connect';

  constructor(socket: Socket, playerManager: IPlayerManager) {
    this.socket = socket;
    this.playerManager = playerManager;
  }

  public setSocketOnHandler() {
    this.socket.on(this.eventName, this.handleConnect.bind(this));
  }

  private handleConnect() {
    try {
      const clientId = this.socket.id;
      const playablePlayer = this.playerManager.getPlayablePlayer();

      if (!playablePlayer) {
        this.noPlayablePlayerError();
        return;
      }

      playablePlayer.clientId = clientId;
      this.playerManager.addPlayer(clientId, playablePlayer);

      console.log(`Connected to server, id: ${clientId}`);
    } catch (err) {
      console.error('Connection error:', (err as Error).message);
    }
  }

  private noPlayablePlayerError() {
    const message =
      'Please add ?player=1 or 2 to url and refresh to select your player. Select a number other than your friend.';
    throw new Error(message);
  }
}

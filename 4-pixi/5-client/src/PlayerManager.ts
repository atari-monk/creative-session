import { IPlayer, IVector2d } from 'atari-monk-pixi-lib';
import { IPlayerManager } from './IPlayerManager.js';
import { IPlayerNpc } from 'atari-monk-pixi-lib/player-npc/IPlayerNpc.js';
import { Socket } from 'socket.io-client';

export class PlayerManager implements IPlayerManager {
  private _players: { [clientId: string]: IPlayer } = {};
  private _playerNpcs: { [clientId: string]: IPlayerNpc } = {};

  public addPlayer(clientId: string, player: IPlayer) {
    this._players[clientId] = player;
  }

  public getPlayer(clientId: string) {
    return this._players[clientId];
  }

  public removePlayer(clientId: string) {
    delete this._players[clientId];
  }

  public updatePlayerPosition(clientId: string, newPosition: IVector2d) {
    const player = this._players[clientId];
    if (!player) {
      throw new Error(`No player with id: ${clientId}`);
    }
    player.model.position = newPosition;
  }

  public addPlayerNpc(clientId: string, playerNpc: IPlayerNpc) {
    this._playerNpcs[clientId] = playerNpc;
  }

  public getPlayerNpc(clientId: string) {
    return this._playerNpcs[clientId];
  }

  public removePlayerNpc(clientId: string) {
    delete this._playerNpcs[clientId];
  }

  public getPlayerBySocket(socket: Socket) {
    const clientId = socket.id;
    return this._players[clientId];
  }

  public getPlayerNpcBySocket(socket: Socket) {
    const clientId = socket.id;
    return this._playerNpcs[clientId];
  }

  public addPlayerWithSocket(socket: Socket, player: IPlayer) {
    const clientId = socket.id;
    this.addPlayer(clientId, player);
  }

  public addPlayerNpcWithSocket(socket: Socket, playerNpc: IPlayerNpc) {
    const clientId = socket.id;
    this.addPlayerNpc(clientId, playerNpc);
  }
}

import { PlayerObject } from 'atari-monk-pixi-lib';
import { IPlayerManager } from './IPlayerManager.js';

export class PlayerManager implements IPlayerManager {
  private _playerObjs: PlayerObject[] = [];
  private _players: { [key: string]: PlayerObject } = {};
  private clientId?: string;

  public addPlayer(clientId: string, player: PlayerObject) {
    this._players[clientId] = player;
  }

  public getPlayer(clientId: string) {
    return this._players[clientId];
  }

  public removePlayer(clientId: string) {
    delete this._players[clientId];
  }

  public updatePlayerPosition(
    clientId: string,
    newPosition: { x: number; y: number }
  ) {
    const player = this._players[clientId];
    if (!player) {
      throw new Error(`No player with id: ${clientId}`);
    }
    player.position = newPosition;
  }

  public getNonPlayablePlayer() {
    return this._playerObjs.find((player) => !player.isPlayable);
  }

  public getPlayablePlayer() {
    return this._playerObjs.find((player) => player.isPlayable);
  }

  public addPlayerObj(player: PlayerObject) {
    this._playerObjs.push(player);
  }

  public getClientId() {
    return this.clientId;
  }
}

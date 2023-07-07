import { IPlayer, IVector2d } from 'atari-monk-pixi-lib';
import { IPlayerManager } from './IPlayerManager.js';

export class PlayerManager implements IPlayerManager {
  private _playerObjs: IPlayer[] = [];
  private _players: { [key: string]: IPlayer } = {};

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

  public getNonPlayablePlayer() {
    return this._playerObjs.find((player) => !player.model.isPlayable);
  }

  public getPlayablePlayer() {
    return this._playerObjs.find((player) => player.model.isPlayable);
  }

  public addPlayerObj(player: IPlayer) {
    this._playerObjs.push(player);
  }
}

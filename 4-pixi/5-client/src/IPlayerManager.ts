import { IPlayer, IVector2d } from 'atari-monk-pixi-lib';

export interface IPlayerManager {
  addPlayer(clientId: string, player: IPlayer): void;
  getPlayer(clientId: string): IPlayer;
  removePlayer(clientId: string): void;
  updatePlayerPosition(clientId: string, newPosition: IVector2d): void;
  getNonPlayablePlayer(): IPlayer | undefined;
  getPlayablePlayer(): IPlayer | undefined;
  addPlayerObj(player: IPlayer): void;
  //getClientId(): string | undefined;
}

import { PlayerObject } from 'atari-monk-pixi-lib';

export interface IPlayerManager {
  addPlayer(clientId: string, player: PlayerObject): void;
  getPlayer(clientId: string): PlayerObject;
  removePlayer(clientId: string): void;
  updatePlayerPosition(
    clientId: string,
    newPosition: { x: number; y: number }
  ): void;
  getNonPlayablePlayer(): PlayerObject | undefined;
  getPlayablePlayer(): PlayerObject | undefined;
  addPlayerObj(player: PlayerObject): void;
  getClientId(): string | undefined;
}

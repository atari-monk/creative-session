import { PlayerObject } from '../../2-pixi-lib/dist/PlayerObject.js';

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

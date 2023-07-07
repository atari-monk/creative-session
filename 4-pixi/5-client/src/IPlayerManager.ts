import { IPlayer, IVector2d } from 'atari-monk-pixi-lib';
import { IPlayerNpc } from 'atari-monk-pixi-lib/player-npc/IPlayerNpc';
import { Socket } from 'socket.io-client';

export interface IPlayerManager {
  addPlayer(clientId: string, player: IPlayer): void;
  getPlayer(clientId: string): IPlayer;
  removePlayer(clientId: string): void;
  updatePlayerPosition(clientId: string, newPosition: IVector2d): void;
  addPlayerNpc(clientId: string, playerNpc: IPlayerNpc): void;
  getPlayerNpc(clientId: string): IPlayerNpc;
  removePlayerNpc(clientId: string): void;
  getPlayerBySocket(socket: Socket): IPlayer;
  getPlayerNpcBySocket(socket: Socket): IPlayerNpc;
  addPlayerWithSocket(socket: Socket, player: IPlayer): void;
  addPlayerNpcWithSocket(socket: Socket, playerNpc: IPlayerNpc): void;
}

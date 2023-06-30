import { IPlayer } from './IPlayer';

export interface IPlayerUpdater {
  update(deltaTime: number, player: IPlayer): void;
}

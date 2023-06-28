import { IPlayablePlayer } from './IPlayablePlayer';

export interface IUpdateablePlayer {
  update(deltaTime: number, player: IPlayablePlayer): void;
}

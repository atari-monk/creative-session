import { IBall } from '../ball/IBall';
import { IPlayer } from '../player/IPlayer';

export interface IGameUpdateable {
  Update(deltaTime: number, ball: IBall, player: IPlayer): void;
}

import { IBall } from '../ball/IBall';
import { IPlayerModel } from '../model/IPlayerModel';

export interface IPlayer {
  model: IPlayerModel;
  kickBall(ball: IBall): void;
}

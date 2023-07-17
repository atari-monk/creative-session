import { IBall } from '../ball/IBall';
import { IGameObject } from '../game-obj/IGameObject';
import { IPlayerModel } from './IPlayerModel';

export interface IPlayer extends IGameObject {
  model: IPlayerModel;
  kickBall(ball: IBall): void;
}

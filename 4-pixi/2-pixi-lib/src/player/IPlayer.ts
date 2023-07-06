import { IBall } from '../ball/IBall';
import { IGameObject } from '../gameObject/IGameObject';
import { IPlayerModel } from '../model/IPlayerModel';

export interface IPlayer extends IGameObject {
  model: IPlayerModel;
  kickBall(ball: IBall): void;
}

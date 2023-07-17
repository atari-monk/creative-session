import { IBall } from '../ball/IBall';
import { IGameObject } from 'atari-monk-game-api-lib';
import { IPlayerModel } from '../model/IPlayerModel';

export interface IPlayer extends IGameObject {
  model: IPlayerModel;
  kickBall(ball: IBall): void;
}

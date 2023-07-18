import { IGameObject } from '../game-obj/IGameObject';
import { IPlayerNpcModel } from './IPlayerNpcModel';

export interface IPlayerNpc extends IGameObject {
  model: IPlayerNpcModel;
}

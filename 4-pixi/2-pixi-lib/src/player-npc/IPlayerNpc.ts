import { IGameObject } from '../gameObject/IGameObject';
import { IPlayerNpcModel } from '../model/IPlayerNpcModel';

export interface IPlayerNpc extends IGameObject {
  model: IPlayerNpcModel;
}

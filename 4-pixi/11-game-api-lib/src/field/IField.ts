import { IGameObject } from '../game-obj/IGameObject';
import { IFieldModel } from './IFieldModel';

export interface IField extends IGameObject {
  model: IFieldModel;
}

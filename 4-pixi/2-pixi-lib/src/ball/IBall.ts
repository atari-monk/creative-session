import { IGameObject } from '../gameObject/IGameObject';
import { IPosition } from '../model/IPosition';
import { ICircle } from '../model/ICircle';

export interface IBall extends IGameObject, IPosition, ICircle {}

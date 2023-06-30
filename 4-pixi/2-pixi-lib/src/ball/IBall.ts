import { IGameObject } from '../gameObject/IGameObject';
import { IPosition } from '../model/IPosition';
import { ICircle } from '../model/ICircle';
import { IVelocity } from '../model/IVelocity';

export interface IBall extends IGameObject, IPosition, IVelocity, ICircle {}

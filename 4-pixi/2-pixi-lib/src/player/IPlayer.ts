import { IGameObject } from '../gameObject/IGameObject';
import { IPosition } from '../model/IPosition';
import { IPlayable } from '../model/IPlayable';
import { IIdModel } from '../model/IIdModel';
import { ICircle } from '../model/ICircle';

export interface IPlayer
  extends IGameObject,
    IPosition,
    IPlayable,
    IIdModel,
    ICircle {}

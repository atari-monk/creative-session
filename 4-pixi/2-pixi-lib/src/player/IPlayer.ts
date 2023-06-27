import { IGameObject } from '../gameObject/IGameObject';
import { IPosition } from '../model/IPosition';
import { IPlayable } from '../model/IPlayable';
import { IIdModel } from '../model/IIdModel';

export interface IPlayer extends IGameObject, IPosition, IPlayable, IIdModel {}

import { IPlayable } from '../model/IPlayable';
import { IIdModel } from '../model/IIdModel';
import { INotPlayableGameObject } from './INotPlayableGameObject';

export interface INotPlayablePlayer
  extends INotPlayableGameObject,
    IIdModel,
    IPlayable {}

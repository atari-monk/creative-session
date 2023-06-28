import { IGameObject } from '../gameObject/IGameObject';
import { IPlayable } from '../model/IPlayable';
import { IIdModel } from '../model/IIdModel';
import { ISteerable } from '../model/ISteerable';
import { ICircle } from '../model/ICircle';
import { IKickBall } from './IKickBall';

export interface ISteerablePlayer
  extends IGameObject,
    ISteerable,
    IPlayable,
    IIdModel,
    ICircle,
    IKickBall {}

import { ISteerable } from '../model/ISteerable';
import { IKickBall } from './IKickBall';
import { INotPlayablePlayer } from './INotPlayablePlayer';

export interface IPlayablePlayer
  extends INotPlayablePlayer,
    ISteerable,
    IKickBall {}

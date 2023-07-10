import { IToString } from '../ball/IToString';
import { IPlayerParams } from '../data/interfaces/IPlayerParams';
import { ICircle } from './interface/ICircle';
import { IClientId } from './interface/IClientId';
import { IDirection } from './interface/IDirection';
import { IPlayable } from './interface/IPlayable';
import { IPosition } from './interface/IPosition';
import { IRadius } from './interface/IRadius';
import { ISpeed } from './interface/ISpeed';

export interface IPlayerModel
  extends IPosition,
    IDirection,
    ISpeed,
    IRadius,
    ICircle,
    IPlayable,
    IClientId,
    IToString {
  params: IPlayerParams;
}

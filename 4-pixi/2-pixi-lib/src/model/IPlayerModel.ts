import { ICircle } from '..';
import { IToString } from '../ball/IToString';
import { IPlayerParams } from '../data/appConfig';
import { IDirection } from './interface/IDirection';
import { IIdModel } from './interface/IIdModel';
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
    IIdModel,
    IToString {
  params: IPlayerParams;
}

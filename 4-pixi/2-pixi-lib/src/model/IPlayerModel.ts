import { ICircle } from '..';
import { IToString } from '../ball/IToString';
import { IPlayerParams } from '../data/appConfig';
import { IDirection } from './api/IDirection';
import { IIdModel } from './api/IIdModel';
import { IPlayable } from './api/IPlayable';
import { IPosition } from './api/IPosition';
import { IRadius } from './api/IRadius';
import { ISpeed } from './api/ISpeed';

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

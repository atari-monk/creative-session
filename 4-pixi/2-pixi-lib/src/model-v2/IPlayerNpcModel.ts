import { IToString } from '../ball/IToString';
import { IPlayerNpcParams } from '../data/appConfig';
import { ICircle } from './interface/ICircle';
import { IIdModel } from './interface/IIdModel';
import { IPlayable } from './interface/IPlayable';
import { IPosition } from './interface/IPosition';
import { IRadius } from './interface/IRadius';

export interface IPlayerNpcModel
  extends IPosition,
    IRadius,
    ICircle,
    IPlayable,
    IIdModel,
    IToString {
  params: IPlayerNpcParams;
}

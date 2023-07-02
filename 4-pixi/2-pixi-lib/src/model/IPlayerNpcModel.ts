import { IToString } from '../ball/IToString';
import { IPlayerNpcParams } from '../data/appConfig';
import { ICircle } from './ICircle';
import { IIdModel } from './IIdModel';
import { IPlayable } from './IPlayable';
import { IPosition } from './IPosition';
import { IRadius } from './IRadius';

export interface IPlayerNpcModel
  extends IPosition,
    IRadius,
    ICircle,
    IPlayable,
    IIdModel,
    IToString {
  params: IPlayerNpcParams;
}

import { IToString } from '../ball/IToString';
import { IPlayerNpcParams } from '../data/appConfig';
import { ICircle } from './api/ICircle';
import { IIdModel } from './api/IIdModel';
import { IPlayable } from './api/IPlayable';
import { IPosition } from './api/IPosition';
import { IRadius } from './api/IRadius';

export interface IPlayerNpcModel
  extends IPosition,
    IRadius,
    ICircle,
    IPlayable,
    IIdModel,
    IToString {
  params: IPlayerNpcParams;
}

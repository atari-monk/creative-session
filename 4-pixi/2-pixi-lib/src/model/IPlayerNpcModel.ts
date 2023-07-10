import { IToString } from '../ball/IToString';
import { IPlayerNpcParams } from '../data/interfaces/IPlayerNpcParams';
import { ICircle } from './interface/ICircle';
import { IClientId } from './interface/IClientId';
import { IPlayable } from './interface/IPlayable';
import { IPosition } from './interface/IPosition';
import { IRadius } from './interface/IRadius';

export interface IPlayerNpcModel
  extends IPosition,
    IRadius,
    ICircle,
    IPlayable,
    IClientId,
    IToString {
  params: IPlayerNpcParams;
}

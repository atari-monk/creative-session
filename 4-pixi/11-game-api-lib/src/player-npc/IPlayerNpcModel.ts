import { ICircle } from '../model/ICircle';
import { IClientId } from '../model/IClientId';
import { IPlayable } from '../model/IPlayable';
import { IPosition } from '../model/IPosition';
import { IRadius } from '../model/IRadius';
import { IToString } from '../object/IToString';
import { IPlayerNpcParams } from './IPlayerNpcParams';

export interface IPlayerNpcModel
  extends IPosition,
    IRadius,
    ICircle,
    IPlayable,
    IClientId,
    IToString {
  params: IPlayerNpcParams;
}

import { IToString } from '../ball/IToString';
import { IBallParams } from '../data/IBallParams';
import { IIdModel } from './interface/IIdModel';
import { IPosition } from './interface/IPosition';
import { IRadius } from './interface/IRadius';
import { IVelocity } from './interface/IVelocity';

export interface IBallModel
  extends IIdModel,
    IPosition,
    IVelocity,
    IRadius,
    IToString {
  params: IBallParams;
}

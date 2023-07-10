import { IToString } from '../ball/IToString';
import { IBallParams } from '../data/interfaces/IBallParams';
import { IClientId } from './interface/IClientId';
import { IPosition } from './interface/IPosition';
import { IRadius } from './interface/IRadius';
import { IVelocity } from './interface/IVelocity';

export interface IBallModel
  extends IClientId,
    IPosition,
    IVelocity,
    IRadius,
    IToString {
  params: IBallParams;
}

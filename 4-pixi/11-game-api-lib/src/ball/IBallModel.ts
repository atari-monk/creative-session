import { IClientId } from '../model/IClientId';
import { IPosition } from '../model/IPosition';
import { IRadius } from '../model/IRadius';
import { IVelocity } from '../model/IVelocity';
import { IToString } from '../object/IToString';
import { IBallParams } from '../params/IBallParams';

export interface IBallModel
  extends IClientId,
    IPosition,
    IVelocity,
    IRadius,
    IToString {
  params: IBallParams;
}

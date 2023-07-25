import { IClientId } from '../model/IClientId';
import { IPosition } from '../model/IPosition';
import { IToString } from '../object/IToString';
import { IWallParams } from './IWallParams';

export interface IWallModel extends IPosition, IClientId, IToString {
  params: IWallParams;
}

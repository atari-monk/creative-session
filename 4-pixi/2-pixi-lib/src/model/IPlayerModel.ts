import { ICircle } from '..';
import { IToString } from '../ball/IToString';
import { IPlayerParams } from '../data/appConfig';
import { IDirection } from './interface/IDirection';
import { IRadius } from './interface/IRadius';
import { ISpeed } from './interface/ISpeed';
import { IPlayerAsClient } from './IPlayerAsClient';

export interface IPlayerModel
  extends IDirection,
    ISpeed,
    IRadius,
    ICircle,
    IPlayerAsClient,
    IToString {
  params: IPlayerParams;
}

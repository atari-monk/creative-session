import { IToString } from '../ball/IToString';
import { IPlayerNpcParams } from '../data/appConfig';
import { IPlayerAsClient } from './IPlayerAsClient';
import { ICircle } from './interface/ICircle';
import { IRadius } from './interface/IRadius';

export interface IPlayerNpcModel
  extends IRadius,
    ICircle,
    IPlayerAsClient,
    IToString {
  params: IPlayerNpcParams;
}

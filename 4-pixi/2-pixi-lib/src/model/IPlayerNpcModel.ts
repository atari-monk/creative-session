import {
  IToString,
  ICircle,
  IClientId,
  IPlayable,
  IPosition,
  IRadius,
} from 'atari-monk-game-api-lib';
import { IPlayerNpcParams } from '../data/interfaces/IPlayerNpcParams';

export interface IPlayerNpcModel
  extends IPosition,
    IRadius,
    ICircle,
    IPlayable,
    IClientId,
    IToString {
  params: IPlayerNpcParams;
}

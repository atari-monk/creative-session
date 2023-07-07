import { IClientId } from './interface/IClientId';
import { IPlayable } from './interface/IPlayable';
import { IPosition } from './interface/IPosition';

export interface IPlayerAsClient extends IPlayable, IClientId, IPosition {}

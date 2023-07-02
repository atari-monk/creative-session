import { ISteerable } from '../model/ISteerable';
import { IBallKicker } from './IBallKicker';
import { IPlayerNpc } from '../player-npc/IPlayerNpc';
import { IToString } from '../ball/IToString';

export interface IPlayer extends IPlayerNpc, ISteerable, IBallKicker, IToString {}

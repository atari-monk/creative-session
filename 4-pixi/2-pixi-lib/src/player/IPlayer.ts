import { ISteerable } from '../model/ISteerable';
import { IBallKicker } from './IBallKicker';
import { INotPlayablePlayer } from '../player-non-playable/INotPlayablePlayer';

export interface IPlayer extends INotPlayablePlayer, ISteerable, IBallKicker {}

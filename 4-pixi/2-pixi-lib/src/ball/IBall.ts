import { IGameObject } from 'atari-monk-game-api-lib';
import { IBallModel } from '../model/IBallModel';
import { IToString } from './IToString';

export interface IBall extends IGameObject, IToString {
  model: IBallModel;
  bounce(): void;
  emittVelocity(): void;
}

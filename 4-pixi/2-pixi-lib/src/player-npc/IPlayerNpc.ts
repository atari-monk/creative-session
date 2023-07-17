import { IGameObject } from 'atari-monk-game-api-lib';
import { IPlayerNpcModel } from '../model/IPlayerNpcModel';

export interface IPlayerNpc extends IGameObject {
  model: IPlayerNpcModel;
}

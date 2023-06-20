import { PlayerObject, BasicRenderer, PlayerComputation } from './index';
import { IPlayerOptions } from './data/configTypes';

interface IPlayerDeps {
  renderer: BasicRenderer;
  computation: PlayerComputation;
  playerOptions: IPlayerOptions;
}

export function getPlayer(options: IPlayerDeps): PlayerObject {
  const { renderer, computation, playerOptions } = options;
  return new PlayerObject(renderer, computation, playerOptions);
}

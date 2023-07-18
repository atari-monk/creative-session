import { inject, injectable } from 'inversify';
import {
  ICreate,
  IGameObjectManager,
  IPlayerNpc,
  IPlayer,
  IBall,
  PlayerTypes,
  PlayerNpcTypes,
  BallTypes,
} from 'atari-monk-game-api-lib';
import { GameObjectManager } from './GameObjectManager';

@injectable()
export class ObjectManagerCreator implements ICreate<void> {
  constructor(
    @inject(PlayerTypes.Player) private readonly player: IPlayer,
    @inject(PlayerNpcTypes.Player) private readonly playerNpc: IPlayerNpc,
    @inject(BallTypes.Ball) private readonly ball: IBall,
    @inject(GameObjectManager)
    private readonly gameObjsManager: IGameObjectManager
  ) {}

  create(): void {
    this.gameObjsManager.addGameObject(this.player);
    this.gameObjsManager.addGameObject(this.playerNpc);
    this.gameObjsManager.addGameObject(this.ball);
  }
}

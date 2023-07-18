import { inject, injectable } from 'inversify';
import {
  ICreate,
  IGameObjectManager,
  IPlayerNpc,
  IPlayer,
  IBall,
} from 'atari-monk-game-api-lib';
import { Player } from '../player/Player';
import { GameObjectManager } from './GameObjectManager';
import { PlayerNpc } from '../player-npc/PlayerNpc';
import { Ball } from '../ball/Ball';

@injectable()
export class ObjectManagerCreator implements ICreate<void> {
  constructor(
    @inject(Player) private readonly player: IPlayer,
    @inject(PlayerNpc) private readonly playerNpc: IPlayerNpc,
    @inject(Ball) private readonly ball: IBall,
    @inject(GameObjectManager)
    private readonly gameObjsManager: IGameObjectManager
  ) {}

  create(): void {
    this.gameObjsManager.addGameObject(this.player);
    this.gameObjsManager.addGameObject(this.playerNpc);
    this.gameObjsManager.addGameObject(this.ball);
  }
}

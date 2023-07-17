import { inject, injectable } from 'inversify';
import { Player } from '../player/Player';
import { ICreate } from '../factory/ICreate';
import { IPlayer } from '../player/IPlayer';
import { GameObjectManager } from './GameObjectManager';
import { IGameObjectManager } from './IGameObjectManager';
import { PlayerNpc } from '../player-npc/PlayerNpc';
import { IPlayerNpc } from '../player-npc/IPlayerNpc';
import { Ball } from '../ball/Ball';
import { IBall } from '../ball/IBall';

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

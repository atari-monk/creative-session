import { inject, injectable } from 'inversify';
import { IPlayer, IPlayerNpc, Player, PlayerNpc } from 'atari-monk-pixi-lib';
import { IPlayerManager } from '../../IPlayerManager';
import { PlayerManager } from '../../PlayerManager';
import { ICreate } from 'atari-monk-pixi-lib/factory/ICreate';

@injectable()
export class PlayerManagerCreator implements ICreate<IPlayerManager> {
  constructor(
    @inject(Player)
    private readonly player: IPlayer,
    @inject(PlayerNpc)
    private readonly playerNpc: IPlayerNpc,
    @inject(PlayerManager)
    private readonly playerManager: IPlayerManager
  ) {}

  public create(): IPlayerManager {
    this.playerManager.addPlayer('0', this.player);
    this.playerManager.addPlayerNpc('0', this.playerNpc);
    return this.playerManager;
  }
}

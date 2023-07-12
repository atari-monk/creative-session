import { inject, injectable } from 'inversify';
import { SocketLogicManager } from 'atari-monk-pixi-lib';
import { ICreate } from 'atari-monk-pixi-lib/factory/ICreate';
import { PlayerConnectLogic } from '../../socket-logic/PlayerConnectLogic';
import { PlayerList } from '../../socket-logic/PlayerList';
import { PlayerMovement } from '../../socket-logic/PlayerMovement';

@injectable()
export class PlayerLogicCreator implements ICreate<SocketLogicManager> {
  constructor(
    @inject(PlayerConnectLogic)
    private readonly playerConnect: PlayerConnectLogic,
    @inject(PlayerList)
    private readonly playerList: PlayerList,
    @inject(PlayerMovement)
    private readonly playerMovement: PlayerMovement,
    @inject(SocketLogicManager)
    private readonly playerLogicManager: SocketLogicManager
  ) {}

  public create(): SocketLogicManager {
    this.playerLogicManager.addLogic(this.playerConnect);
    this.playerLogicManager.addLogic(this.playerList);
    this.playerLogicManager.addLogic(this.playerMovement);
    return this.playerLogicManager;
  }
}

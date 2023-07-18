import { inject, injectable } from 'inversify';
import { ICreate } from 'atari-monk-game-api-lib';
import { PlayerConnectLogic } from '../../socket-logic/PlayerConnectLogic';
import { PlayerList } from '../../socket-logic/PlayerList';
import { PlayerMovement } from '../../socket-logic/PlayerMovement';
import { SocketLogicManager } from '../../lib/socket-logic/SocketLogicManager';

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

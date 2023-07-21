import { inject, injectable } from 'inversify';
import { ICreate } from 'atari-monk-game-api-lib';
import { Types } from './types';
import { DisconnectLogicUnit } from '../DisconnectLogicUnit';
import { PlayerMovement } from '../PlayerMovement';
import { BallMovement } from '../BallMovement';
import { BallVelocity } from '../BallVelocity';
import { SrvSctLogicManager } from '../lib/srv-sct-logic/SrvSctLogicManager';

@injectable()
export class ServerLogicCreator implements ICreate<void> {
  constructor(
    @inject(Types.SrvSctLogicManager)
    private readonly logicManager: SrvSctLogicManager,
    @inject(Types.DisconnectLogic)
    private readonly disconnectLogic: DisconnectLogicUnit,
    @inject(Types.PlayerMovement)
    private readonly playerMovement: PlayerMovement,
    @inject(Types.BallMovement) private readonly ballMovement: BallMovement,
    @inject(Types.BallVelocity) private readonly ballVelocity: BallVelocity
  ) {}

  public create() {
    this.logicManager.addLogic(this.disconnectLogic);
    this.logicManager.addLogic(this.playerMovement);
    this.logicManager.addLogic(this.ballMovement);
    this.logicManager.addLogic(this.ballVelocity);
  }
}

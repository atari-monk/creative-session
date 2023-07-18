import { inject, injectable } from 'inversify';
import { ICreate } from 'atari-monk-game-api-lib';
import { BallMovement } from '../../socket-logic/BallMovement';
import { BallVelocity } from '../../socket-logic/BallVelocity';
import { SocketLogicManager } from '../../lib/socket-logic/SocketLogicManager';

@injectable()
export class BallLogicCreator implements ICreate<SocketLogicManager> {
  constructor(
    @inject(BallMovement)
    private readonly ballMovement: BallMovement,
    @inject(BallVelocity)
    private readonly ballVelocity: BallVelocity,
    @inject(SocketLogicManager)
    private readonly ballLogicManager: SocketLogicManager
  ) {}

  public create(): SocketLogicManager {
    this.ballLogicManager.addLogic(this.ballMovement);
    this.ballLogicManager.addLogic(this.ballVelocity);
    return this.ballLogicManager;
  }
}

import { SocketLogicManager } from 'atari-monk-pixi-lib';
import { ICreate } from 'atari-monk-pixi-lib/factory/ICreate';
import { inject, injectable } from 'inversify';
import { BallMovement } from '../../socket-logic/BallMovement';
import { BallVelocity } from '../../socket-logic/BallVelocity';

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

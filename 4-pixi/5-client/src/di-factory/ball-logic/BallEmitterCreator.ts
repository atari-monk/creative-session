import { inject, injectable } from 'inversify';
import { BallEventEmitterLogicUnit } from '../../emitter-logic/BallEventEmitterLogicUnit';
import { BallTypes, ICreate } from 'atari-monk-game-api-lib';
import { EventEmitterLogicManager } from '../../lib/emitter-logic/EventEmitterLogicManager';

@injectable()
export class BallEmitterCreator implements ICreate<EventEmitterLogicManager> {
  constructor(
    @inject(EventEmitterLogicManager)
    private readonly ballEmitterLogicManager: EventEmitterLogicManager,
    @inject(BallTypes.MovementEmitter)
    private readonly ballMovement: BallEventEmitterLogicUnit,
    @inject(BallTypes.VelocityEmitter)
    private readonly ballVelocity: BallEventEmitterLogicUnit
  ) {}

  public create(): EventEmitterLogicManager {
    this.ballEmitterLogicManager.addLogic(this.ballMovement);
    this.ballEmitterLogicManager.addLogic(this.ballVelocity);
    return this.ballEmitterLogicManager;
  }
}

import { EventEmitterLogicManager } from 'atari-monk-pixi-lib';
import { ICreate } from 'atari-monk-pixi-lib/factory/ICreate';
import { inject, injectable } from 'inversify';
import { BallEventEmitterLogicUnit } from '../../emitter-logic/BallEventEmitterLogicUnit';
import { BallTypes } from '../types';

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

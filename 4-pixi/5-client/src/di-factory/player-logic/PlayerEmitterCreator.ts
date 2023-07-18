import { inject, injectable } from 'inversify';
import { ICreate } from 'atari-monk-game-api-lib';
import { PlayerEventEmitterLogicUnit } from '../../emitter-logic/PlayerEventEmitterLogicUnit';
import { EventEmitterLogicManager } from '../../lib/emitter-logic/EventEmitterLogicManager';

@injectable()
export class PlayerEmitterCreator implements ICreate<EventEmitterLogicManager> {
  constructor(
    @inject(EventEmitterLogicManager)
    private readonly playerEmitterLogicManager: EventEmitterLogicManager,
    @inject(PlayerEventEmitterLogicUnit)
    private readonly playerEmittMovement: PlayerEventEmitterLogicUnit
  ) {}

  public create(): EventEmitterLogicManager {
    this.playerEmitterLogicManager.addLogic(this.playerEmittMovement);
    return this.playerEmitterLogicManager;
  }
}

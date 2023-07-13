import { inject, injectable } from 'inversify';
import { EventEmitterLogicManager } from 'atari-monk-pixi-lib';
import { ICreate } from 'atari-monk-pixi-lib/factory/ICreate';
import { PlayerEventEmitterLogicUnit } from '../../emitter-logic/PlayerEventEmitterLogicUnit';

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

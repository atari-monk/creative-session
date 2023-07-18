import { Container } from 'inversify';
import {
  IBasicRenderer,
  IRegister,
  IGameObjectManager,
  SharedTypes,
  EventEmitter,
} from 'atari-monk-game-api-lib';
import { BasicRenderer } from '../BasicRenderer';
import { GameObjectManager } from '../game-obj/GameObjectManager';

export class ServiceFactory implements IRegister {
  constructor(public readonly container: Container) {}

  public register() {
    this.container
      .bind<IBasicRenderer>(SharedTypes.BasicRenderer)
      .to(BasicRenderer)
      .inSingletonScope();

    this.container
      .bind<EventEmitter>(EventEmitter)
      .toConstantValue(new EventEmitter());

    this.container
      .bind<IGameObjectManager>(SharedTypes.GameObjsManager)
      .to(GameObjectManager)
      .inSingletonScope();
  }
}

import { Container } from 'inversify';
import { SharedTypes } from '../di-container/types';
import { IBasicRenderer } from '../IBasicRenderer';
import { BasicRenderer } from '../BasicRenderer';
import { IRegister } from '../factory/IRegister';
import { IGameObjectManager } from '../game-obj/IGameObjectManager';
import { GameObjectManager } from '../game-obj/GameObjectManager';
import { EventEmitter } from './EventEmitter';

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

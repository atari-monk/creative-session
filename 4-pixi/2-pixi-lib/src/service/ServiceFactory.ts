import { Container } from 'inversify';
import { SharedTypes } from '../di-container/types';
import { IBasicRenderer } from '../IBasicRenderer';
import { BasicRenderer } from '../BasicRenderer';
import EventEmitter from 'eventemitter3';
import { IRegister } from '../factory/IRegister';
import { IGameObjectManager } from '../gameObject/IGameObjectManager';
import { GameObjectManager } from '../gameObject/GameObjectManager';

export class ServiceFactory implements IRegister {
  constructor(public readonly container: Container) {}

  public register() {
    this.container
      .bind<IBasicRenderer>(SharedTypes.BasicRenderer)
      .to(BasicRenderer)
      .inSingletonScope();

    this.container
      .bind<EventEmitter>(SharedTypes.EventEmitter)
      .toConstantValue(new EventEmitter());

    this.container
      .bind<IGameObjectManager>(SharedTypes.GameObjsManager)
      .to(GameObjectManager);
  }
}

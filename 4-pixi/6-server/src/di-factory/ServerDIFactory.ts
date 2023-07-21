import { IDIFactory } from 'atari-monk-game-api-lib';
import { injectable, Container } from 'inversify';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { GameServer } from '../GameServer';
import { SrvSctLogicManager } from '../lib/srv-sct-logic/SrvSctLogicManager';
import { ClientManager } from '../ClientManager';
import { DisconnectLogicUnit } from '../DisconnectLogicUnit';
import { PlayerMovement } from '../PlayerMovement';
import { BallMovement } from '../BallMovement';
import { BallVelocity } from '../BallVelocity';
import { ClientConnectionHandler } from '../ClientConnectionHandler';
import { Types } from './types';
import { ServerLogicCreator } from './ServerLogicCreator';

@injectable()
export class ServerDIFactory implements IDIFactory<GameServer> {
  private readonly container: Container;

  constructor() {
    this.container = new Container();
    this.register();
  }

  public register() {
    this.registerServers();
    this.registerLogic();
    this.registerConnectionLogic();
  }

  private registerServers() {
    this.container
      .bind<express.Application>(Types.Server)
      .toConstantValue(express());
    this.container
      .bind<http.Server>(Types.ServerHttp)
      .toConstantValue(
        http.createServer(this.container.get<express.Application>(Types.Server))
      );
    this.container.bind<Server>(Types.ServerIO).toConstantValue(
      new Server(this.container.get<http.Server>(Types.ServerHttp), {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
          allowedHeaders: ['Content-Type'],
        },
      })
    );
    this.container
      .bind<GameServer>(Types.GameServer)
      .to(GameServer)
      .inSingletonScope();
  }

  private registerLogic() {
    this.container
      .bind<SrvSctLogicManager>(Types.SrvSctLogicManager)
      .to(SrvSctLogicManager)
      .inSingletonScope();
    this.container
      .bind<ClientManager>(Types.ClientManager)
      .to(ClientManager)
      .inSingletonScope();
    this.container
      .bind<DisconnectLogicUnit>(Types.DisconnectLogic)
      .toDynamicValue(
        () =>
          new DisconnectLogicUnit(
            'disconnect',
            this.container.get<ClientManager>(Types.ClientManager)
          )
      )
      .inSingletonScope();
    this.container
      .bind<PlayerMovement>(Types.PlayerMovement)
      .toDynamicValue(() => new PlayerMovement('movement'))
      .inSingletonScope();
    this.container
      .bind<BallMovement>(Types.BallMovement)
      .toDynamicValue(() => new BallMovement('ballMovement'))
      .inSingletonScope();
    this.container
      .bind<BallVelocity>(Types.BallVelocity)
      .toDynamicValue(() => new BallVelocity('ballVelocity'))
      .inSingletonScope();
    this.container
      .bind<ServerLogicCreator>(Types.ServerLogicCreator)
      .to(ServerLogicCreator)
      .inSingletonScope();
  }

  private registerConnectionLogic() {
    this.container
      .bind<ClientConnectionHandler>(Types.ClientConnectionHandler)
      .toDynamicValue(
        () =>
          new ClientConnectionHandler(
            'connection',
            this.container.get<Server>(Types.ServerIO),
            this.container.get<ClientManager>(Types.ClientManager),
            this.container.get<SrvSctLogicManager>(Types.SrvSctLogicManager),
            2
          )
      )
      .inSingletonScope();
  }

  create(): GameServer {
    const gameServer = this.container.get<GameServer>(Types.GameServer);
    const serverLogicCreator = this.container.get<ServerLogicCreator>(
      Types.ServerLogicCreator
    );
    serverLogicCreator.create();
    const clientConnectionHandler = this.container.get<ClientConnectionHandler>(
      Types.ClientConnectionHandler
    );
    clientConnectionHandler.initializeServer(
      this.container.get<Server>(Types.ServerIO)
    );
    return gameServer;
  }
}

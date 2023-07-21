import { ICreate } from 'atari-monk-game-api-lib';
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

export class ServerSimpleFactory implements ICreate<GameServer> {
  create(): GameServer {
    const { server, gameServer } = this.createServers();
    this.createLogic(server);
    return gameServer;
  }

  createServers() {
    const app = express();
    const serverHttp = http.createServer(app);
    const optionsSIO = {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
      },
    };
    const server = new Server(serverHttp, optionsSIO);
    const gameServer = new GameServer(app, serverHttp);
    return { server, gameServer };
  }

  private createLogic(server: Server) {
    const srvSctLogicManager = new SrvSctLogicManager();
    const clientManager = new ClientManager();
    const disconnectLogic = new DisconnectLogicUnit(
      'disconnect',
      clientManager
    );
    const playerMovement = new PlayerMovement('movement');
    const ballMovement = new BallMovement('ballMovement');
    const ballVelocity = new BallVelocity('ballVelocity');

    srvSctLogicManager.addLogic(disconnectLogic);
    srvSctLogicManager.addLogic(playerMovement);
    srvSctLogicManager.addLogic(ballMovement);
    srvSctLogicManager.addLogic(ballVelocity);

    this.createConnectionLogic(server, clientManager, srvSctLogicManager);
  }

  private createConnectionLogic(
    server: Server,
    clientManager: ClientManager,
    srvSctLogicManager: SrvSctLogicManager
  ) {
    const clientConnectionHandler = new ClientConnectionHandler(
      'connection',
      server,
      clientManager,
      srvSctLogicManager,
      2
    );
    clientConnectionHandler.initializeServer(server);
  }
}

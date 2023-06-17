import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { GameServer } from './GameServer';
import { ClientConnectionHandler } from './ClientConnectionHandler';
import { BallMovement } from './BallMovement';
import { SrvSctLogicManager } from './srv-sct-logic/SrvSctLogicManager';
import { BallVelocity } from './BallVelocity';
import { PlayerMovement } from './PlayerMovement';
import { ClientManager } from './ClientManager';
import { DisconnectLogicUnit } from './DisconnectLogicUnit';

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
const srvSctLogicManager = new SrvSctLogicManager();
const clientManager = new ClientManager();
const disconnectLogic = new DisconnectLogicUnit('disconnect', clientManager);
const playerMovement = new PlayerMovement('movement');
const ballMovement = new BallMovement('ballMovement');
const ballVelocity = new BallVelocity('ballVelocity');
srvSctLogicManager.addLogic(disconnectLogic);
srvSctLogicManager.addLogic(playerMovement);
srvSctLogicManager.addLogic(ballMovement);
srvSctLogicManager.addLogic(ballVelocity);
const clientConnectionHandler = new ClientConnectionHandler(
  'connection',
  server,
  clientManager,
  srvSctLogicManager,
  2
);
clientConnectionHandler.initializeServer(server);
const gameServer = new GameServer(app, serverHttp);
gameServer.start();

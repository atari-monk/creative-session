import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { GameServer } from './GameServer';
import { ClientConnectionHandler } from './ClientConnectionHandler';
import { BallMovement } from './BallMovement';
import { SrvSctLogicManager } from './srv-sct-logic/SrvSctLogicManager';

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
const ballMovement = new BallMovement('ballMovement');
srvSctLogicManager.addLogic(ballMovement);
const clientConnectionHandler = new ClientConnectionHandler(
  server,
  srvSctLogicManager,
  2,
  1000
);
clientConnectionHandler.initializeServer(server);
const gameServer = new GameServer(app, serverHttp);
gameServer.start();

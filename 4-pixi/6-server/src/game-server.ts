import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { GameServer } from './GameServer';
import { ClientConnectionHandler } from './ClientConnectionHandler';

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
const clientConnectionHandler = new ClientConnectionHandler(server, 2, 1000);
clientConnectionHandler.initializeServer(server);
const gameServer = new GameServer(app, serverHttp);
gameServer.start();

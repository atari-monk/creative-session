import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { GameServer } from './GameServer';
import { ClientConnectionHandler } from './ClientConnectionHandler';

const app = express();
const server = http.createServer(app);
const optionsSIO = {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  },
};
const serverSIO = new SocketIOServer(server, optionsSIO);
const clientConnectionHandler = new ClientConnectionHandler(serverSIO, 2, 1000);
const gameServer = new GameServer(
  app,
  server,
  serverSIO,
  clientConnectionHandler
);
gameServer.start();

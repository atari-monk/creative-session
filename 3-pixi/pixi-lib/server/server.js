/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

class GameServer {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.ioOptions = {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
      },
    };
    this.io = socketIO(this.server, this.ioOptions);
    this.PORT = process.env.PORT || 3000;
    this.clients = {};
  }

  start() {
    this.configureMiddleware();
    this.configureSocketIO();
    this.listen();
  }

  configureMiddleware() {
    this.app.use(cors());
  }

  configureSocketIO() {
    this.io.on('connection', (socket) => {
      this.handleClientConnection(socket);
    });
  }

  handleClientConnection(socket) {
    console.log('A user connected');

    const clientId = this.generateClientId(socket);
    this.storeClient(clientId, socket);
    this.handleClientDisconnection(clientId);
    this.handlePlayerMovement(socket);

    const clientIdList = this.getClientIdList();
    this.emitClientIdList(clientIdList);

    // Other game-related events and logic can be implemented here
  }

  generateClientId(socket) {
    return socket.id;
  }

  storeClient(clientId, socket) {
    this.clients[clientId] = { socket };
  }

  handleClientDisconnection(clientId) {
    this.clients[clientId].socket.on('disconnect', () => {
      console.log('A user disconnected');
      delete this.clients[clientId];
    });
  }

  handlePlayerMovement(socket) {
    socket.on('movement', ({ clientId, newPosition }) => {
      socket.broadcast.emit('movement', { clientId, newPosition });
    });
  }

  getClientIdList() {
    return Object.keys(this.clients);
  }

  emitClientIdList(clientIdList) {
    this.io.emit('clientIdList', clientIdList);
  }

  listen() {
    this.server.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`);
    });
  }
}

const gameServer = new GameServer();
gameServer.start();

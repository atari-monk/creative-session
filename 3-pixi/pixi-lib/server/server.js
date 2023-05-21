/* eslint-disable no-undef */
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

class GameServer {
  #app;
  #server;
  #ioOptions;
  #io;
  #PORT;
  #clients;
  #isLogging;

  constructor() {
    this.#app = express();
    this.#server = http.createServer(this.#app);
    this.#ioOptions = {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type'],
      },
    };
    this.#io = socketIO(this.#server, this.#ioOptions);
    this.#PORT = process.env.PORT || 3000;
    this.#clients = {};
    this.#isLogging = true;
  }

  start() {
    this.#configureMiddleware();
    this.#configureSocketIO();
    this.#listen();
  }

  #configureMiddleware() {
    this.#app.use(cors());
  }

  #configureSocketIO() {
    this.#io.on('connection', (socket) => {
      this.#handleClientConnection(socket);
    });
  }

  #handleClientConnection(socket) {
    const clientId = this.#generateClientId(socket);
    this.#storeClient(clientId, socket);
    this.#handleClientDisconnection(clientId);
    this.#handlePlayerMovement(socket);

    this.#emitClientIdList(this.#getClientIdList());
    this.#logClientsArray();
  }

  #generateClientId(socket) {
    return socket.id;
  }

  #storeClient(clientId, socket) {
    this.#clients[clientId] = { socket };
  }

  #handleClientDisconnection(clientId) {
    this.#clients[clientId].socket.on('disconnect', () => {
      delete this.#clients[clientId];
      this.#logClientsArray();
    });
  }

  #handlePlayerMovement(socket) {
    socket.on('movement', ({ clientId, newPosition }) => {
      socket.broadcast.emit('movement', { clientId, newPosition });
    });
  }

  #getClientIdList() {
    return Object.keys(this.#clients);
  }

  #emitClientIdList(clientIdList) {
    this.#io.emit('clientIdList', clientIdList);
  }

  #listen() {
    this.#server.listen(this.#PORT, () => {
      this.#log(`Server is running on port ${this.#PORT}`);
    });
  }

  #log(message) {
    if (this.#isLogging) {
      console.log(message);
    }
  }

  #logClientsArray() {
    if (this.#isLogging) {
      const clientsArray = this.#getClientIdList().map((clientId) => ({
        clientId,
      }));
      console.log('Clients Array:', clientsArray);
    }
  }
}

const gameServer = new GameServer();
gameServer.start();

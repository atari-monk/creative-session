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
  #playerLimit;
  #delayDisconnect;

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
    this.#playerLimit = 2;
    this.#delayDisconnect = 1000;
  }

  start() {
    this.#configureMiddleware();
    this.#configureSocketIO();
    this.#listen();
  }

  setPlayerLimit(limit) {
    if (typeof limit === 'number' && limit > 0) {
      this.#playerLimit = limit;
      this.#log(`Player limit set to ${limit}`);
    } else {
      this.#log('Invalid player limit. Please provide a positive number.');
    }
  }

  #configureMiddleware() {
    this.#app.use(cors());
  }

  #configureSocketIO() {
    this.#io.on('connection', (socket) => {
      if (this.#getClientCount() < this.#playerLimit) {
        this._handleClientConnection(socket);
      } else {
        socket.disconnect();
        this.#log('Disconnected player exceeding the limit');
      }
    });
  }

  _handleClientConnection(socket) {
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
    this.#clients[clientId] = { socket, state: 'Connecting' };
  }

  #handleClientDisconnection(clientId) {
    this.#clients[clientId].socket.on('disconnect', () => {
      this.#clients[clientId].state = 'Disconnecting';
      setTimeout(() => {
        delete this.#clients[clientId];
        this.#logClientsArray();
      }, this.#delayDisconnect);
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

  #getClientCount() {
    return Object.keys(this.#clients).length;
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
        state: this.#clients[clientId].state,
      }));
      console.log('Clients Array:', clientsArray);
    }
  }
}

module.exports = { GameServer };

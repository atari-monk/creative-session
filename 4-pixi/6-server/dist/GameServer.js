"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
class GameServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = http_1.default.createServer(this.app);
        this.ioOptions = {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
                allowedHeaders: ['Content-Type'],
            },
        };
        this.io = new socket_io_1.Server(this.server, this.ioOptions);
        this.PORT = process.env.PORT || 3000;
        this.clients = {};
        this.isLogging = true;
        this.playerLimit = 2;
        this.delayDisconnect = 1000;
    }
    start() {
        this.configureMiddleware();
        this.configureSocketIO();
        this.listen();
    }
    setPlayerLimit(limit) {
        if (typeof limit === 'number' && limit > 0) {
            this.playerLimit = limit;
            this.log(`Player limit set to ${limit}`);
        }
        else {
            this.log('Invalid player limit. Please provide a positive number.');
        }
    }
    configureMiddleware() {
        this.app.use((0, cors_1.default)());
    }
    configureSocketIO() {
        this.io.on('connection', (socket) => {
            if (this.getClientCount() < this.playerLimit) {
                this.handleClientConnection(socket);
            }
            else {
                socket.disconnect();
                this.log('Disconnected player exceeding the limit');
            }
        });
    }
    handleClientConnection(socket) {
        const clientId = this.generateClientId(socket);
        this.storeClient(clientId, socket);
        this.handleClientDisconnection(clientId);
        this.handlePlayerMovement(socket);
        this.emitClientIdList(this.getClientIdList());
        this.logClientsArray();
    }
    generateClientId(socket) {
        return socket.id;
    }
    storeClient(clientId, socket) {
        this.clients[clientId] = { socket, state: 'Connecting' };
    }
    handleClientDisconnection(clientId) {
        this.clients[clientId].socket.on('disconnect', () => {
            this.clients[clientId].state = 'Disconnecting';
            setTimeout(() => {
                delete this.clients[clientId];
                this.logClientsArray();
            }, this.delayDisconnect);
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
    getClientCount() {
        return Object.keys(this.clients).length;
    }
    listen() {
        this.server.listen(this.PORT, () => {
            this.log(`Server is running on port ${this.PORT}`);
        });
    }
    log(message) {
        if (this.isLogging) {
            console.log(message);
        }
    }
    logClientsArray() {
        if (this.isLogging) {
            const clientsArray = this.getClientIdList().map((clientId) => ({
                clientId,
                state: this.clients[clientId].state,
            }));
            console.log('Clients Array:', clientsArray);
        }
    }
}
exports.GameServer = GameServer;

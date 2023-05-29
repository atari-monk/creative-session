"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BallGameServer = void 0;
const GameServer_1 = require("./GameServer");
class BallGameServer extends GameServer_1.GameServer {
    constructor() {
        super();
    }
    handleBallMovement(socket) {
        socket.on('ballMovement', ({ newPosition }) => {
            socket.broadcast.emit('ballMovement', { newPosition });
        });
    }
    handleBallVelocity(socket) {
        socket.on('ballVelocity', ({ newVelocity }) => {
            socket.broadcast.emit('ballVelocity', { newVelocity });
        });
    }
    handleClientConnection(socket) {
        super.handleClientConnection(socket);
        this.handleBallMovement(socket);
        this.handleBallVelocity(socket);
    }
}
exports.BallGameServer = BallGameServer;

"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BallGameServer_instances, _BallGameServer_handleBallMovement, _BallGameServer_handleBallVelocity;
const { GameServer } = require('./GameServer');
class BallGameServer extends GameServer {
    constructor() {
        super();
        _BallGameServer_instances.add(this);
    }
    _handleClientConnection(socket) {
        super._handleClientConnection(socket);
        __classPrivateFieldGet(this, _BallGameServer_instances, "m", _BallGameServer_handleBallMovement).call(this, socket);
        __classPrivateFieldGet(this, _BallGameServer_instances, "m", _BallGameServer_handleBallVelocity).call(this, socket);
    }
}
_BallGameServer_instances = new WeakSet(), _BallGameServer_handleBallMovement = function _BallGameServer_handleBallMovement(socket) {
    socket.on('ballMovement', ({ newPosition }) => {
        socket.broadcast.emit('ballMovement', { newPosition });
    });
}, _BallGameServer_handleBallVelocity = function _BallGameServer_handleBallVelocity(socket) {
    socket.on('ballVelocity', ({ newVelocity }) => {
        socket.broadcast.emit('ballVelocity', { newVelocity });
    });
};
module.exports = { BallGameServer };

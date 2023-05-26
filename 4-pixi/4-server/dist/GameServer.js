"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _GameServer_instances, _GameServer_app, _GameServer_server, _GameServer_ioOptions, _GameServer_io, _GameServer_PORT, _GameServer_clients, _GameServer_isLogging, _GameServer_playerLimit, _GameServer_delayDisconnect, _GameServer_configureMiddleware, _GameServer_configureSocketIO, _GameServer_generateClientId, _GameServer_storeClient, _GameServer_handleClientDisconnection, _GameServer_handlePlayerMovement, _GameServer_getClientIdList, _GameServer_emitClientIdList, _GameServer_getClientCount, _GameServer_listen, _GameServer_log, _GameServer_logClientsArray;
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
class GameServer {
    constructor() {
        _GameServer_instances.add(this);
        _GameServer_app.set(this, void 0);
        _GameServer_server.set(this, void 0);
        _GameServer_ioOptions.set(this, void 0);
        _GameServer_io.set(this, void 0);
        _GameServer_PORT.set(this, void 0);
        _GameServer_clients.set(this, void 0);
        _GameServer_isLogging.set(this, void 0);
        _GameServer_playerLimit.set(this, void 0);
        _GameServer_delayDisconnect.set(this, void 0);
        __classPrivateFieldSet(this, _GameServer_app, express(), "f");
        __classPrivateFieldSet(this, _GameServer_server, http.createServer(__classPrivateFieldGet(this, _GameServer_app, "f")), "f");
        __classPrivateFieldSet(this, _GameServer_ioOptions, {
            cors: {
                origin: '*',
                methods: ['GET', 'POST'],
                allowedHeaders: ['Content-Type'],
            },
        }, "f");
        __classPrivateFieldSet(this, _GameServer_io, socketIO(__classPrivateFieldGet(this, _GameServer_server, "f"), __classPrivateFieldGet(this, _GameServer_ioOptions, "f")), "f");
        __classPrivateFieldSet(this, _GameServer_PORT, process.env.PORT || 3000, "f");
        __classPrivateFieldSet(this, _GameServer_clients, {}, "f");
        __classPrivateFieldSet(this, _GameServer_isLogging, true, "f");
        __classPrivateFieldSet(this, _GameServer_playerLimit, 2, "f");
        __classPrivateFieldSet(this, _GameServer_delayDisconnect, 1000, "f");
    }
    start() {
        __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_configureMiddleware).call(this);
        __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_configureSocketIO).call(this);
        __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_listen).call(this);
    }
    setPlayerLimit(limit) {
        if (typeof limit === 'number' && limit > 0) {
            __classPrivateFieldSet(this, _GameServer_playerLimit, limit, "f");
            __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_log).call(this, `Player limit set to ${limit}`);
        }
        else {
            __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_log).call(this, 'Invalid player limit. Please provide a positive number.');
        }
    }
    _handleClientConnection(socket) {
        const clientId = __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_generateClientId).call(this, socket);
        __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_storeClient).call(this, clientId, socket);
        __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_handleClientDisconnection).call(this, clientId);
        __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_handlePlayerMovement).call(this, socket);
        __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_emitClientIdList).call(this, __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_getClientIdList).call(this));
        __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_logClientsArray).call(this);
    }
}
_GameServer_app = new WeakMap(), _GameServer_server = new WeakMap(), _GameServer_ioOptions = new WeakMap(), _GameServer_io = new WeakMap(), _GameServer_PORT = new WeakMap(), _GameServer_clients = new WeakMap(), _GameServer_isLogging = new WeakMap(), _GameServer_playerLimit = new WeakMap(), _GameServer_delayDisconnect = new WeakMap(), _GameServer_instances = new WeakSet(), _GameServer_configureMiddleware = function _GameServer_configureMiddleware() {
    __classPrivateFieldGet(this, _GameServer_app, "f").use(cors());
}, _GameServer_configureSocketIO = function _GameServer_configureSocketIO() {
    __classPrivateFieldGet(this, _GameServer_io, "f").on('connection', (socket) => {
        if (__classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_getClientCount).call(this) < __classPrivateFieldGet(this, _GameServer_playerLimit, "f")) {
            this._handleClientConnection(socket);
        }
        else {
            socket.disconnect();
            __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_log).call(this, 'Disconnected player exceeding the limit');
        }
    });
}, _GameServer_generateClientId = function _GameServer_generateClientId(socket) {
    return socket.id;
}, _GameServer_storeClient = function _GameServer_storeClient(clientId, socket) {
    __classPrivateFieldGet(this, _GameServer_clients, "f")[clientId] = { socket, state: 'Connecting' };
}, _GameServer_handleClientDisconnection = function _GameServer_handleClientDisconnection(clientId) {
    __classPrivateFieldGet(this, _GameServer_clients, "f")[clientId].socket.on('disconnect', () => {
        __classPrivateFieldGet(this, _GameServer_clients, "f")[clientId].state = 'Disconnecting';
        setTimeout(() => {
            delete __classPrivateFieldGet(this, _GameServer_clients, "f")[clientId];
            __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_logClientsArray).call(this);
        }, __classPrivateFieldGet(this, _GameServer_delayDisconnect, "f"));
    });
}, _GameServer_handlePlayerMovement = function _GameServer_handlePlayerMovement(socket) {
    socket.on('movement', ({ clientId, newPosition }) => {
        socket.broadcast.emit('movement', { clientId, newPosition });
    });
}, _GameServer_getClientIdList = function _GameServer_getClientIdList() {
    return Object.keys(__classPrivateFieldGet(this, _GameServer_clients, "f"));
}, _GameServer_emitClientIdList = function _GameServer_emitClientIdList(clientIdList) {
    __classPrivateFieldGet(this, _GameServer_io, "f").emit('clientIdList', clientIdList);
}, _GameServer_getClientCount = function _GameServer_getClientCount() {
    return Object.keys(__classPrivateFieldGet(this, _GameServer_clients, "f")).length;
}, _GameServer_listen = function _GameServer_listen() {
    __classPrivateFieldGet(this, _GameServer_server, "f").listen(__classPrivateFieldGet(this, _GameServer_PORT, "f"), () => {
        __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_log).call(this, `Server is running on port ${__classPrivateFieldGet(this, _GameServer_PORT, "f")}`);
    });
}, _GameServer_log = function _GameServer_log(message) {
    if (__classPrivateFieldGet(this, _GameServer_isLogging, "f")) {
        console.log(message);
    }
}, _GameServer_logClientsArray = function _GameServer_logClientsArray() {
    if (__classPrivateFieldGet(this, _GameServer_isLogging, "f")) {
        const clientsArray = __classPrivateFieldGet(this, _GameServer_instances, "m", _GameServer_getClientIdList).call(this).map((clientId) => ({
            clientId,
            state: __classPrivateFieldGet(this, _GameServer_clients, "f")[clientId].state,
        }));
        console.log('Clients Array:', clientsArray);
    }
};
module.exports = { GameServer };

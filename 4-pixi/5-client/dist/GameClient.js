"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameClient = void 0;
const socket_io_client_1 = require("socket.io-client");
class GameClient {
    constructor() {
        this.playerObjs = [];
        this.players = {};
        this.players = {};
        this.setupSocketConnection();
    }
    setupSocketConnection(isInDevEnv = true) {
        this.socket = (0, socket_io_client_1.connect)(isInDevEnv
            ? 'http://localhost:3000'
            : 'https://atari-monk-two-players.azurewebsites.net/');
        this.socket.on('connect', this.handleConnect.bind(this));
        this.socket.on('movement', this.handleMovement.bind(this));
        this.socket.on('disconnect', this.handleDisconnect.bind(this));
        this.socket.on('clientIdList', this.handleClientIdList.bind(this));
        this.socket.on('connect_error', this.handleConnectError.bind(this));
    }
    handleConnect() {
        try {
            this.clientId = this.socket.id;
            const playablePlayer = this.playerObjs.find((player) => player.isPlayable);
            if (!playablePlayer) {
                this.noPlayablePlayerError();
                return;
            }
            playablePlayer.client = this;
            playablePlayer.clientId = this.clientId;
            this.players[this.clientId] = playablePlayer;
            console.log(`Connected to server, id: ${this.clientId}`);
        }
        catch (err) {
            console.error('Connection error:', err.message);
        }
    }
    handleMovement({ clientId, newPosition, }) {
        if (!clientId)
            throw new Error('No clientId data!');
        if (!newPosition)
            throw new Error('No position data!');
        this.updatePlayerPosition(clientId, newPosition);
    }
    handleDisconnect() {
        console.log('Disconnected from server');
    }
    handleClientIdList(clientIdList) {
        const newClientId = clientIdList.find((id) => id !== this.clientId);
        if (!newClientId)
            return;
        const player = this.playerObjs.find((player) => !player.isPlayable);
        if (!player)
            throw new Error('No second player!');
        player.clientId = clientIdList.find((id) => id !== this.clientId);
        this.players[newClientId] = player;
        console.log(`New player connected, id: ${newClientId}'`);
    }
    handleConnectError(error) {
        console.error('Connection error:', error.message);
    }
    noPlayablePlayerError() {
        const message = 'Please write ?player=1 or ?player=2 in the address and refresh the browser to select your player. Otherwise, the game is not possible. Select a player other than your friend.';
        throw new Error(message);
    }
    updatePlayerPosition(clientId, newPosition) {
        const player = this.players[clientId];
        if (!player) {
            throw new Error(`No player with id: ${clientId}`);
        }
        player.setPosition(Object.assign({}, newPosition));
    }
    addPlayerObjs(players) {
        this.playerObjs = players;
    }
    addPlayerObj(player) {
        this.playerObjs.push(player);
    }
    removePlayer(player) {
        delete this.players[player.client.clientId];
    }
    getSocket() {
        return this.socket;
    }
}
exports.GameClient = GameClient;

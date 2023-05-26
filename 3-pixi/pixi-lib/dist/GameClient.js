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
var _GameClient_instances, _GameClient_clientId, _GameClient_playerObjs, _GameClient_players, _GameClient_socket, _GameClient_isLogging, _GameClient_handleConnect, _GameClient_handleMovement, _GameClient_handleDisconnect, _GameClient_handleClientIdList, _GameClient_noPlayablePlayerError, _GameClient_updatePlayerPosition, _GameClient_log;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameClient = void 0;
const io = require("socket.io-client");
class GameClient {
    constructor() {
        _GameClient_instances.add(this);
        _GameClient_clientId.set(this, null);
        _GameClient_playerObjs.set(this, []);
        _GameClient_players.set(this, {});
        _GameClient_socket.set(this, null);
        _GameClient_isLogging.set(this, void 0);
        _GameClient_handleConnect.set(this, () => {
            try {
                __classPrivateFieldSet(this, _GameClient_clientId, __classPrivateFieldGet(this, _GameClient_socket, "f").id, "f");
                const playablePlayer = __classPrivateFieldGet(this, _GameClient_playerObjs, "f").find((player) => player.isPlayable);
                if (!playablePlayer) {
                    __classPrivateFieldGet(this, _GameClient_instances, "m", _GameClient_noPlayablePlayerError).call(this);
                    return;
                }
                playablePlayer.client = this;
                playablePlayer.clientId = __classPrivateFieldGet(this, _GameClient_clientId, "f");
                __classPrivateFieldGet(this, _GameClient_players, "f")[__classPrivateFieldGet(this, _GameClient_clientId, "f")] = playablePlayer;
                __classPrivateFieldGet(this, _GameClient_instances, "m", _GameClient_log).call(this, `Connected to server, id: ${__classPrivateFieldGet(this, _GameClient_clientId, "f")}`);
            }
            catch (err) {
                console.error('Connection error:', err.message);
            }
        });
        _GameClient_handleMovement.set(this, ({ clientId, newPosition }) => {
            if (!clientId)
                throw new Error('No clientId data!');
            if (!newPosition)
                throw new Error('No possition data!');
            __classPrivateFieldGet(this, _GameClient_instances, "m", _GameClient_updatePlayerPosition).call(this, clientId, newPosition);
        });
        _GameClient_handleDisconnect.set(this, () => {
            __classPrivateFieldGet(this, _GameClient_instances, "m", _GameClient_log).call(this, 'Disconnected from server');
        });
        _GameClient_handleClientIdList.set(this, (clientIdList) => {
            const newClinetId = clientIdList.find((id) => id !== __classPrivateFieldGet(this, _GameClient_clientId, "f"));
            if (!newClinetId)
                return;
            const player = __classPrivateFieldGet(this, _GameClient_playerObjs, "f").find((player) => !player.isPlayable);
            if (!player)
                throw new Error('No second player!');
            player.clientId = clientIdList.find((id) => id !== __classPrivateFieldGet(this, _GameClient_clientId, "f"));
            __classPrivateFieldGet(this, _GameClient_players, "f")[newClinetId] = player;
            __classPrivateFieldGet(this, _GameClient_instances, "m", _GameClient_log).call(this, `New player connected, id: ${newClinetId}'`);
        });
        this._setupSocketConnection();
        __classPrivateFieldSet(this, _GameClient_players, {}, "f");
        __classPrivateFieldSet(this, _GameClient_isLogging, true, "f");
    }
    _setupSocketConnection(isInDevEnv = true) {
        // eslint-disable-next-line no-undef
        __classPrivateFieldSet(this, _GameClient_socket, io.connect(isInDevEnv
            ? 'http://localhost:3000'
            : 'https://atari-monk-two-players.azurewebsites.net/'), "f");
        __classPrivateFieldGet(this, _GameClient_socket, "f").on('connect', __classPrivateFieldGet(this, _GameClient_handleConnect, "f"));
        __classPrivateFieldGet(this, _GameClient_socket, "f").on('movement', __classPrivateFieldGet(this, _GameClient_handleMovement, "f"));
        __classPrivateFieldGet(this, _GameClient_socket, "f").on('disconnect', __classPrivateFieldGet(this, _GameClient_handleDisconnect, "f"));
        __classPrivateFieldGet(this, _GameClient_socket, "f").on('clientIdList', __classPrivateFieldGet(this, _GameClient_handleClientIdList, "f"));
    }
    addPlayerObjs(players) {
        __classPrivateFieldSet(this, _GameClient_playerObjs, players, "f");
    }
    addPlayerObj(player) {
        __classPrivateFieldGet(this, _GameClient_playerObjs, "f").push(player);
    }
    removePlayer(player) {
        delete __classPrivateFieldGet(this, _GameClient_players, "f")[player.client.clientId];
    }
    get socket() {
        return __classPrivateFieldGet(this, _GameClient_socket, "f");
    }
}
exports.GameClient = GameClient;
_GameClient_clientId = new WeakMap(), _GameClient_playerObjs = new WeakMap(), _GameClient_players = new WeakMap(), _GameClient_socket = new WeakMap(), _GameClient_isLogging = new WeakMap(), _GameClient_handleConnect = new WeakMap(), _GameClient_handleMovement = new WeakMap(), _GameClient_handleDisconnect = new WeakMap(), _GameClient_handleClientIdList = new WeakMap(), _GameClient_instances = new WeakSet(), _GameClient_noPlayablePlayerError = function _GameClient_noPlayablePlayerError() {
    const message = 'Please write ?player=1 or ?player=2 in the address and refresh the browser to select your player. Otherwise, the game is not possible. Select a player other than your friend.';
    throw new Error(message);
}, _GameClient_updatePlayerPosition = function _GameClient_updatePlayerPosition(clientId, newPosition) {
    const player = __classPrivateFieldGet(this, _GameClient_players, "f")[clientId];
    if (!player) {
        throw new Error(`No player with id: ${clientId}`);
    }
    player.setPosition(Object.assign({}, newPosition));
}, _GameClient_log = function _GameClient_log(message) {
    if (__classPrivateFieldGet(this, _GameClient_isLogging, "f")) {
        console.log(message);
    }
};

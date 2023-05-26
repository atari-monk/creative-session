"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _BallGameClient_instances, _BallGameClient_ballObj, _BallGameClient_updateBallPosition, _BallGameClient_updateBallVelocity, _BallGameClient_handleBallMovement, _BallGameClient_handleBallVelocity, _BallGameClient_setupSocketConnection;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BallGameClient = void 0;
const GameClient_js_1 = require("./GameClient.js");
class BallGameClient extends GameClient_js_1.GameClient {
    constructor() {
        super();
        _BallGameClient_instances.add(this);
        _BallGameClient_ballObj.set(this, null);
        _BallGameClient_handleBallMovement.set(this, ({ newPosition }) => {
            if (!newPosition)
                throw new Error('No position data for the ball!');
            __classPrivateFieldGet(this, _BallGameClient_instances, "m", _BallGameClient_updateBallPosition).call(this, newPosition);
        });
        _BallGameClient_handleBallVelocity.set(this, ({ newVelocity }) => {
            if (!newVelocity)
                throw new Error('No velocity data for the ball!');
            __classPrivateFieldGet(this, _BallGameClient_instances, "m", _BallGameClient_updateBallVelocity).call(this, newVelocity);
        });
        __classPrivateFieldGet(this, _BallGameClient_instances, "m", _BallGameClient_setupSocketConnection).call(this);
        __classPrivateFieldSet(this, _BallGameClient_ballObj, null, "f");
    }
    addBallObj(ball) {
        __classPrivateFieldSet(this, _BallGameClient_ballObj, ball, "f");
    }
    removeBallObj() {
        __classPrivateFieldSet(this, _BallGameClient_ballObj, null, "f");
    }
}
exports.BallGameClient = BallGameClient;
_BallGameClient_ballObj = new WeakMap(), _BallGameClient_handleBallMovement = new WeakMap(), _BallGameClient_handleBallVelocity = new WeakMap(), _BallGameClient_instances = new WeakSet(), _BallGameClient_updateBallPosition = function _BallGameClient_updateBallPosition(newPosition) {
    if (!__classPrivateFieldGet(this, _BallGameClient_ballObj, "f")) {
        throw new Error('No ball object added!');
    }
    __classPrivateFieldGet(this, _BallGameClient_ballObj, "f").setPosition(Object.assign({}, newPosition));
}, _BallGameClient_updateBallVelocity = function _BallGameClient_updateBallVelocity(newVelocity) {
    if (!__classPrivateFieldGet(this, _BallGameClient_ballObj, "f")) {
        throw new Error('No ball object added!');
    }
    __classPrivateFieldGet(this, _BallGameClient_ballObj, "f").setVelocity(Object.assign({}, newVelocity));
}, _BallGameClient_setupSocketConnection = function _BallGameClient_setupSocketConnection() {
    this.socket.on('ballMovement', __classPrivateFieldGet(this, _BallGameClient_handleBallMovement, "f"));
    this.socket.on('ballVelocity', __classPrivateFieldGet(this, _BallGameClient_handleBallVelocity, "f"));
};

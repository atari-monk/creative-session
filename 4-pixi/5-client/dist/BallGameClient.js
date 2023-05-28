"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BallGameClient = void 0;
const GameClient_js_1 = require("./GameClient.js");
class BallGameClient extends GameClient_js_1.GameClient {
    constructor() {
        console.log('ball client ctror');
        super();
        this.ballObj = null;
        this.ballObj = null;
    }
    addBallObj(ball) {
        this.ballObj = ball;
    }
    removeBallObj() {
        this.ballObj = null;
    }
    updateBallPosition(newPosition) {
        if (!this.ballObj) {
            throw new Error('No ball object added!');
        }
        this.ballObj.setPosition(Object.assign({}, newPosition));
    }
    updateBallVelocity(newVelocity) {
        if (!this.ballObj) {
            throw new Error('No ball object added!');
        }
        this.ballObj.setVelocity(Object.assign({}, newVelocity));
    }
    handleBallMovement({ newPosition }) {
        if (!newPosition)
            throw new Error('No position data for the ball!');
        this.updateBallPosition(newPosition);
    }
    ;
    handleBallVelocity({ newVelocity }) {
        if (!newVelocity)
            throw new Error('No velocity data for the ball!');
        this.updateBallVelocity(newVelocity);
    }
    ;
    setupSocketConnection() {
        var _a, _b;
        super.setupSocketConnection();
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.on('ballMovement', this.handleBallMovement.bind(this));
        (_b = this.socket) === null || _b === void 0 ? void 0 : _b.on('ballVelocity', this.handleBallVelocity.bind(this));
    }
}
exports.BallGameClient = BallGameClient;

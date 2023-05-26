"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BallRenderer = void 0;
const BallObject_js_1 = require("./BallObject.js");
const PlayerObject_js_1 = require("./PlayerObject.js");
const Renderer_js_1 = require("./Renderer.js");
class BallRenderer extends Renderer_js_1.Renderer {
    constructor(appHelper, pixiApp) {
        super(appHelper, pixiApp);
        if (!this.appHelper.gameObjects || this.appHelper.gameObjects.length === 0)
            throw new Error('Array must be populated at this point!');
        this.ball = this.findBallObject();
        this.player = this.findPlayerObject();
    }
    findBallObject() {
        return this.appHelper.gameObjects.find((obj) => obj instanceof BallObject_js_1.BallObject);
    }
    findPlayerObject() {
        return this.appHelper.gameObjects.find((obj) => obj instanceof PlayerObject_js_1.PlayerObject && obj.isPlayable);
    }
    render(deltaTime) {
        super.render(deltaTime);
        this.ball.handleCollisions(this.player);
    }
}
exports.BallRenderer = BallRenderer;

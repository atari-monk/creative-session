"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixiRectangle = void 0;
const PIXI = require("pixi.js");
const GenericGameObject_js_1 = require("./GenericGameObject.js");
class PixiRectangle extends GenericGameObject_js_1.GenericGameObject {
    constructor(pixiApp) {
        super();
        this.pixiApp = pixiApp;
        this.rectangle = null;
    }
    draw(stage) {
        const screenWidth = this.pixiApp.screen.width;
        const screenHeight = this.pixiApp.screen.height;
        const centerX = screenWidth / 2;
        const centerY = screenHeight / 2;
        const rectangleWidth = 200;
        const rectangleHeight = 200;
        this.rectangle = new PIXI.Graphics();
        this.rectangle.beginFill(0xff0000);
        this.rectangle.drawRect(centerX - rectangleWidth / 2, centerY - rectangleHeight / 2, rectangleWidth, rectangleHeight);
        this.rectangle.endFill();
        stage.addChild(this.rectangle);
    }
}
exports.PixiRectangle = PixiRectangle;

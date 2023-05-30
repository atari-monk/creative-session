"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixiRectangle = void 0;
const PIXI = __importStar(require("pixi.js"));
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

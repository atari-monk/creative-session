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
var _PixiRectangle_pixiApp, _PixiRectangle_rectangle;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PixiRectangle = void 0;
const PIXI = require("pixi.js");
const GameObject_js_1 = require("./GameObject.js");
class PixiRectangle extends GameObject_js_1.GameObject {
    constructor(pixiApp) {
        super();
        _PixiRectangle_pixiApp.set(this, void 0);
        _PixiRectangle_rectangle.set(this, void 0);
        __classPrivateFieldSet(this, _PixiRectangle_pixiApp, pixiApp, "f");
        __classPrivateFieldSet(this, _PixiRectangle_rectangle, null, "f");
    }
    draw(stage) {
        const screenWidth = __classPrivateFieldGet(this, _PixiRectangle_pixiApp, "f").screen.width;
        const screenHeight = __classPrivateFieldGet(this, _PixiRectangle_pixiApp, "f").screen.height;
        const centerX = screenWidth / 2;
        const centerY = screenHeight / 2;
        const rectangleWidth = 200;
        const rectangleHeight = 200;
        // eslint-disable-next-line no-undef
        __classPrivateFieldSet(this, _PixiRectangle_rectangle, new PIXI.Graphics(), "f");
        __classPrivateFieldGet(this, _PixiRectangle_rectangle, "f").beginFill(0xff0000);
        __classPrivateFieldGet(this, _PixiRectangle_rectangle, "f").drawRect(centerX - rectangleWidth / 2, centerY - rectangleHeight / 2, rectangleWidth, rectangleHeight);
        __classPrivateFieldGet(this, _PixiRectangle_rectangle, "f").endFill();
        stage.addChild(__classPrivateFieldGet(this, _PixiRectangle_rectangle, "f"));
    }
}
exports.PixiRectangle = PixiRectangle;
_PixiRectangle_pixiApp = new WeakMap(), _PixiRectangle_rectangle = new WeakMap();

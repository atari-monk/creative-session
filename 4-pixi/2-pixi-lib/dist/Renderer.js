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
var _Renderer_appHelper, _Renderer_pixiApp, _Renderer_width, _Renderer_height, _Renderer_backgroundColor;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
class Renderer {
    constructor(appHelper, pixiApp, options = {}) {
        _Renderer_appHelper.set(this, void 0);
        _Renderer_pixiApp.set(this, void 0);
        _Renderer_width.set(this, void 0);
        _Renderer_height.set(this, void 0);
        _Renderer_backgroundColor.set(this, void 0);
        __classPrivateFieldSet(this, _Renderer_appHelper, appHelper, "f");
        __classPrivateFieldSet(this, _Renderer_pixiApp, pixiApp, "f");
        const { width, height, backgroundColor } = options;
        __classPrivateFieldSet(this, _Renderer_width, width, "f");
        __classPrivateFieldSet(this, _Renderer_height, height, "f");
        __classPrivateFieldSet(this, _Renderer_backgroundColor, backgroundColor, "f");
    }
    renderBackground() {
        // eslint-disable-next-line no-undef
        const background = new PIXI.Graphics();
        background.beginFill(__classPrivateFieldGet(this, _Renderer_backgroundColor, "f"));
        background.drawRect(0, 0, __classPrivateFieldGet(this, _Renderer_width, "f"), __classPrivateFieldGet(this, _Renderer_height, "f"));
        background.endFill();
        return background;
    }
    updateAndDrawGameObjects(deltaTime) {
        for (const gameObject of __classPrivateFieldGet(this, _Renderer_appHelper, "f").gameObjects) {
            gameObject.update(deltaTime);
            gameObject.draw(__classPrivateFieldGet(this, _Renderer_pixiApp, "f").stage);
        }
    }
    handleBall() {
        const ball = __classPrivateFieldGet(this, _Renderer_appHelper, "f").gameObjects.find((obj) => obj.isBall);
        const player = __classPrivateFieldGet(this, _Renderer_appHelper, "f").gameObjects.find((obj) => obj.isPlayable);
        ball === null || ball === void 0 ? void 0 : ball.handleCollisions(player);
    }
    render(deltaTime) {
        __classPrivateFieldGet(this, _Renderer_pixiApp, "f").stage.removeChildren();
        //this.#pixiApp.stage.addChild(this.renderBackground());
        this.updateAndDrawGameObjects(deltaTime);
        this.handleBall();
        //this.#pixiApp.renderer.render(this.#pixiApp.stage);
    }
}
exports.Renderer = Renderer;
_Renderer_appHelper = new WeakMap(), _Renderer_pixiApp = new WeakMap(), _Renderer_width = new WeakMap(), _Renderer_height = new WeakMap(), _Renderer_backgroundColor = new WeakMap();

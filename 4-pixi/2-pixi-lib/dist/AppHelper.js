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
var _AppHelper_instances, _AppHelper_pixiApp, _AppHelper_renderer, _AppHelper_width, _AppHelper_height, _AppHelper_backgroundColor, _AppHelper_fullScreen, _AppHelper_canvas, _AppHelper_gameObjects, _AppHelper_setCanvasStyles, _AppHelper_resizeCanvas;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppHelper = void 0;
class AppHelper {
    constructor(options) {
        _AppHelper_instances.add(this);
        _AppHelper_pixiApp.set(this, void 0);
        _AppHelper_renderer.set(this, void 0);
        _AppHelper_width.set(this, void 0);
        _AppHelper_height.set(this, void 0);
        _AppHelper_backgroundColor.set(this, void 0);
        _AppHelper_fullScreen.set(this, void 0);
        _AppHelper_canvas.set(this, void 0);
        _AppHelper_gameObjects.set(this, []);
        const { width, height, backgroundColor, fullScreen, canvasId } = options;
        __classPrivateFieldSet(this, _AppHelper_width, width, "f");
        __classPrivateFieldSet(this, _AppHelper_height, height, "f");
        __classPrivateFieldSet(this, _AppHelper_backgroundColor, backgroundColor, "f");
        __classPrivateFieldSet(this, _AppHelper_fullScreen, fullScreen, "f");
        __classPrivateFieldSet(this, _AppHelper_canvas, document.getElementById(canvasId), "f");
    }
    initializeApp(pixiApp, renderer) {
        __classPrivateFieldSet(this, _AppHelper_pixiApp, pixiApp, "f");
        __classPrivateFieldSet(this, _AppHelper_renderer, renderer, "f");
        __classPrivateFieldGet(this, _AppHelper_instances, "m", _AppHelper_setCanvasStyles).call(this);
        __classPrivateFieldGet(this, _AppHelper_pixiApp, "f").stage.sortableChildren = true;
        __classPrivateFieldGet(this, _AppHelper_instances, "m", _AppHelper_resizeCanvas).call(this);
    }
    getPixiAppOptions() {
        const appOptions = {
            view: __classPrivateFieldGet(this, _AppHelper_canvas, "f"),
            backgroundColor: __classPrivateFieldGet(this, _AppHelper_backgroundColor, "f"),
        };
        if (__classPrivateFieldGet(this, _AppHelper_fullScreen, "f")) {
            appOptions.resizeTo = window;
            __classPrivateFieldSet(this, _AppHelper_width, window.innerWidth, "f");
            __classPrivateFieldSet(this, _AppHelper_height, window.innerHeight, "f");
        }
        else {
            appOptions.width = __classPrivateFieldGet(this, _AppHelper_width, "f");
            appOptions.height = __classPrivateFieldGet(this, _AppHelper_height, "f");
        }
        return appOptions;
    }
    startAnimationLoop() {
        __classPrivateFieldGet(this, _AppHelper_pixiApp, "f").ticker.add((deltaTime) => {
            __classPrivateFieldGet(this, _AppHelper_renderer, "f").render(deltaTime);
        });
    }
    addGameObject(gameObject) {
        __classPrivateFieldGet(this, _AppHelper_gameObjects, "f").push(gameObject);
    }
    removeGameObject(gameObject) {
        const index = __classPrivateFieldGet(this, _AppHelper_gameObjects, "f").indexOf(gameObject);
        if (index !== -1) {
            __classPrivateFieldGet(this, _AppHelper_gameObjects, "f").splice(index, 1);
        }
    }
    get canvas() {
        return __classPrivateFieldGet(this, _AppHelper_canvas, "f");
    }
    get backgroundColor() {
        return __classPrivateFieldGet(this, _AppHelper_backgroundColor, "f");
    }
    set backgroundColor(value) {
        __classPrivateFieldSet(this, _AppHelper_backgroundColor, value, "f");
    }
    get fullScreen() {
        return __classPrivateFieldGet(this, _AppHelper_fullScreen, "f");
    }
    set fullScreen(value) {
        __classPrivateFieldSet(this, _AppHelper_fullScreen, value, "f");
    }
    get width() {
        return __classPrivateFieldGet(this, _AppHelper_width, "f");
    }
    set width(value) {
        __classPrivateFieldSet(this, _AppHelper_width, value, "f");
    }
    get height() {
        return __classPrivateFieldGet(this, _AppHelper_height, "f");
    }
    set height(value) {
        __classPrivateFieldSet(this, _AppHelper_height, value, "f");
    }
    get gameObjects() {
        return __classPrivateFieldGet(this, _AppHelper_gameObjects, "f");
    }
}
exports.AppHelper = AppHelper;
_AppHelper_pixiApp = new WeakMap(), _AppHelper_renderer = new WeakMap(), _AppHelper_width = new WeakMap(), _AppHelper_height = new WeakMap(), _AppHelper_backgroundColor = new WeakMap(), _AppHelper_fullScreen = new WeakMap(), _AppHelper_canvas = new WeakMap(), _AppHelper_gameObjects = new WeakMap(), _AppHelper_instances = new WeakSet(), _AppHelper_setCanvasStyles = function _AppHelper_setCanvasStyles() {
    if (__classPrivateFieldGet(this, _AppHelper_canvas, "f") === null)
        return;
    __classPrivateFieldGet(this, _AppHelper_canvas, "f").style.position = 'absolute';
    __classPrivateFieldGet(this, _AppHelper_canvas, "f").style.top = '50%';
    __classPrivateFieldGet(this, _AppHelper_canvas, "f").style.left = '50%';
    __classPrivateFieldGet(this, _AppHelper_canvas, "f").style.transform = 'translate(-50%, -50%)';
    const full = '100%';
    __classPrivateFieldGet(this, _AppHelper_canvas, "f").style.width = __classPrivateFieldGet(this, _AppHelper_fullScreen, "f") ? full : `${__classPrivateFieldGet(this, _AppHelper_width, "f")}`;
    __classPrivateFieldGet(this, _AppHelper_canvas, "f").style.height = __classPrivateFieldGet(this, _AppHelper_fullScreen, "f") ? full : `${__classPrivateFieldGet(this, _AppHelper_height, "f")}`;
    __classPrivateFieldGet(this, _AppHelper_canvas, "f").style.border = __classPrivateFieldGet(this, _AppHelper_fullScreen, "f") ? 'none' : '1px solid white';
}, _AppHelper_resizeCanvas = function _AppHelper_resizeCanvas() {
    window.addEventListener('resize', () => {
        if (__classPrivateFieldGet(this, _AppHelper_fullScreen, "f")) {
            __classPrivateFieldSet(this, _AppHelper_width, window.innerWidth, "f");
            __classPrivateFieldSet(this, _AppHelper_height, window.innerHeight, "f");
        }
        __classPrivateFieldGet(this, _AppHelper_pixiApp, "f").renderer.resize(__classPrivateFieldGet(this, _AppHelper_width, "f"), __classPrivateFieldGet(this, _AppHelper_height, "f"));
    });
};

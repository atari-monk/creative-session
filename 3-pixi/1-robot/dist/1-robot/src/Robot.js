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
var _Robot_instances, _Robot_pixiApp, _Robot_body, _Robot_robotX, _Robot_robotDirection, _Robot_updateRobotPosition, _Robot_rotateArmsAndLegs, _Robot_checkBoundaries;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Robot = void 0;
const GameObject_js_1 = require("../../pixi-lib/GameObject.js");
class Robot extends GameObject_js_1.GameObject {
    constructor(pixiApp, body) {
        super();
        _Robot_instances.add(this);
        _Robot_pixiApp.set(this, void 0);
        _Robot_body.set(this, void 0);
        _Robot_robotX.set(this, void 0);
        _Robot_robotDirection.set(this, void 0);
        __classPrivateFieldSet(this, _Robot_pixiApp, pixiApp, "f");
        __classPrivateFieldSet(this, _Robot_body, body, "f");
        __classPrivateFieldSet(this, _Robot_robotX, 0, "f");
        __classPrivateFieldSet(this, _Robot_robotDirection, 1, "f");
    }
    draw(stage) {
        __classPrivateFieldGet(this, _Robot_body, "f").draw(stage);
    }
    update(_deltaTime) {
        __classPrivateFieldGet(this, _Robot_instances, "m", _Robot_updateRobotPosition).call(this);
        __classPrivateFieldGet(this, _Robot_instances, "m", _Robot_rotateArmsAndLegs).call(this);
        __classPrivateFieldGet(this, _Robot_instances, "m", _Robot_checkBoundaries).call(this);
    }
}
exports.Robot = Robot;
_Robot_pixiApp = new WeakMap(), _Robot_body = new WeakMap(), _Robot_robotX = new WeakMap(), _Robot_robotDirection = new WeakMap(), _Robot_instances = new WeakSet(), _Robot_updateRobotPosition = function _Robot_updateRobotPosition() {
    __classPrivateFieldSet(this, _Robot_robotX, __classPrivateFieldGet(this, _Robot_robotX, "f") + 1 * __classPrivateFieldGet(this, _Robot_robotDirection, "f"), "f");
    __classPrivateFieldGet(this, _Robot_body, "f").container.position.x = __classPrivateFieldGet(this, _Robot_robotX, "f");
}, _Robot_rotateArmsAndLegs = function _Robot_rotateArmsAndLegs() {
    const time = __classPrivateFieldGet(this, _Robot_pixiApp, "f").ticker.lastTime;
    const armRotation = Math.sin(time / 100) * 0.05;
    const legRotation = -Math.sin(time / 100) * 0.1;
    __classPrivateFieldGet(this, _Robot_body, "f").leftArmJoint.rotation = armRotation;
    __classPrivateFieldGet(this, _Robot_body, "f").rightArmJoint.rotation = -armRotation;
    __classPrivateFieldGet(this, _Robot_body, "f").leftLegJoint.rotation = legRotation;
    __classPrivateFieldGet(this, _Robot_body, "f").rightLegJoint.rotation = -legRotation;
}, _Robot_checkBoundaries = function _Robot_checkBoundaries() {
    if (__classPrivateFieldGet(this, _Robot_robotX, "f") >=
        __classPrivateFieldGet(this, _Robot_pixiApp, "f").renderer.width - __classPrivateFieldGet(this, _Robot_body, "f").container.width ||
        __classPrivateFieldGet(this, _Robot_robotX, "f") <= 0) {
        __classPrivateFieldSet(this, _Robot_robotDirection, __classPrivateFieldGet(this, _Robot_robotDirection, "f") * -1, "f");
    }
};

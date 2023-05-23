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
var _RobotBody_instances, _RobotBody_container, _RobotBody_head, _RobotBody_torso, _RobotBody_leftArmJoint, _RobotBody_rightArmJoint, _RobotBody_leftLegJoint, _RobotBody_rightLegJoint, _RobotBody_leftArm, _RobotBody_rightArm, _RobotBody_leftLeg, _RobotBody_rightLeg, _RobotBody_createBodyParts, _RobotBody_createHead, _RobotBody_createTorso, _RobotBody_createJointContainers, _RobotBody_createArmAndLegSprites, _RobotBody_addSpritesToContainers, _RobotBody_addContainersToTorso, _RobotBody_addBodyPartsToContainer, _RobotBody_setInitialPositions;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RobotBody = void 0;
class RobotBody {
    constructor() {
        _RobotBody_instances.add(this);
        _RobotBody_container.set(this, void 0);
        _RobotBody_head.set(this, void 0);
        _RobotBody_torso.set(this, void 0);
        _RobotBody_leftArmJoint.set(this, void 0);
        _RobotBody_rightArmJoint.set(this, void 0);
        _RobotBody_leftLegJoint.set(this, void 0);
        _RobotBody_rightLegJoint.set(this, void 0);
        _RobotBody_leftArm.set(this, void 0);
        _RobotBody_rightArm.set(this, void 0);
        _RobotBody_leftLeg.set(this, void 0);
        _RobotBody_rightLeg.set(this, void 0);
        __classPrivateFieldSet(this, _RobotBody_container, new PIXI.Container(), "f");
        __classPrivateFieldGet(this, _RobotBody_instances, "m", _RobotBody_createBodyParts).call(this);
        __classPrivateFieldGet(this, _RobotBody_instances, "m", _RobotBody_setInitialPositions).call(this);
    }
    draw(stage) {
        stage.addChild(__classPrivateFieldGet(this, _RobotBody_container, "f"));
    }
    get container() {
        return __classPrivateFieldGet(this, _RobotBody_container, "f");
    }
    get leftArmJoint() {
        return __classPrivateFieldGet(this, _RobotBody_leftArmJoint, "f");
    }
    get rightArmJoint() {
        return __classPrivateFieldGet(this, _RobotBody_rightArmJoint, "f");
    }
    get leftLegJoint() {
        return __classPrivateFieldGet(this, _RobotBody_leftLegJoint, "f");
    }
    get rightLegJoint() {
        return __classPrivateFieldGet(this, _RobotBody_rightLegJoint, "f");
    }
}
exports.RobotBody = RobotBody;
_RobotBody_container = new WeakMap(), _RobotBody_head = new WeakMap(), _RobotBody_torso = new WeakMap(), _RobotBody_leftArmJoint = new WeakMap(), _RobotBody_rightArmJoint = new WeakMap(), _RobotBody_leftLegJoint = new WeakMap(), _RobotBody_rightLegJoint = new WeakMap(), _RobotBody_leftArm = new WeakMap(), _RobotBody_rightArm = new WeakMap(), _RobotBody_leftLeg = new WeakMap(), _RobotBody_rightLeg = new WeakMap(), _RobotBody_instances = new WeakSet(), _RobotBody_createBodyParts = function _RobotBody_createBodyParts() {
    __classPrivateFieldGet(this, _RobotBody_instances, "m", _RobotBody_createHead).call(this);
    __classPrivateFieldGet(this, _RobotBody_instances, "m", _RobotBody_createTorso).call(this);
    __classPrivateFieldGet(this, _RobotBody_instances, "m", _RobotBody_createJointContainers).call(this);
    __classPrivateFieldGet(this, _RobotBody_instances, "m", _RobotBody_createArmAndLegSprites).call(this);
    __classPrivateFieldGet(this, _RobotBody_instances, "m", _RobotBody_addSpritesToContainers).call(this);
    __classPrivateFieldGet(this, _RobotBody_instances, "m", _RobotBody_addContainersToTorso).call(this);
    __classPrivateFieldGet(this, _RobotBody_instances, "m", _RobotBody_addBodyPartsToContainer).call(this);
}, _RobotBody_createHead = function _RobotBody_createHead() {
    __classPrivateFieldSet(this, _RobotBody_head, PIXI.Sprite.from('./assets/head.png'), "f");
}, _RobotBody_createTorso = function _RobotBody_createTorso() {
    __classPrivateFieldSet(this, _RobotBody_torso, PIXI.Sprite.from('./assets/torso.png'), "f");
}, _RobotBody_createJointContainers = function _RobotBody_createJointContainers() {
    __classPrivateFieldSet(this, _RobotBody_leftArmJoint, new PIXI.Container(), "f");
    __classPrivateFieldSet(this, _RobotBody_rightArmJoint, new PIXI.Container(), "f");
    __classPrivateFieldSet(this, _RobotBody_leftLegJoint, new PIXI.Container(), "f");
    __classPrivateFieldSet(this, _RobotBody_rightLegJoint, new PIXI.Container(), "f");
}, _RobotBody_createArmAndLegSprites = function _RobotBody_createArmAndLegSprites() {
    __classPrivateFieldSet(this, _RobotBody_leftArm, PIXI.Sprite.from('./assets/left-arm.png'), "f");
    __classPrivateFieldSet(this, _RobotBody_rightArm, PIXI.Sprite.from('./assets/right-arm.png'), "f");
    __classPrivateFieldSet(this, _RobotBody_leftLeg, PIXI.Sprite.from('./assets/left-leg.png'), "f");
    __classPrivateFieldSet(this, _RobotBody_rightLeg, PIXI.Sprite.from('./assets/right-leg.png'), "f");
}, _RobotBody_addSpritesToContainers = function _RobotBody_addSpritesToContainers() {
    __classPrivateFieldGet(this, _RobotBody_leftArmJoint, "f").addChild(__classPrivateFieldGet(this, _RobotBody_leftArm, "f"));
    __classPrivateFieldGet(this, _RobotBody_rightArmJoint, "f").addChild(__classPrivateFieldGet(this, _RobotBody_rightArm, "f"));
    __classPrivateFieldGet(this, _RobotBody_leftLegJoint, "f").addChild(__classPrivateFieldGet(this, _RobotBody_leftLeg, "f"));
    __classPrivateFieldGet(this, _RobotBody_rightLegJoint, "f").addChild(__classPrivateFieldGet(this, _RobotBody_rightLeg, "f"));
}, _RobotBody_addContainersToTorso = function _RobotBody_addContainersToTorso() {
    __classPrivateFieldGet(this, _RobotBody_torso, "f").addChild(__classPrivateFieldGet(this, _RobotBody_leftArmJoint, "f"), __classPrivateFieldGet(this, _RobotBody_rightArmJoint, "f"), __classPrivateFieldGet(this, _RobotBody_leftLegJoint, "f"), __classPrivateFieldGet(this, _RobotBody_rightLegJoint, "f"));
}, _RobotBody_addBodyPartsToContainer = function _RobotBody_addBodyPartsToContainer() {
    __classPrivateFieldGet(this, _RobotBody_container, "f").addChild(__classPrivateFieldGet(this, _RobotBody_head, "f"), __classPrivateFieldGet(this, _RobotBody_torso, "f"));
}, _RobotBody_setInitialPositions = function _RobotBody_setInitialPositions() {
    __classPrivateFieldGet(this, _RobotBody_head, "f").position.set(160, 50);
    __classPrivateFieldGet(this, _RobotBody_torso, "f").position.set(90, 120);
    __classPrivateFieldGet(this, _RobotBody_leftArmJoint, "f").position.set(-20, 20);
    __classPrivateFieldGet(this, _RobotBody_rightArmJoint, "f").position.set(140, 20);
    __classPrivateFieldGet(this, _RobotBody_leftLegJoint, "f").position.set(25, 180);
    __classPrivateFieldGet(this, _RobotBody_rightLegJoint, "f").position.set(80, 170);
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericGameObject = void 0;
const GameObject_1 = require("./GameObject");
class GenericGameObject extends GameObject_1.GameObject {
    draw(stage) { }
    update(deltaTime) { }
}
exports.GenericGameObject = GenericGameObject;

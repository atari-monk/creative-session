"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardInput = void 0;
class KeyboardInput {
    constructor() {
        this.keys = {};
        this.initListeners();
    }
    initListeners() {
        window.addEventListener('keydown', (event) => {
            this.keys[event.keyCode] = true;
        });
        window.addEventListener('keyup', (event) => {
            this.keys[event.keyCode] = false;
        });
    }
    isKeyDown(keyCode) {
        return this.keys[keyCode] === true;
    }
}
exports.KeyboardInput = KeyboardInput;

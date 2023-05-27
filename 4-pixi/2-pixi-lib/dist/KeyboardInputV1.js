"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardInputV1 = void 0;
class KeyboardInputV1 {
    constructor(debugMode = false) {
        this.keys = new Set();
        this.debugMode = debugMode;
        this.initListeners();
    }
    initListeners() {
        const keydownListener = (event) => {
            this.keys.add(event.key);
            if (!this.debugMode)
                return;
            console.log('Key Pressed:', event.key);
        };
        const keyupListener = (event) => {
            this.keys.delete(event.key);
        };
        window.addEventListener('keydown', keydownListener);
        window.addEventListener('keyup', keyupListener);
        window.addEventListener('beforeunload', () => {
            window.removeEventListener('keydown', keydownListener);
            window.removeEventListener('keyup', keyupListener);
        });
    }
    isKeyDown(key) {
        return this.keys.has(key);
    }
}
exports.KeyboardInputV1 = KeyboardInputV1;

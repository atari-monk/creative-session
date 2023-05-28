"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyboardInputV2 = void 0;
class KeyboardInputV2 {
    constructor() {
        this.observers = new Set();
        this.initListeners();
    }
    initListeners() {
        const keydownListener = (event) => {
            this.notifyObserversKeyPress(event.key);
        };
        const keyupListener = (event) => {
            this.notifyObserversKeyRelease(event.key);
        };
        window.addEventListener('keydown', keydownListener);
        window.addEventListener('keyup', keyupListener);
        // Clean up event listeners when the instance is no longer needed
        window.addEventListener('beforeunload', () => {
            window.removeEventListener('keydown', keydownListener);
            window.removeEventListener('keyup', keyupListener);
        });
    }
    addObserver(observer) {
        this.observers.add(observer);
    }
    removeObserver(observer) {
        this.observers.delete(observer);
    }
    notifyObserversKeyPress(key) {
        for (const observer of this.observers) {
            observer.onKeyPress(key);
        }
    }
    notifyObserversKeyRelease(key) {
        for (const observer of this.observers) {
            observer.onKeyRelease(key);
        }
    }
}
exports.KeyboardInputV2 = KeyboardInputV2;

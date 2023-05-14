// KeyboardHandler.js

export class KeyboardHandler {
  constructor() {
    this.keys = {}; // Object to store the keyboard state

    // Listen for keydown and keyup events
    window.addEventListener('keydown', this.handleKeyDown.bind(this));
    window.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyDown(event) {
    this.keys[event.key] = true;
  }

  handleKeyUp(event) {
    this.keys[event.key] = false;
  }

  isKeyDown(key) {
    return !!this.keys[key];
  }
}

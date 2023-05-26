export class KeyboardInput {
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

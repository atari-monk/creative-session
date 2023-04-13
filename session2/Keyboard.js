export class Keyboard {
  constructor() {
    this.keys = {};
    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener("keydown", (event) => {
      this.keys[event.code] = true;
    });
    window.addEventListener("keyup", (event) => {
      this.keys[event.code] = false;
    });
  }

  isKeyDown(keyCode) {
    return this.keys[keyCode] === true;
  }
}

export class Overlay {
  #overlayBtn;
  #overlay;
  #startBtn;
  #resetBtn;
  #stateText;
  #animator;

  constructor(animator) {
    this.#animator = animator;
    this.#getUI();
    this.#checkUI();
    this.#setEvents();
  }

  #getUI() {
    this.#overlayBtn = document.getElementById("small-button");
    this.#overlay = document.getElementById("overlay");
    this.#startBtn = document.getElementById("start-button");
    this.#resetBtn = document.getElementById("reset-button");
    this.#stateText = document.getElementById("state");
  }

  #checkUI() {
    this.#checkElement(this.#overlayBtn);
    this.#checkElement(this.#overlay);
    this.#checkElement(this.#startBtn);
    this.#checkElement(this.#resetBtn);
    this.#checkElement(this.#stateText);
  }

  #checkElement(element) {
    if (element === false) {
      throw new Error("Cant find ui element id!");
    }
  }

  #setEvents() {
    this.#overlayBtn.addEventListener("click", this.#onPause.bind(this));
    document.addEventListener("click", this.#onCloseOverlay.bind(this));
    this.#startBtn.addEventListener("click", this.#onStart.bind(this));
    this.#resetBtn.addEventListener("click", this.#onReset.bind(this));
  }

  #onPause() {
    this.#openOverlay();
    if (this.#animator.isRunning) {
      this.#animator.stop();
    }
  }

  #onCloseOverlay(event) {
    if (
      event.target === this.#overlay ||
      event.target.parentElement === this.#overlay
    ) {
      this.#closeOverlay();
      this.#animator.start();
    }
  }

  #closeOverlay() {
    this.#overlay.style.display = "none";
  }

  #onStart() {
    this.#closeOverlay();
    this.#animator.start();
  }

  #openOverlay() {
    this.#overlay.style.display = "block";
  }

  #onReset() {
    this.#closeOverlay();
    this.#animator.reset();
  }
}

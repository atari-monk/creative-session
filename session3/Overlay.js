export class Overlay {
  #overlayBtn;
  #overlay;
  #startBtn;
  #animator;

  constructor(animator) {
    this.#animator = animator;
    this.#getUI();
    this.#checkUI();
    this.#setOpenEvent();
    this.#setCloseEvent();
    this.#startBtn.addEventListener("click", () => {
      this.#animator.start();
      this.#closeOverlay();
    });
  }

  #getUI() {
    this.#overlayBtn = document.getElementById("small-button");
    this.#overlay = document.getElementById("overlay");
    this.#startBtn = document.getElementById("start-button");
  }

  #checkUI() {
    this.#checkElement(this.#overlayBtn);
    this.#checkElement(this.#overlay);
    this.#checkElement(this.#startBtn);
  }

  #checkElement(element) {
    if (element === false) {
      throw new Error("Cant find ui element id!");
    }
  }

  #setOpenEvent() {
    this.#overlayBtn.addEventListener("click", () => {
      this.#openOverlay();
    });
  }

  #openOverlay() {
    this.#overlay.style.display = "block";
  }

  #setCloseEvent() {
    document.addEventListener("click", (event) => {
      if (
        event.target === this.#overlay ||
        event.target.parentElement === this.#overlay
      ) {
        this.#closeOverlay();
      }
    });
  }

  #closeOverlay() {
    this.#overlay.style.display = "none";
  }
}

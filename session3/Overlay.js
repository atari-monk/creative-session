export class Overlay {
  constructor() {
    const { button, overlay } = this.#getUI();
    this.#checkUI(button, overlay);
    this.#setOpenEvent(button, overlay);
    this.#setCloseEvent(overlay);
  }

  #getUI() {
    const button = document.getElementById("small-button");
    const overlay = document.getElementById("overlay");
    return { button, overlay };
  }

  #checkUI(button, overlay) {
    if (button === false || overlay === false) {
      throw new Error("Cant find button or overley ui");
    }
  }

  #setOpenEvent(button, overlay) {
    button.addEventListener("click", () => {
      overlay.style.display = "block";
    });
  }

  #setCloseEvent(overlay) {
    document.addEventListener("click", (event) => {
      if (event.target === overlay || event.target.parentElement === overlay) {
        overlay.style.display = "none";
      }
    });
  }
}

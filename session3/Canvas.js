export class Canvas {
  #istestDraw;
  
  constructor(id, isTestDrawOn = false) {
    this.#istestDraw = isTestDrawOn;
    this.#getUI(id);
    this.#checkUI();
    this.#configureCanvas(isTestDrawOn);
  }

  #getUI(id) {
    this.canvas = document.getElementById(id);
  }

  #checkUI() {
    if (this.canvas === false) {
      throw new Error("Cant find canvas id!");
    }
  }

  #configureCanvas(istestDraw) {
    this.ctx = this.canvas.getContext("2d");
    this.#resize();
    window.addEventListener("resize", () => {
      this.#resize();
      this.#istestDraw && this.#draw();
    });
    this.#istestDraw && this.#draw();
  }

  #resize() {
    this.canvas.width = this.canvas.clientWidth;
    this.canvas.height = this.canvas.clientHeight;
  }

  #draw() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(centerX - 50, centerY - 50, 100, 100);
  }
}

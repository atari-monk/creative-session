export class Animator {
  #canvas;
  #ctx;
  #testGameObject;

  constructor(canvas, testGameObject) {
    this.#canvas = canvas;
    this.#ctx = canvas.ctx;
    this.#testGameObject = testGameObject;
    this.lastFrameTime = 0;
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    this.lastFrameTime = performance.now();
    requestAnimationFrame(this.animate.bind(this, 0));
  }

  stop() {
    this.isRunning = false;
  }

  animate(timestamp) {
    if (!this.isRunning) {
      return;
    }

    const deltaTime = (timestamp - this.lastFrameTime) / 1000;
    this.lastFrameTime = timestamp;

    this.#testGameObject.update(deltaTime);

    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);

    this.#testGameObject.render(this.#ctx);
    //this.#draw();
    //console.log(deltaTime);

    requestAnimationFrame(this.animate.bind(this));
  }

  #draw() {
    const centerX = this.#canvas.width / 2;
    const centerY = this.#canvas.height / 2;
    this.#ctx.fillStyle = "yellow";
    this.#ctx.fillRect(centerX - 50, centerY - 50, 100, 100);
  }
}

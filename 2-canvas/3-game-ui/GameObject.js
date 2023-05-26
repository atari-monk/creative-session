export class GameObject {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.speedX = 40;
    this.speedY = 0;
  }

  update(deltaTime) {
    this.x += this.speedX * deltaTime;
    this.y += this.speedY * deltaTime;
  }

  render(ctx) {
    ctx.fillStyle = "blue";
    ctx.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }
}

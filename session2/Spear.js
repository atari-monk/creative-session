export class Spear {
  constructor(player, canvas) {
    this.player = player;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.width = 10;
    this.height = 50;
    this.color = "gray";
    this.x = player.x + player.width * 2;
    this.y = player.y + player.height * 0.5;
    this.velocityX = -5;
  }

  update() {
    this.x += this.velocityX;
  }

  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  isCollidingWith(player) {
    // Check if the player and spear are colliding
    if (
      player.x + player.width > this.x &&
      player.x < this.x + this.width &&
      player.y + player.height > this.y &&
      player.y < this.y + this.height
    ) {
      return true;
    }
    return false;
  }
}

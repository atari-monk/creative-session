import { IBall } from './ball/IBall';
import { IPlayer } from './player/IPlayer';
import { IGameUpdateable } from './IGameUpdateable';

export class Collider implements IGameUpdateable {
  Update(deltaTime: number, ball: IBall, player: IPlayer): void {
    this.handleCollisions(ball, player);
  }

  private handleCollisions(ball: IBall, player: IPlayer) {
    if (!this.checkCircularCollision(ball, player)) return;
    if (player.direction.x !== 0 || player.direction.y !== 0) {
      player.kickBall(ball);
      console.log('kick');
    } else {
      ball.bounce();
      console.log('bounce');
    }
  }

  private checkCircularCollision(ball: IBall, player: IPlayer) {
    const distanceX = player.position.x - ball.position.x;
    const distanceY = player.position.y - ball.position.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    if (distance < player.radius! + ball.radius!) {
      console.log('collision');
      return true;
    }
    return false;
  }
}

import { IBall, IPlayer } from 'atari-monk-game-api-lib';
import { IGameUpdateable } from './IGameUpdateable';
import { injectable } from 'inversify';

@injectable()
export class Collider implements IGameUpdateable {
  Update(deltaTime: number, ball: IBall, player: IPlayer): void {
    this.handleCollisions(ball, player);
  }

  private handleCollisions(ball: IBall, player: IPlayer) {
    if (!this.checkCircularCollision(ball, player)) return;
    if (player.model.direction.x !== 0 || player.model.direction.y !== 0) {
      player.kickBall(ball);
      console.log('kick');
    } else {
      ball.bounce();
      console.log('bounce');
    }
  }

  private checkCircularCollision(ball: IBall, player: IPlayer) {
    const distanceX = player.model.position.x - ball.model.position.x;
    const distanceY = player.model.position.y - ball.model.position.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    if (distance < player.model.radius! + ball.model.radius!) {
      console.log('collision');
      return true;
    }
    return false;
  }
}

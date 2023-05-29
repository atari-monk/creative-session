import { GameServer } from './GameServer';
import { Socket } from 'socket.io';

class BallGameServer extends GameServer {
  constructor() {
    super();
  }

  private handleBallMovement(socket: Socket): void {
    socket.on('ballMovement', ({ newPosition }) => {
      socket.broadcast.emit('ballMovement', { newPosition });
    });
  }

  private handleBallVelocity(socket: Socket): void {
    socket.on('ballVelocity', ({ newVelocity }) => {
      socket.broadcast.emit('ballVelocity', { newVelocity });
    });
  }

  protected handleClientConnection(socket: Socket): void {
    super.handleClientConnection(socket);
    this.handleBallMovement(socket);
    this.handleBallVelocity(socket);
  }
}

export { BallGameServer };

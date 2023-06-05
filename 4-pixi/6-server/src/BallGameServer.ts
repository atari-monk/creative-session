import { GameServer } from './GameServer';
import { Socket } from 'socket.io';

export class BallGameServer extends GameServer {
  constructor() {
    super();
  }

  protected handleClientConnection(socket: Socket): void {
    super.handleClientConnection(socket);
    this.handleBallMovement(socket);
    this.handleBallVelocity(socket);
  }

  private handleBallMovement(socket: Socket): void {
    socket.on('ballMovement', (newPosition: { x: number; y: number }) => {
      socket.broadcast.emit('ballMovement', newPosition);
    });
  }

  private handleBallVelocity(socket: Socket): void {
    socket.on('ballVelocity', (newVelocity: { x: number; y: number }) => {
      socket.broadcast.emit('ballVelocity', newVelocity);
    });
  }
}

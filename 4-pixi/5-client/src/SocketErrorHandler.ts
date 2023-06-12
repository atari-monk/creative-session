import { Socket } from 'socket.io-client';

export class SocketErrorHandler {
  constructor(private readonly socket: Socket) {
    this.socket = socket;
    this.setupErrorHandling();
  }

  private setupErrorHandling() {
    this.socket.on('connect_error', (error: Error) => {
      console.error('Socket connection error:', error);
    });

    this.socket.on('connect_timeout', (timeout: number) => {
      console.error('Socket connection timeout:', timeout);
    });

    this.socket.on('error', (error: Error) => {
      console.error('Socket error:', error);
    });
  }
}

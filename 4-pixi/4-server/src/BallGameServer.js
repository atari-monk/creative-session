const { GameServer } = require('./GameServer');

class BallGameServer extends GameServer {
  constructor() {
    super();
  }

  #handleBallMovement(socket) {
    socket.on('ballMovement', ({ newPosition }) => {
      socket.broadcast.emit('ballMovement', { newPosition });
    });
  }

  #handleBallVelocity(socket) {
    socket.on('ballVelocity', ({ newVelocity }) => {
      socket.broadcast.emit('ballVelocity', { newVelocity });
    });
  }

  _handleClientConnection(socket) {
    super._handleClientConnection(socket);
    this.#handleBallMovement(socket);
    this.#handleBallVelocity(socket);
  }
}

module.exports = { BallGameServer };

/* eslint-disable no-undef */
const { GameServer } = require('./GameServer');

class BallGameServer extends GameServer {
  constructor() {
    super();
  }

  #handleBallMovement(socket) {
    console.log('setup ballMovement');
    socket.on('ballMovement', ({ newPosition }) => {
      socket.broadcast.emit('ballMovement', { newPosition });
      //console.log('ballMovement');
    });
  }

  #handleBallVelocity(socket) {
    console.log('setup ballVelocity');
    socket.on('ballVelocity', ({ newVelocity }) => {
      socket.broadcast.emit('ballVelocity', { newVelocity });
      console.log('ballVelocity');
    });
  }

  _handleClientConnection(socket) {
    super._handleClientConnection(socket);
    this.#handleBallMovement(socket);
    this.#handleBallVelocity(socket);
  }
}

module.exports = { BallGameServer };

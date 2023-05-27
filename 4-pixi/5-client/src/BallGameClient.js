import { GameClient } from './GameClient.js';

export class BallGameClient extends GameClient {
  #ballObj = null;

  constructor() {
    super();
    this.#setupSocketConnection();
    this.#ballObj = null;
  }

  addBallObj(ball) {
    this.#ballObj = ball;
  }

  removeBallObj() {
    this.#ballObj = null;
  }

  #updateBallPosition(newPosition) {
    if (!this.#ballObj) {
      throw new Error('No ball object added!');
    }
    this.#ballObj.setPosition(Object.assign({}, newPosition));
  }

  #updateBallVelocity(newVelocity) {
    if (!this.#ballObj) {
      throw new Error('No ball object added!');
    }
    this.#ballObj.setVelocity(Object.assign({}, newVelocity));
  }

  #handleBallMovement = ({ newPosition }) => {
    if (!newPosition) throw new Error('No position data for the ball!');
    this.#updateBallPosition(newPosition);
  };

  #handleBallVelocity = ({ newVelocity }) => {
    if (!newVelocity) throw new Error('No velocity data for the ball!');
    this.#updateBallVelocity(newVelocity);
  };

  #setupSocketConnection() {
    this.socket.on('ballMovement', this.#handleBallMovement);
    this.socket.on('ballVelocity', this.#handleBallVelocity);
  }
}

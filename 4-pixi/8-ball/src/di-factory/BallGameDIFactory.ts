import { AppFactory } from './AppFactory';
import { PlayersFactory } from './PlayersFactory';
import { ClientFactory } from './ClientFactory';
import { Container } from 'inversify';
import { BallFactory } from './BallFactory';

export class BallGameDIFactory {
  constructor() {
    const container = new Container();
    const appFactory = new AppFactory();
    const playersFactory = new PlayersFactory(container);
    const emitter = playersFactory.emitter;
    const ballFactory = new BallFactory(container);

    const gameObjsManager = appFactory.gameObjsManager;
    gameObjsManager.addGameObject(playersFactory.player1);
    gameObjsManager.addGameObject(playersFactory.player2);
    gameObjsManager.addGameObject(ballFactory.ball);

    new ClientFactory(
      emitter,
      playersFactory.player1,
      playersFactory.player2,
      ballFactory.ball
    );

    appFactory.start();
  }
}

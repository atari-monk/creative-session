import { AppFactory } from './AppFactory';
import { PlayersFactory } from './PlayersFactory';
import { ClientFactory } from './ClientFactory';
import { Container } from 'inversify';
import { BallFactory } from './BallFactory';

export class BallGame {
  constructor() {
    const container = new Container();
    const appFactory = new AppFactory();
    const playersFactory = new PlayersFactory(container);
    playersFactory.addPlayers(appFactory);
    const ballFactory = new BallFactory(appFactory, playersFactory);
    new ClientFactory(playersFactory, ballFactory);
    appFactory.start(ballFactory.ballRenderer);
  }
}

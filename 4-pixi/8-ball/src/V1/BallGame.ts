import { AppFactory } from './AppFactory';
import { PlayersFactory } from './PlayersFactory';
import { BallFactory } from './BallFactory';
import { ClientFactory } from './ClientFactory';

export class BallGame {
  constructor() {
    const appFactory = new AppFactory();
    const playersFactory = new PlayersFactory();
    playersFactory.addPlayers(appFactory);
    const ballFactory = new BallFactory(appFactory, playersFactory);
    new ClientFactory(playersFactory, ballFactory);
    appFactory.start();
  }
}

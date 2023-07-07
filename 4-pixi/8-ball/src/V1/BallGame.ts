// import { AppFactory } from './AppFactory';
// import { PlayersFactory } from './PlayersFactory';
// import { BallFactory } from './BallFactory';
// import { ClientFactory } from './ClientFactory';

// export class BallGame {
//   constructor() {
//     const appFactory = new AppFactory();
//     const playersFactory = new PlayersFactory();
//     const emitter = playersFactory.emitter;
//     const ballFactory = new BallFactory(emitter);

//     const gameObjsManager = appFactory.gameObjsManager;
//     gameObjsManager.addGameObject(playersFactory.player1);
//     gameObjsManager.addGameObject(playersFactory.player2);
//     gameObjsManager.addGameObject(ballFactory.ball);

//     new ClientFactory(
//       emitter,
//       [playersFactory.player1, playersFactory.player2],
//       ballFactory.ball
//     );

//     appFactory.start();
//   }
// }

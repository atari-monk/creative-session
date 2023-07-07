// import { IBall, Vector2d, ballOptions } from 'atari-monk-pixi-lib';
// import { Ball } from 'atari-monk-pixi-lib/ball/Ball';
// import { ballParams } from 'atari-monk-pixi-lib/data/appConfig';
// import EventEmitter from 'eventemitter3';

// export class BallFactory {
//   private _ball: IBall;

//   public get ball() {
//     return this._ball;
//   }

//   constructor(eventEmitter: EventEmitter) {
//     try {
//       this._ball = new Ball(new BallModel(ballParams));
//       this._ball.position = new Vector2d(
//         ballOptions.screenSize.width / 2,
//         ballOptions.screenSize.height / 2
//       );
//     } catch (error) {
//       console.error('Error creating ball:', error);
//       throw error;
//     }
//   }
// }

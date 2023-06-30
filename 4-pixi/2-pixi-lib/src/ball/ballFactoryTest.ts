import 'reflect-metadata';
import { Container } from 'inversify';
import { BallFactory } from './BallFactory';
import { SharedPlayerFactory } from '../player-shared/SharedPlayerFactory';

const container = new Container();
const sharedPlayerFactory = new SharedPlayerFactory(container);
const ballFactory = new BallFactory(container);
sharedPlayerFactory.registerDependencies();
ballFactory.registerDependencies();
const ball = ballFactory.resolve();
console.log(
  `position: (${ball.position.x}, ${ball.position.y}), velocity: (${ball.velocity.x}, ${ball.velocity.y}), radius: ${ball.radius}`
);

import 'reflect-metadata';
import { Container } from 'inversify';
import { BallFactory } from './BallFactory';

const container = new Container();
const ballFactory = new BallFactory(container);
ballFactory.registerDependencies();
const ball = ballFactory.resolve();
console.log(`position: (${ball.position.x}, ${ball.position.y})`);

import 'reflect-metadata';
import { Container } from 'inversify';
import { BallFactory } from './BallFactory';
import { ServiceFactory } from '../service/ServiceFactory';

const container = new Container();
const serviceFactory = new ServiceFactory(container);
const ballFactory = new BallFactory(container);

serviceFactory.register();
ballFactory.register();

const ball = ballFactory.create();

console.log(ball.toString());

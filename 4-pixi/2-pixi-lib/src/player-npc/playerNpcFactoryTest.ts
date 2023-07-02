import 'reflect-metadata';
import { Container } from 'inversify';
import { PlayerNpcFactory } from './PlayerNpcFactory';
import { ServiceFactory } from '../service/ServiceFactory';

const container = new Container();
const serviceFactory = new ServiceFactory(container);
const playerFactory = new PlayerNpcFactory(container);

serviceFactory.register();
playerFactory.register();

const player = playerFactory.create();
const x = player.position.x;
const y = player.position.x;
console.log('position', x, y);

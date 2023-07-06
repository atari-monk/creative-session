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

console.log(player.toString());

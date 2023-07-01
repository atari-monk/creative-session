import 'reflect-metadata';
import { Container } from 'inversify';
import { NotPlayablePlayerFactory } from './NotPlayablePlayerFactory';
import { ServiceFactory } from '../service/ServiceFactory';

const container = new Container();
const sharedPlayerFactory = new ServiceFactory(container);
const playerFactory = new NotPlayablePlayerFactory(container);
sharedPlayerFactory.register();
playerFactory.register();
const player = playerFactory.create();
const x = player.position.x;
const y = player.position.x;
console.log('position', x, y);

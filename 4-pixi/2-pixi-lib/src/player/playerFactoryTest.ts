import 'reflect-metadata';
import { Container } from 'inversify';
import { PlayerFactory } from './PlayerFactory';
import { ServiceFactory } from '../service/ServiceFactory';

const container = new Container();
const sharedPlayerFactory = new ServiceFactory(container);
const playerFactory = new PlayerFactory(container);
sharedPlayerFactory.register();
playerFactory.register();
const player = playerFactory.create();
console.log(`position: (${player.position.x}, ${player.position.y})`);
player.diagnoze();

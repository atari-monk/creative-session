import 'reflect-metadata';
import { Container } from 'inversify';
import { PlayerFactory } from '../player/playerFactory/PlayerFactory';

const container = new Container();
const playerFactory = new PlayerFactory(container);
playerFactory.registerDependencies();
const player = playerFactory.resolve();
const x = player.position.x;
const y = player.position.x;
console.log('fin');

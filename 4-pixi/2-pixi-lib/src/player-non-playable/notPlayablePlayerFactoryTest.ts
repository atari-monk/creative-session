import 'reflect-metadata';
import { Container } from 'inversify';
import { NotPlayablePlayerFactory } from './NotPlayablePlayerFactory';
import { SharedPlayerFactory } from '../player-shared/SharedPlayerFactory';

const container = new Container();
const sharedPlayerFactory = new SharedPlayerFactory(container);
const playerFactory = new NotPlayablePlayerFactory(container);
sharedPlayerFactory.registerDependencies();
playerFactory.registerDependencies();
const player = playerFactory.resolve();
const x = player.position.x;
const y = player.position.x;
console.log('position', x, y);

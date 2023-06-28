import 'reflect-metadata';
import { Container } from 'inversify';
import { PlayablePlayerFactory } from '../player/playerFactory/PlayablePlayerFactory';
import { SharedPlayerFactory } from '../player/playerFactory/SharedPlayerFactory';

const container = new Container();
const sharedPlayerFactory = new SharedPlayerFactory(container);
const playerFactory = new PlayablePlayerFactory(container);
sharedPlayerFactory.registerDependencies();
playerFactory.registerDependencies();
const player = playerFactory.resolve();
const x = player.position.x;
const y = player.position.x;
console.log('position', x, y);

import 'reflect-metadata';
import { Container } from 'inversify';
import { PlayablePlayerFactory } from './PlayerFactory';
import { SharedPlayerFactory } from '../player-shared/SharedPlayerFactory';

const container = new Container();
const sharedPlayerFactory = new SharedPlayerFactory(container);
const playerFactory = new PlayablePlayerFactory(container);
sharedPlayerFactory.registerDependencies();
playerFactory.registerDependencies();
const player = playerFactory.resolve();
console.log(
  `position: (${player.position.x}, ${player.position.y})`
);
player.diagnoze();

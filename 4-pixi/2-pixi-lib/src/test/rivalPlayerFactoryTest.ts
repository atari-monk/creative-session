import 'reflect-metadata';
import { Container } from 'inversify';
import { RivalPlayerFactory } from '../player/playerFactory/RivalPlayerFactory';
import { SharedPlayerFactory } from '../player/playerFactory/SharedPlayerFactory';

const container = new Container();
const sharedPlayerFactory = new SharedPlayerFactory(container);
const rivalPlayerFactory = new RivalPlayerFactory(container);
sharedPlayerFactory.registerDependencies();
rivalPlayerFactory.registerDependencies();
const player = rivalPlayerFactory.resolve();
const x = player.position.x;
const y = player.position.x;
console.log('position', x, y);

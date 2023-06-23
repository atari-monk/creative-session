import 'reflect-metadata';
import { Container } from 'inversify';
import { RivalPlayerFactory } from '../player/playerFactory/RivalPlayerFactory';

const container = new Container();
const rivalPlayerFactory = new RivalPlayerFactory(container);
rivalPlayerFactory.registerDependencies();
const player = rivalPlayerFactory.resolveRivalPlayer();
const x = player.position.x;
const y = player.position.x;
console.log('fin');
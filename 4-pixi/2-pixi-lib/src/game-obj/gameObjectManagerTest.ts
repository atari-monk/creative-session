import 'reflect-metadata';
import { Container } from 'inversify';
import { IGameObjectManager } from 'atari-monk-game-api-lib';
import { PlayerFactory } from '../player/PlayerFactory';
import { ServiceFactory } from '../service/ServiceFactory';
import { PlayerNpcFactory } from '../player-npc/PlayerNpcFactory';
import { BallFactory } from '../ball/BallFactory';
import { SharedTypes } from '../di-container/types';

const container = new Container();
const serviceFactory = new ServiceFactory(container);
const playerFactory = new PlayerFactory(container);
const playerNpcFactory = new PlayerNpcFactory(container);
const ballFactory = new BallFactory(container);

serviceFactory.register();
playerFactory.register();
playerNpcFactory.register();
ballFactory.register();

const player = playerFactory.create();
const playerNpc = playerNpcFactory.create();
const ball = ballFactory.create();
const manager = container.get<IGameObjectManager>(SharedTypes.GameObjsManager);

manager.addGameObject(player);
manager.addGameObject(playerNpc);
manager.addGameObject(ball);

const ballFound = manager.findBall();
const playerFound = manager.findPlayer();

console.log(ballFound.toString());
console.log(playerFound.toString());

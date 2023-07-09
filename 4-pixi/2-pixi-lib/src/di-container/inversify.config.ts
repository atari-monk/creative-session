import { Container } from 'inversify';
import { AppFactory } from '../app/AppFactory';

export const container = new Container();

const appFactory = new AppFactory(container);
appFactory.register();
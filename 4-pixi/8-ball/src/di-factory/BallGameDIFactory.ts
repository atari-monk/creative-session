import { Container } from 'inversify';
import { configureContainer } from './inversify.config';

export class BallGameDIFactory {
  constructor() {
    configureContainer(new Container());
  }
}

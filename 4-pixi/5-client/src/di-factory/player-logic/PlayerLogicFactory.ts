import { Container, injectable } from 'inversify';
import { IDIFactory } from '../IDIFactory';
import { PlayerManagerCreator } from './PlayerManagerCreator';
import { IPlayerManager } from '../../IPlayerManager';
import { PlayerManager } from '../../PlayerManager';
import { PlayerLogicCreator } from './PlayerLogicCreator';
import { PlayerConnectLogic } from '../../socket-logic/PlayerConnectLogic';
import { Socket } from 'socket.io-client';
import { PlayerList } from '../../socket-logic/PlayerList';
import { PlayerMovement } from '../../socket-logic/PlayerMovement';
import { SocketLogicManager } from 'atari-monk-pixi-lib';

@injectable()
export class PlayerLogicFactory implements IDIFactory<SocketLogicManager> {
  public register(container: Container) {
    container.bind<IPlayerManager>(PlayerManager).toSelf().inSingletonScope();
    container
      .bind<PlayerConnectLogic>(PlayerConnectLogic)
      .toDynamicValue(() => {
        return new PlayerConnectLogic(
          'connect',
          container.resolve<Socket>(Socket),
          container.resolve<IPlayerManager>(PlayerManager)
        );
      })
      .inSingletonScope();
    container
      .bind<PlayerList>(PlayerList)
      .toDynamicValue(() => {
        return new PlayerList(
          'clientIdList',
          container.resolve<Socket>(Socket),
          container.resolve<IPlayerManager>(PlayerManager)
        );
      })
      .inSingletonScope();
    container
      .bind<PlayerMovement>(PlayerMovement)
      .toDynamicValue(() => {
        return new PlayerMovement(
          'movement',
          container.resolve<IPlayerManager>(PlayerManager)
        );
      })
      .inSingletonScope();
  }

  public create(container: Container) {
    container.resolve(PlayerManagerCreator).create();
    const playerLogic = container.resolve(PlayerLogicCreator).create();
    playerLogic.initializeSocket(container.resolve<Socket>(Socket));
    return playerLogic;
  }
}

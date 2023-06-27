import { IVectorData, SocketLogicUnit, Vector2d } from 'atari-monk-pixi-lib';
import { BallManager } from '../BallManager';

export class BallMovement extends SocketLogicUnit {
  constructor(eventName: string, private readonly ballManager: BallManager) {
    super(eventName);
  }

  protected logicUnit(jsObj: any) {
    try {
      const newData: IVectorData = {
        clientId: jsObj.clientId,
        newVector: new Vector2d(jsObj.newVector.x, jsObj.newVector.y),
      };
      this.ballManager.updateBallPosition(newData.newVector);
    } catch (error) {
      console.log(error);
    }
  }
}

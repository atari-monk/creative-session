import * as PIXI from 'pixi.js';
export declare class RobotBody {
    #private;
    constructor();
    draw(stage: any): void;
    get container(): PIXI.Container<PIXI.DisplayObject>;
    get leftArmJoint(): any;
    get rightArmJoint(): any;
    get leftLegJoint(): any;
    get rightLegJoint(): any;
}

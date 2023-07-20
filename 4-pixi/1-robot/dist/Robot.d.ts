import { GameObject } from 'atari-monk-pixi-lib';
export declare class Robot extends GameObject {
    #private;
    constructor(pixiApp: any, body: any);
    draw(stage: any): void;
    update(_deltaTime: any): void;
}

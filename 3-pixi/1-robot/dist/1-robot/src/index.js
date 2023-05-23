"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js");
const AppHelper_js_1 = require("./../../pixi-lib/AppHelper.js");
const Renderer_js_1 = require("./../../pixi-lib/Renderer.js");
const Robot_js_1 = require("./Robot.js");
const RobotBody_js_1 = require("./RobotBody.js");
const appHelperOptions = {
    width: 800,
    height: 600,
    backgroundColor: 0x000000,
    fullScreen: false,
    canvasId: 'canvas',
};
const appHelper = new AppHelper_js_1.AppHelper(appHelperOptions);
const pixiApp = new PIXI.Application(appHelper.getPixiAppOptions());
const renderer = new Renderer_js_1.Renderer(appHelper, pixiApp, appHelperOptions);
const robotBody = new RobotBody_js_1.RobotBody();
const robot = new Robot_js_1.Robot(pixiApp, robotBody);
appHelper.initializeApp(pixiApp, renderer);
appHelper.addGameObject(robot);
appHelper.startAnimationLoop();

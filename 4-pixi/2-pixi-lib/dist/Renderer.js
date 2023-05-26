"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Renderer = void 0;
class Renderer {
    constructor(appHelper, pixiApp) {
        this.appHelper = appHelper;
        this.pixiApp = pixiApp;
    }
    render(deltaTime) {
        this.pixiApp.stage.removeChildren();
        this.updateAndDrawGameObjects(deltaTime);
    }
    updateAndDrawGameObjects(deltaTime) {
        for (const gameObject of this.appHelper.gameObjects) {
            gameObject.update(deltaTime);
            gameObject.draw(this.pixiApp.stage);
        }
    }
}
exports.Renderer = Renderer;

export class Renderer {
    #app;
    #pixiApp;
    #width;
    #height;
    #backgroundColor;

    constructor(app, pixiApp, width, height, backgroundColor) {
        this.#app = app;
        this.#pixiApp = pixiApp;
        this.#width = width;
        this.#height = height;
        this.#backgroundColor = backgroundColor;
    }

    renderBackground() {
    // eslint-disable-next-line no-undef
        const background = new PIXI.Graphics();
        background.beginFill(this.#backgroundColor);
        background.drawRect(0, 0, this.#width, this.#height);
        background.endFill();
        return background;
    }

    updateAndDrawGameObjects(deltaTime) {
        for (const gameObject of this.#app.gameObjects) {
            if (gameObject.isPlayable) {
                gameObject.update(deltaTime);
            } else if (gameObject.isBall) {
                gameObject.update(deltaTime, this.#app.gameObjects);
            }
            gameObject.draw(this.#pixiApp.stage);
        }
    }

    render(deltaTime) {
        this.#pixiApp.stage.removeChildren();

        this.#pixiApp.stage.addChild(this.renderBackground());
        console.log(this.#pixiApp.gameObjects);
        this.updateAndDrawGameObjects(deltaTime);

        this.#pixiApp.renderer.render(this.#pixiApp.stage);
    }
}

export class Robot {
    constructor(app, container) {
        this.app = app;
        this.container = container;
        this.robotX = 0;
        this.robotDirection = 1;

        this.createBodyParts();
        this.setInitialPositions();

        app.ticker.add(() => {
            this.update();
        });
    }

    createBodyParts() {
        this.head = PIXI.Sprite.from("./assets/head.png");
        this.torso = PIXI.Sprite.from("./assets/torso.png");
        this.leftArm = PIXI.Sprite.from("./assets/left-arm.png");
        this.rightArm = PIXI.Sprite.from("./assets/right-arm.png");
        this.leftLeg = PIXI.Sprite.from("./assets/left-leg.png");
        this.rightLeg = PIXI.Sprite.from("./assets/right-leg.png");

        this.container.addChild(
            this.head,
            this.rightArm,
            this.leftLeg,
            this.rightLeg,
            this.torso,
            this.leftArm
        );
    }

    setInitialPositions() {
        this.head.position.set(160, 50);
        this.torso.position.set(90, 120);
        this.leftArm.position.set(65, 150);
        this.rightArm.position.set(225, 150);
        this.leftLeg.position.set(110, 290);
        this.rightLeg.position.set(170, 285);
    }

    update() {
        this.robotX += 5 * this.robotDirection;

        this.leftArm.rotation = Math.sin(this.app.ticker.lastTime / 100) * 0.2;
        this.rightArm.rotation =
            -Math.sin(this.app.ticker.lastTime / 100) * 0.2;
        this.leftLeg.rotation = -Math.sin(this.app.ticker.lastTime / 100) * 0.2;
        this.rightLeg.rotation = Math.sin(this.app.ticker.lastTime / 100) * 0.2;

        if (
          this.robotX >= this.app.renderer.width - this.container.width ||
          this.robotX <= 0
        ) {
          this.robotDirection *= -1;
        }

        this.container.position.x = this.robotX;
    }
}

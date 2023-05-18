import { GameObject } from './../pixi-lib/GameObject.js';

export class Robot extends GameObject {
  #pixiApp;

  constructor(pixiApp) {
    super();
    this.#pixiApp = pixiApp;
    this.container = new PIXI.Container();
    this.robotX = 0;
    this.robotDirection = 1;

    this.#createBodyParts();
    this.#setInitialPositions();
  }

  #createBodyParts() {
    this.head = PIXI.Sprite.from('./assets/head.png');
    this.torso = PIXI.Sprite.from('./assets/torso.png');

    // Create the joint sprites for the arms and legs
    this.leftArmJoint = new PIXI.Container();
    this.rightArmJoint = new PIXI.Container();
    this.leftLegJoint = new PIXI.Container();
    this.rightLegJoint = new PIXI.Container();

    // Create the arm and leg sprites
    this.leftArm = PIXI.Sprite.from('./assets/left-arm.png');
    this.rightArm = PIXI.Sprite.from('./assets/right-arm.png');
    this.leftLeg = PIXI.Sprite.from('./assets/left-leg.png');
    this.rightLeg = PIXI.Sprite.from('./assets/right-leg.png');

    // Add the arm and leg sprites to the joint containers
    this.leftArmJoint.addChild(this.leftArm);
    this.rightArmJoint.addChild(this.rightArm);
    this.leftLegJoint.addChild(this.leftLeg);
    this.rightLegJoint.addChild(this.rightLeg);

    // Add the joint containers to the torso
    this.torso.addChild(
      this.leftArmJoint,
      this.rightArmJoint,
      this.leftLegJoint,
      this.rightLegJoint
    );

    // Add the body parts to the main container
    this.container.addChild(this.head, this.torso);
  }

  #setInitialPositions() {
    this.head.position.set(160, 50);
    this.torso.position.set(90, 120);
    this.leftArmJoint.position.set(-20, 20);
    this.rightArmJoint.position.set(140, 20);
    this.leftLegJoint.position.set(25, 180);
    this.rightLegJoint.position.set(80, 170);
  }

  draw(stage) {
    this.#pixiApp.stage.addChild(this.container);
  }

  update(deltaTime) {
    const time = this.#pixiApp.ticker.lastTime;
    this.robotX += 1 * this.robotDirection;


    // Update the position of the robot container
    this.container.position.x = this.robotX;

    // Rotate the arms and legs relative to the torso
    const armRotation = Math.sin(time / 100) * 0.05;
    const legRotation = -Math.sin(time / 100) * 0.1;

    this.leftArmJoint.rotation = armRotation;
    this.rightArmJoint.rotation = -armRotation;
    this.leftLegJoint.rotation = legRotation;
    this.rightLegJoint.rotation = -legRotation;

    if (
      this.robotX >= this.#pixiApp.renderer.width - this.container.width ||
      this.robotX <= 0
    ) {
      this.robotDirection *= -1;
    }
  }
}

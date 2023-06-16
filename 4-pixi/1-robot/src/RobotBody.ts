import * as PIXI from 'pixi.js';

export class RobotBody {
  #container;
  #head: any;
  #torso: any;
  #leftArmJoint: any;
  #rightArmJoint: any;
  #leftLegJoint: any;
  #rightLegJoint: any;
  #leftArm: any;
  #rightArm: any;
  #leftLeg: any;
  #rightLeg: any;

  constructor() {
    this.#container = new PIXI.Container();
    this.#createBodyParts();
    this.#setInitialPositions();
  }

  #createBodyParts() {
    this.#createHead();
    this.#createTorso();
    this.#createJointContainers();
    this.#createArmAndLegSprites();
    this.#addSpritesToContainers();
    this.#addContainersToTorso();
    this.#addBodyPartsToContainer();
  }

  #createHead() {
    this.#head = PIXI.Sprite.from('./assets/head.png');
  }

  #createTorso() {
    this.#torso = PIXI.Sprite.from('./assets/torso.png');
  }

  #createJointContainers() {
    this.#leftArmJoint = new PIXI.Container();
    this.#rightArmJoint = new PIXI.Container();
    this.#leftLegJoint = new PIXI.Container();
    this.#rightLegJoint = new PIXI.Container();
  }

  #createArmAndLegSprites() {
    this.#leftArm = PIXI.Sprite.from('./assets/left-arm.png');
    this.#rightArm = PIXI.Sprite.from('./assets/right-arm.png');
    this.#leftLeg = PIXI.Sprite.from('./assets/left-leg.png');
    this.#rightLeg = PIXI.Sprite.from('./assets/right-leg.png');
  }

  #addSpritesToContainers() {
    this.#leftArmJoint.addChild(this.#leftArm);
    this.#rightArmJoint.addChild(this.#rightArm);
    this.#leftLegJoint.addChild(this.#leftLeg);
    this.#rightLegJoint.addChild(this.#rightLeg);
  }

  #addContainersToTorso() {
    this.#torso.addChild(
      this.#leftArmJoint,
      this.#rightArmJoint,
      this.#leftLegJoint,
      this.#rightLegJoint
    );
  }

  #addBodyPartsToContainer() {
    this.#container.addChild(this.#head, this.#torso);
  }

  #setInitialPositions() {
    this.#head.position.set(160, 50);
    this.#torso.position.set(90, 120);
    this.#leftArmJoint.position.set(-20, 20);
    this.#rightArmJoint.position.set(140, 20);
    this.#leftLegJoint.position.set(25, 180);
    this.#rightLegJoint.position.set(80, 170);
  }

  draw(stage: any) {
    stage.addChild(this.#container);
  }

  get container() {
    return this.#container;
  }

  get leftArmJoint() {
    return this.#leftArmJoint;
  }

  get rightArmJoint() {
    return this.#rightArmJoint;
  }

  get leftLegJoint() {
    return this.#leftLegJoint;
  }

  get rightLegJoint() {
    return this.#rightLegJoint;
  }
}

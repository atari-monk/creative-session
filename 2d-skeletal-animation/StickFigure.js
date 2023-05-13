export class StickFigure {
  constructor(app, container, keyboard) {
    this.app = app;
    this.container = container;
    this.keyboard = keyboard;

    // Create the robot's body (rectangle)
    this.body = new PIXI.Graphics();
    this.body.beginFill(0x0000ff);
    this.body.drawRect(-30, -50, 60, 100);
    this.body.endFill();

    // Create the arm joint
    this.armJoint = new PIXI.Container();

    // Create the arm segment (rectangle)
    this.arm = new PIXI.Graphics();
    this.arm.beginFill(0x00ff00);
    this.arm.drawRect(-10, 0, 20, 80);
    this.arm.endFill();

    // Add the arm segment to the arm joint container
    this.armJoint.addChild(this.arm);

    // Position the arm joint relative to the robot's body
    this.armJoint.position.set(30, -20);

    // Add the body and arm joint to the container
    this.container.addChild(this.body, this.armJoint);

    // Arm bending properties
    this.armRotation = 0;
    this.armRotationSpeed = 0.05; // Speed of arm rotation
  }

  update() {
    // Update the arm rotation based on keyboard input
    if (this.keyboard.isKeyDown('ArrowUp')) {
      this.armRotation -= this.armRotationSpeed;
    } else if (this.keyboard.isKeyDown('ArrowDown')) {
      this.armRotation += this.armRotationSpeed;
    }

    // Apply the arm rotation to the arm joint
    this.armJoint.rotation = this.armRotation;
  }
}

export class StickFigure {
  constructor(app, container) {
    this.app = app;
    this.container = container;

    // Create the torso rectangle
    this.torso = new PIXI.Graphics();
    this.torso.beginFill(0xff0000);
    this.torso.drawRect(-25, -50, 50, 100);
    this.torso.endFill();

    // Add the torso to the container
    this.container.addChild(this.torso);

    // Set the initial position of the stick figure
    this.container.position.set(app.view.width / 2, app.view.height / 2 + 50);
  }

  update() {
    // Apply any transformations or animations to the stick figure here
  }
}

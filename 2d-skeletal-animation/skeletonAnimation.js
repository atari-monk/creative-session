// Create the canvas element
const canvas = document.getElementById("canvas");

// Set the desired width and height of the canvas
const newWidth = 1900;
const newHeight = 1800;

// Update the canvas size
canvas.width = newWidth;
canvas.height = newHeight;

// Create the PIXI application with the canvas element
const app = new PIXI.Application({ view: canvas, backgroundColor: 0x000000 });

// Update the PIXI application size
app.renderer.resize(newWidth, newHeight);

// Create the robot container
const robot = new PIXI.Container();

// Load the skeletal sprites and create the robot body parts
const head = PIXI.Sprite.from("./assets/head.png");
const torso = PIXI.Sprite.from("./assets/torso.png");
const leftArm = PIXI.Sprite.from("./assets/left-arm.png");
const rightArm = PIXI.Sprite.from("./assets/right-arm.png");
const leftLeg = PIXI.Sprite.from("./assets/left-leg.png");
const rightLeg = PIXI.Sprite.from("./assets/right-leg.png");

// Set the initial positions of the body parts
head.position.set(160, 0);
torso.position.set(20, 130);
leftArm.position.set(-90, 150);
rightArm.position.set(300, 150);
leftLeg.position.set(60, 480);
rightLeg.position.set(190, 480);

// Add the body parts to the robot container
robot.addChild(head, rightArm, leftLeg, rightLeg, torso, leftArm);

// Add the robot to the PIXI stage
app.stage.addChild(robot);

// Set the initial position and direction of the robot
let robotX = 0;
let robotDirection = 1; // 1 for moving right, -1 for moving left

// Create a simple animation loop
app.ticker.add(() => {
	// Move the robot horizontally
	robotX += 5 * robotDirection; // Adjust the speed as needed

	// Move the limbs back and forth
	leftArm.rotation = Math.sin(app.ticker.lastTime / 100) * 0.2;
	rightArm.rotation = -Math.sin(app.ticker.lastTime / 100) * 0.2;
	leftLeg.rotation = -Math.sin(app.ticker.lastTime / 100) * 0.2;
	rightLeg.rotation = Math.sin(app.ticker.lastTime / 100) * 0.2;

	// Reverse direction if the robot reaches the screen edges
	if (robotX >= newWidth - robot.width || robotX <= 0) {
		robotDirection *= -1;
	}

	// Update the robot's position
	robot.position.x = robotX;
});

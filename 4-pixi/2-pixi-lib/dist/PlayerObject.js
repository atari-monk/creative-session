"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerObject = void 0;
const PIXI = require("pixi.js");
const GameObject_js_1 = require("./GameObject.js");
class PlayerObject extends GameObject_js_1.GameObject {
    constructor(keyboard, options = {}) {
        super();
        this.keyboard = keyboard;
        this.id = options.id;
        this.radius = options.radius;
        this.speed = options.speed;
        this.width = options.width;
        this.height = options.height;
        this.direction = { x: 0, y: 0 };
        this.position = { x: this.width / 2, y: this.height / 2 };
        this.keys = options.keys;
        this.color = options.color;
        this.isPlayable = options.isPlayable;
        this.playerNr = options.playerNr;
    }
    setPosition(newPosition) {
        this.position = Object.assign({}, newPosition);
    }
    handleKeyboardInput() {
        if (!this.isPlayable)
            return;
        const direction = { x: 0, y: 0 };
        const { keys } = this;
        if (this.keyboard.isKeyDown(keys.left) || this.keyboard.isKeyDown(keys.a)) {
            direction.x -= 1;
        }
        if (this.keyboard.isKeyDown(keys.right) ||
            this.keyboard.isKeyDown(keys.d)) {
            direction.x += 1;
        }
        if (this.keyboard.isKeyDown(keys.up) || this.keyboard.isKeyDown(keys.w)) {
            direction.y -= 1;
        }
        if (this.keyboard.isKeyDown(keys.down) || this.keyboard.isKeyDown(keys.s)) {
            direction.y += 1;
        }
        const length = Math.sqrt(Math.pow(direction.x, 2) + Math.pow(direction.y, 2));
        if (length !== 0) {
            direction.x /= length;
            direction.y /= length;
        }
        this.direction = direction;
        this.emitMovementEventIfNeeded();
    }
    emitMovementEventIfNeeded() {
        const newPosition = {
            x: this.position.x + this.direction.x * this.speed,
            y: this.position.y + this.direction.y * this.speed,
        };
        if (this.isPlayable &&
            this.client &&
            this.clientId &&
            (newPosition.x !== this.position.x || newPosition.y !== this.position.y)) {
            this.position = newPosition;
            this.client.socket.emit('movement', {
                clientId: this.clientId,
                newPosition: this.position,
            });
        }
    }
    update(deltaTime) {
        this.handleKeyboardInput();
        const velocity = {
            x: this.direction.x * this.speed * deltaTime,
            y: this.direction.y * this.speed * deltaTime,
        };
        this.position.x += velocity.x;
        this.position.y += velocity.y;
    }
    draw(stage) {
        this.drawPlayerCircle(stage);
        this.drawPositionCircle(stage);
        this.drawDirectionLine(stage);
    }
    drawPlayerCircle(stage) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(this.color.player);
        graphics.drawCircle(this.position.x, this.position.y, this.radius);
        graphics.endFill();
        stage.addChild(graphics);
    }
    drawPositionCircle(stage) {
        const positionGraphics = new PIXI.Graphics();
        positionGraphics.beginFill(this.color.position);
        positionGraphics.drawCircle(0, 0, 4);
        positionGraphics.endFill();
        positionGraphics.x = this.position.x;
        positionGraphics.y = this.position.y;
        stage.addChild(positionGraphics);
    }
    drawDirectionLine(stage) {
        const directionGraphics = new PIXI.Graphics();
        directionGraphics.lineStyle(2, this.color.direction);
        directionGraphics.moveTo(this.position.x, this.position.y);
        const directionX = this.direction.x * (this.radius / 2);
        const directionY = this.direction.y * (this.radius / 2);
        directionGraphics.lineTo(this.position.x + directionX, this.position.y + directionY);
        stage.addChild(directionGraphics);
    }
    kickBall(ball) {
        const velocity = {
            x: this.direction.x * this.speed * 2,
            y: this.direction.y * this.speed * 2,
        };
        ball.setVelocity(velocity);
        ball.emitVelocity();
    }
}
exports.PlayerObject = PlayerObject;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BallObject = void 0;
const PIXI = __importStar(require("pixi.js"));
const GameObject_js_1 = require("./GameObject.js");
class BallObject extends GameObject_js_1.GameObject {
    constructor(options) {
        super();
        const { id, radius, speed, width, height, keyboard, keys, color, isBall } = options;
        this.id = id;
        this.radius = radius;
        this.speed = speed;
        this.width = width;
        this.height = height;
        this.position = { x: width / 2, y: height / 2 };
        this.direction = { x: 0, y: 0 };
        this.keyboard = keyboard;
        this.keys = keys;
        this.color = color;
        this.isBall = isBall;
        this.velocity = { x: 0, y: 0 };
        this.client = undefined;
    }
    setPosition(newPosition) {
        this.position.x = newPosition.x;
        this.position.y = newPosition.y;
    }
    setVelocity(newVelocity) {
        this.velocity.x = newVelocity.x;
        this.velocity.y = newVelocity.y;
    }
    getVelocity() {
        return this.velocity;
    }
    setDirection(newDirection) {
        this.direction.x = newDirection.x;
        this.direction.y = newDirection.y;
    }
    emitPossition() {
        if (this.velocity.x === 0 && this.velocity.y === 0)
            return;
        //console.log('ballMovement');
        this.client.socket.emit('ballMovement', {
            clientId: this.client.clientId,
            newPosition: this.position,
        });
    }
    emitVelocity() {
        this.client.socket.emit('ballVelocity', {
            clientId: this.client.clientId,
            newVelocity: this.velocity,
        });
    }
    update(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.emitPossition();
    }
    draw(stage) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(this.color.player);
        graphics.drawCircle(this.position.x, this.position.y, this.radius);
        graphics.endFill();
        stage.addChild(graphics);
        this.drawVectors(stage);
    }
    drawVectors(stage) {
        const positionGraphics = new PIXI.Graphics();
        positionGraphics.beginFill(this.color.position);
        positionGraphics.drawCircle(0, 0, 4);
        positionGraphics.endFill();
        positionGraphics.x = this.position.x;
        positionGraphics.y = this.position.y;
        stage.addChild(positionGraphics);
        const directionGraphics = new PIXI.Graphics();
        directionGraphics.lineStyle(2, this.color.direction);
        directionGraphics.moveTo(this.position.x, this.position.y);
        const directionX = this.direction.x * (this.radius / 2);
        const directionY = this.direction.y * (this.radius / 2);
        directionGraphics.lineTo(this.position.x + directionX, this.position.y + directionY);
        stage.addChild(directionGraphics);
    }
    checkCircularCollision(obj1, obj2) {
        const distanceX = obj1.position.x - obj2.position.x;
        const distanceY = obj1.position.y - obj2.position.y;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        if (distance < obj1.radius + obj2.radius) {
            //console.log('collision');
            // Collision detected
            return true;
        }
        // No collision
        return false;
    }
    bounce() {
        const currentVelocity = this.getVelocity();
        const reversedVelocity = {
            x: -currentVelocity.x,
            y: -currentVelocity.y,
        };
        this.setVelocity(reversedVelocity);
        this.emitVelocity();
        console.log(this.velocity);
    }
    handleCollisions(gameObject) {
        if (!this.checkCircularCollision(this, gameObject))
            return;
        if (gameObject.direction.x !== 0 || gameObject.direction.y !== 0) {
            gameObject.kickBall(this);
            console.log('kick');
            gameObject.cantBounce = true;
            setTimeout(() => {
                gameObject.cantBounce = false;
            }, 1000);
        }
        if (!gameObject.cantBounce &&
            gameObject.direction.x === 0 &&
            gameObject.direction.y === 0) {
            this.bounce();
            console.log('bounce');
        }
    }
}
exports.BallObject = BallObject;

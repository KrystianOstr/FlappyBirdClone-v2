import "./style.css";
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
};

const VELOCITY = 200;

let bird = null;
let m = null;
let upperPipe = null;
let lowerPipe = null;

const pipeVerticalDistanceRange = [150, 250];
let pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
let pipeVerticalPosition = Phaser.Math.Between(
  0 + 20,
  config.height - 20 - pipeVerticalDistance
);

const flapVelocity = VELOCITY - 50;
const initialBirdPosition = { x: config.width / 10, y: config.height / 2 };

function preload() {
  this.load.image("bg", "./assets/sky.png");
  this.load.image("bird", "./assets/bird.png");
  this.load.image("pipe", "./assets/pipe.png");
}

function create() {
  this.add.image(0, 0, "bg").setOrigin(0);

  bird = this.physics.add
    .sprite(initialBirdPosition.x, initialBirdPosition.y, "bird")
    .setOrigin(0);
  bird.body.gravity.y = 400;

  upperPipe = this.physics.add
    .sprite(400, pipeVerticalPosition, "pipe")
    .setOrigin(0, 1);
  lowerPipe = this.physics.add
    .sprite(400, upperPipe.y + pipeVerticalDistance, "pipe")
    .setOrigin(0, 0);

  this.input.on("pointerdown", flap);
  this.input.keyboard.on("keydown-SPACE", flap);
}

function update(time, delta) {
  birdPosition();
}

new Phaser.Game(config);

function turnOffGravity() {
  if (bird.y >= config.height) this.physics.world.gravity.y = -300;
  else this.physics.world.gravity.y = 300;
}

function birdPosition() {
  if (bird.y > config.height || bird.y < 0 - bird.height) {
    // restartPlayerPosition();
  }
}

function restartPlayerPosition() {
  bird.x = initialBirdPosition.x;
  bird.y = initialBirdPosition.y;
}

function flap() {
  bird.body.velocity.y = -flapVelocity;
}

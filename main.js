import "./style.css";
import Phaser from "phaser";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
  },
  scene: {
    preload,
    create,
    update,
  },
};

let bird = null;

function preload() {
  this.load.image("bg", "./assets/sky.png");
  this.load.image("bird", "./assets/bird.png");
}

function create() {
  // this.add.image(config.width / 2, config.height / 2, "bg"); <- the same like the one on the bottom
  this.add.image(0, 0, "bg").setOrigin(0);
  bird = this.physics.add
    .sprite(config.width / 10, config.height / 2, "bird")
    .setOrigin(0);

  bird.body.velocity.y = 500;
}

function update() {
  // console.log(`object`);
}

new Phaser.Game(config);

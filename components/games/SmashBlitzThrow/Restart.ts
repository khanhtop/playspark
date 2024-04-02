export class Restart {
  scene: Phaser.Scene;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;

    this.scene.events.on("LoseManager:onRestartClick", () => {
      this.scene.events.emit("RESTART");
    });

    this.scene.events.on("LoseManager:onReviveClick", () => {});
  }
}

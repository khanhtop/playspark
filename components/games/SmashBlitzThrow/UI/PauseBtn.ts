export class PauseBtn {
  scene: Phaser.Scene;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;

    let btn = _scene.add
      .sprite(50, 40, "pause_play")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(65, 65)
      .setInteractive();
    btn.on("pointerdown", () => {
      this.scene.events.emit("PauseBtn:onClick");
    });
  }
}

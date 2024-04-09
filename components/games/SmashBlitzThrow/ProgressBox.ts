import { getValuePercentage } from "./Helper";

export class ProgressBox {
  scene: Phaser.Scene;

  public static instance: ProgressBox;
  private group: Phaser.GameObjects.Container;
  private pointer: Phaser.GameObjects.Sprite;
  private power_progress: Phaser.GameObjects.Sprite;
  private tween: Phaser.Tweens.Tween;
  private moveLength: number;
  private currentX: number;
  private startPosX = 3;
  private endPosX = 275;
  private green_area: Phaser.GameObjects.Graphics;
  private green_area_percent: number = 1;
  private greenAreaWidth = 50;
  private greenAreaHeight = 28;

  constructor(_scene: Phaser.Scene) {
    ProgressBox.instance = this;

    this.scene = _scene;
    this.group = _scene.add.container();

    this.moveLength = this.endPosX - this.startPosX;
    this.currentX = 3;

    this.green_area = this.scene.add.graphics();

    this.pointer = _scene.add
      .sprite(this.startPosX - this.moveLength / 2, 0, "pointer")
      .setScale(0.4, 0.4)
      .setOrigin(0.5, 0.5);

    this.power_progress = _scene.add
      .sprite(0, 0, "power_progress")
      .setScale(0.4, 0.4)
      .setOrigin(0.5, 0.5);

    this.group.add(this.power_progress);
    this.group.add(this.green_area);
    this.group.add(this.pointer);

    this.tween = _scene.tweens.add({
      targets: this.pointer,
      x: this.endPosX - this.moveLength / 2,
      duration: 3000,
      repeat: -1,
      ease: "linear",
      yoyo: true,
      onUpdate: (tween) => {
        this.currentX = tween.getValue();
      },
    });

    _scene.events.on(
      "ProgressBox:setGreenAreaWidth",
      (widthPercent: number) => {
        this.green_area_percent = widthPercent;
        this.greenAreaWidth = this.moveLength * widthPercent;
        this.setGreenAreaWidth();
      }
    );

    _scene.events.on("ProgressBox:setTimeScale", (value: number) => {
      this.tween.setTimeScale(value);
      // this.tween.stop()
      // this.tween.restart()
    });
  }
  setGreenAreaWidth() {
    this.green_area
      .fillStyle(0x00ff00, 1) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
      .fillRect(
        0 - this.greenAreaWidth / 2,
        0 - this.greenAreaHeight / 2,
        this.greenAreaWidth,
        this.greenAreaHeight
      );
  }

  setPos(x: number, y: number) {
    this.green_area
      .fillStyle(0x00ff00, 1) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
      .fillRect(
        0 - this.greenAreaWidth / 2,
        0 - this.greenAreaHeight / 2,
        this.greenAreaWidth,
        this.greenAreaHeight
      );

    this.group.setPosition(x, y);
  }
  //setPercent(percent: number) {
  //this.power_effect.setFrame(Math.round(percent * 15));
  // }
  public getPercent() {
    let p = getValuePercentage(this.currentX, this.startPosX, this.endPosX); 
    if (Math.abs(p*2) < this.green_area_percent) return 0;
    // p is -0.5 to 0.5 we must multiple it to get range -1,1
    else return p * 2;
  }
}

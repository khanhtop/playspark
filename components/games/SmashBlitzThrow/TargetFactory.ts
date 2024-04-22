import { Targets } from "./Targets";

export class TargetFactory {
  scene: Phaser.Scene;
  targetManager!: Targets;
  width: number = 0;
  height: number = 0;
  heightFactor: number = 0;
  size: number = 0;
  constructor(_scene: Phaser.Scene, _width: number, _height: number,size:number) {
    this.scene = _scene;
    this.targetManager = new Targets(_scene);
    this.width = _width;
    this.height = _height;
    this.heightFactor = this.height / 6;
    this.size = size;
  }
  init() {
   
    let bomb = this.targetManager.create(
      "bomb",
      "bomb",
      this.width - 100,
      this.heightFactor * 0.7,
      this.size,
      this.size
    );
    let gold_ball = this.targetManager.create(
      "gold_ball1",
      "gold_ball",
      this.width - 70,
      this.heightFactor * 1.8,
      this.size,
      this.size
    );
    let purple_ball = this.targetManager.create(
      "purple_ball1",
      "purple_ball",
      this.width - 50,
      this.heightFactor * 3,
      this.size,
      this.size
    );
    let purple_ball2 = this.targetManager.create(
      "purple_ball2",
      "purple_ball",
      this.width - 70,
      this.heightFactor * 4.1,
      this.size,
      this.size
    );
    let gold_ball2 = this.targetManager.create(
      "gold_ball2",
      "gold_ball",
      this.width - 100,
      this.heightFactor * 5.2,
      this.size,
      this.size
    );
  }
}

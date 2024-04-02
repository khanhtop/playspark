import { Observer } from "./Observer";
import { Targets } from "./Targets";

export class BallAndTargetsOverlap {
  scene: Phaser.Scene;
  isInit = false;
  canHit = false;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;
  }
  public init(ball: Phaser.Types.Physics.Arcade.ImageWithDynamicBody) {
    if (this.isInit) return;
    this.isInit = true;
    this.canHit = true;
    Targets.instance?.getAllTargets().forEach((element) => {
      const bombsCollider = this.scene.physics.add.overlap(
        ball,
        element,
        (_ball, target) => {
          //console.log(target);
          if (!this.canHit) return;
          this.canHit = false;
          this.scene.events.emit("BallAndTargetsOverlap:onOverLap", target);
          setTimeout(() => {
            this.canHit = true;
          }, 500);
          (target as Phaser.Types.GameObjects.Sprite.SpriteConfig).alpha = 0.0;
        }
      );
    });
  }
}

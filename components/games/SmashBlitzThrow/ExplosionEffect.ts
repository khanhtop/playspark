import { Observer } from "./Observer";
import { Targets } from "./Targets";

export class ExplosionEffect {
  scene: Phaser.Scene;
  isInit = false;
  ball_effect: Phaser.GameObjects.Sprite;
  
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;

    this.ball_effect = this.scene.add
      .sprite(200, 200, "ball_effect")
      .setDisplaySize(150, 150)
      .setOrigin(0.5, 0.5);
    this.ball_effect.setVisible(false);

    const ball_frame = this.scene.anims.generateFrameNames("ball_effect", {
      start: 0,
      end: 3,
    });
    this.scene.anims.create({
      key: "ball_effect",
      frames: ball_frame,
      frameRate: 16,
      repeat: 2,
      hideOnComplete: true,
    });

    this.ball_effect.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE,
      (d: any) => {
      
        this.scene.events.emit("ExplosionEffect:onAnimFinished");
      },
      this
    );

    this.scene.events.on("BallAndTargetsOverlap:onOverLap", (target: any) => {
     
      this.play(target);
    });
  }
  play(targetPos: Phaser.Types.Math.Vector2Like) {
    this.ball_effect.setPosition(targetPos.x, targetPos.y);
    this.ball_effect.setVisible(true).play("ball_effect");
  }
}

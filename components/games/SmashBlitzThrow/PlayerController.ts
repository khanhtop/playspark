import Phaser from "phaser";
import { getValueBetweenByPercent } from "./Helper";
import { Global } from "./Global";
import { PLAYER_STATES } from "./Consts";

export class PlayerController {
  container: Phaser.GameObjects.Container;
  right_hand: Phaser.GameObjects.Sprite;
  scene!: Phaser.Scene;
  //player_sprite: Phaser.GameObjects.Sprite;
  body: Phaser.GameObjects.Sprite;
  head: Phaser.GameObjects.Sprite;
  headFirstPosX: number;
  headFirstPosY: number;
  rightHandFirstPosX: number;
  rightHandFirstPosY: number;
  leftHandFirstPosY: number;
  leftHandFirstPosX: number;
  left_hand: Phaser.GameObjects.Sprite;
  constructor(_scene: Phaser.Scene, x: number, y: number) {
    this.container = _scene.add.container();
    this.headFirstPosX = 5;
    this.headFirstPosY = -110;
    this.rightHandFirstPosX = -20;
    this.rightHandFirstPosY = -80;
    this.leftHandFirstPosX = 50;
    this.leftHandFirstPosY = -100;
    Global.playerState = PLAYER_STATES.IDLE;

    this.scene = _scene;

    this.scene.events.on("BallShooter:onShootComplete", () => {
      Global.playerState = PLAYER_STATES.ARM_BACK;
      //  this.player_sprite.play("p1_push_back");
      this.onRightHanRelease(-50, -60);
    });
    this.scene.events.on("BallShooter:onShoot", () => {
      //this.player_sprite.play("p1_throwing");
      Global.playerState = PLAYER_STATES.SHOOT;
      this.throwing(this.rightHandFirstPosX, this.rightHandFirstPosY);
    });
    // this.scene.events.emit("BallShooter:onShootComplete");

    this.head = _scene.add
      .sprite(this.headFirstPosX, this.headFirstPosY, "head")
      .setOrigin(0.5, 1)
      .setDisplaySize(120, 120);

    let shoes = _scene.add
      .sprite(20, 0, "shoes")
      .setOrigin(0.5, 1)
      .setDisplaySize(80, 80);

    this.right_hand = _scene.add
      .sprite(this.rightHandFirstPosX, this.rightHandFirstPosY, "right_hand")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(40, 40);

    this.left_hand = _scene.add
      .sprite(this.leftHandFirstPosX, this.leftHandFirstPosY, "left_hand")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(40, 40);

    this.body = _scene.add
      .sprite(7, -60, "body")
      .setOrigin(0.5, 1)
      .setDisplaySize(70, 70)
      .setInteractive();

    this.container.add(this.body);
    this.container.add(this.head);
    this.container.add(shoes);
    this.container.add(this.right_hand);
    this.container.add(this.left_hand);

    this.container.setPosition(x, y);

    // this.setRightHandPos(-30, -40) ;
    // this.onRightHanRelease(this.right_hand.x, this.right_hand.y, -30, -40);
  }
  setRightHandPos(x: number, y: number) {
    this.right_hand.setPosition(x, y);
  }
  onRightHanRelease(x: number, y: number) {
    this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 500,

      onUpdate: (tween) => {
        const v = tween.getValue();
        // this.score.setFontSize(20 + v * 64);
        this.right_hand.setPosition(
          getValueBetweenByPercent(this.rightHandFirstPosX, x, v),
          getValueBetweenByPercent(this.rightHandFirstPosY, y, v)
        );
        this.left_hand.setPosition(
          getValueBetweenByPercent(
            this.leftHandFirstPosX,
            this.leftHandFirstPosX - 20,
            v
          ),
          getValueBetweenByPercent(
            this.leftHandFirstPosY,
            this.leftHandFirstPosY + 5,
            v
          )
        );
        this.body.setAngle(v * -25);

        this.head.setPosition(
          getValueBetweenByPercent(this.headFirstPosX, x + 30, v),
          getValueBetweenByPercent(this.headFirstPosY, y - 40,  v)
        );
        this.head.setAngle(v * -25);
      },
      onComplete: () => {
        //this.throwing(0, -60) ;
      },
    });
  }

  throwing(x: number, y: number) {
    let prevx = this.right_hand.x;
    let prevy = this.right_hand.y;

    let leftHandprevx = this.left_hand.x;
    let leftHandprevy = this.left_hand.y;

    let prevAngle = this.body.angle;
    let prev_head_x = this.head.x;
    let prev_head_y = this.head.y;
    //this.right_hand.twee
    this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 200,
      ease: "bounce.out",

      onUpdate: (tween) => {
        const v = tween.getValue();
        // this.score.setFontSize(20 + v * 64);
        this.right_hand.setPosition(
          getValueBetweenByPercent(prevx, x, v),
          getValueBetweenByPercent(prevy, y, v)
        );
        this.left_hand.setPosition(
          getValueBetweenByPercent(leftHandprevx, this.leftHandFirstPosX, v),
          getValueBetweenByPercent(leftHandprevy, this.leftHandFirstPosY, v)
        );

        this.body.setAngle(getValueBetweenByPercent(prevAngle, 0, v));

        this.head.setPosition(
          getValueBetweenByPercent(prev_head_x, this.headFirstPosX, v),
          getValueBetweenByPercent(prev_head_y, this.headFirstPosY, v)
        );
        this.head.setAngle(getValueBetweenByPercent(prevAngle, 0, v));
      },
      onComplete: () => {
        Global.playerState = PLAYER_STATES.IDLE;
      },
    });
  }
}

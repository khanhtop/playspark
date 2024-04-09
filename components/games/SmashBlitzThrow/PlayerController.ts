import Phaser from "phaser";
import { getValueBetweenByPercent } from "./Helper";
import { Global } from "./Global";
import { PLAYER_STATES } from "./Consts";
import { PlayerContainer } from "./PlayerContainer";

export class PlayerController {
  container: PlayerContainer;//Phaser.GameObjects.Container;

  scene!: Phaser.Scene;

  static instance : PlayerController;
  constructor(_scene: Phaser.Scene, x: number, y: number) {
    PlayerController.instance = this;
    this.container = new PlayerContainer(_scene);//= _scene.add.container();
    _scene.add.container(0,0,this.container );


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
      this.throwing(this.container.rightHandFirstPosX, this.container.rightHandFirstPosY);
    });
    
    this.container.setPosition(x, y);

    // this.setRightHandPos(-30, -40) ;
    // this.onRightHanRelease(this.right_hand.x, this.right_hand.y, -30, -40);
  }
  setRightHandPos(x: number, y: number) {
    this.container.right_hand.setPosition(x, y);
  }
  onRightHanRelease(x: number, y: number) {
    this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 500,

      onUpdate: (tween) => {
        const v = tween.getValue();
        // this.score.setFontSize(20 + v * 64);
        this.container.right_hand.setPosition(
          getValueBetweenByPercent(this.container.rightHandFirstPosX, x, v),
          getValueBetweenByPercent(this.container.rightHandFirstPosY, y, v)
        );
        this.container.left_hand.setPosition(
          getValueBetweenByPercent(
            this.container.leftHandFirstPosX,
            this.container.leftHandFirstPosX - 20,
            v
          ),
          getValueBetweenByPercent(
            this.container.leftHandFirstPosY,
            this.container.leftHandFirstPosY + 5,
            v
          )
        );
        this.container._body.setAngle(v * -25);

        this.container.head.setPosition(
          getValueBetweenByPercent(this.container.headFirstPosX, x + 30, v),
          getValueBetweenByPercent(this.container.headFirstPosY, y - 40,  v)
        );
        this.container.head.setAngle(v * -25);
      },
      onComplete: () => {
        //this.throwing(0, -60) ;
      },
    });
  }

  throwing(x: number, y: number) {
    let prevx = this.container.right_hand.x;
    let prevy = this.container.right_hand.y;

    let leftHandprevx = this.container.left_hand.x;
    let leftHandprevy = this.container.left_hand.y;

    let prevAngle = this.container._body.angle;
    let prev_head_x = this.container.head.x;
    let prev_head_y = this.container.head.y;
    //this.right_hand.twee
    this.scene.tweens.addCounter({
      from: 0,
      to: 1,
      duration: 200,
      ease: "bounce.out",

      onUpdate: (tween) => {
        const v = tween.getValue();
        // this.score.setFontSize(20 + v * 64);
        this.container.right_hand.setPosition(
          getValueBetweenByPercent(prevx, x, v),
          getValueBetweenByPercent(prevy, y, v)
        );
        this.container.left_hand.setPosition(
          getValueBetweenByPercent(leftHandprevx, this.container.leftHandFirstPosX, v),
          getValueBetweenByPercent(leftHandprevy, this.container.leftHandFirstPosY, v)
        );

        this.container._body.setAngle(getValueBetweenByPercent(prevAngle, 0, v));

        this.container.head.setPosition(
          getValueBetweenByPercent(prev_head_x, this.container.headFirstPosX, v),
          getValueBetweenByPercent(prev_head_y, this.container.headFirstPosY, v)
        );
        this.container.head.setAngle(getValueBetweenByPercent(prevAngle, 0, v));
      },
      onComplete: () => {
        Global.playerState = PLAYER_STATES.IDLE;
      },
    });
  }
}

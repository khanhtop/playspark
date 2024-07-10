import { Scene, Vector3 } from "@babylonjs/core";
import { EventTypes, Events } from "../Events";
import { Ball } from "./Ball";
import { BALL_RESET_POS_TIME } from "../Consts";
import { Timer } from "../Timer";

export class BallManager {
  canShoot: boolean = true;
  constructor(scene: Scene) {
    let ball = new Ball(scene, new Vector3(0, 1.1, -1.1));

    Events.powerup.add((data: any) => {
      if (data.type == EventTypes.BIGBALL_POWERUP_BTN_CLICKED) {
        let scale = !data.state ? 1 : 2;
        ball.setScale(scale);
      }
    });
    Events.gamePlay.add((data: any) => {
      switch (data.type) {
        case EventTypes.ON_BALL_TARGET_SET:
          //data.type
          //data.ball
          //data.dir

          this.shoot(ball, data.dir);

          break;
      }
    });
  }

  shoot(ball: Ball, dir: Vector3) {
    if (!this.canShoot) return;
    Events.gamePlay.notifyObservers({ type: EventTypes.ON_BALL_SHOOT });
    
    this.canShoot = false;
    ball.setPhysicBody();

    let force = 2000;

  

    ball.applyForce(dir, force);

    var self = this;

   Timer.Instance.add(BALL_RESET_POS_TIME,()=>{
      ball.disposePhysicBody();
      ball.resetPos();

      self.canShoot = true;
    },this);


  }
}

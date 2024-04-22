import { getPercentage } from "./Helper";
import { ProgressBox } from "./UI/ProgressBox";

export class BallGravity {
  scene: Phaser.Scene;

  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;

    let gy = 2000; //_scene.physics.world.gravity.y;

    this.scene.events.on("BallShooter:onShoot", () => {
      let pc = ProgressBox.instance.getPercent();
     /* if(pc == 0)
        console.log("===");
      else if (pc < 0.5) console.log(pc, "---");
      else if (pc > 0.5) console.log("+++");*/
   
      pc *= -2;//getPercentage(pc) * -1;

      _scene.physics.world.gravity.y = gy * pc;
    });
  }
}

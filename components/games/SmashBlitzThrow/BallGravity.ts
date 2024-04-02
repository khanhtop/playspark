import { getPercentage } from "./Helper";
import { ProgressBox } from "./ProgressBox";

export class BallGravity {
    scene: Phaser.Scene;

    constructor(_scene: Phaser.Scene) {
      this.scene = _scene;

      let gy = 2000;//_scene.physics.world.gravity.y;
      
      this.scene.events.on("BallShooter:onShoot",()=>{
        let pc = ProgressBox.instance.getPercent();
        pc = getPercentage(pc)*-1;
        _scene.physics.world.gravity.y = gy * pc;
      });


    }

  }
  
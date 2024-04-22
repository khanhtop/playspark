import { BALLS } from "../Consts";

export class PowerupHandler {
  scene: Phaser.Scene;
  currentTarget?: Phaser.GameObjects.Sprite;
  currentPowerupCount: number = 0;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;
    this.currentPowerupCount = 0;
    this.scene.events.emit("PowerupHandler:onChange", this.currentPowerupCount);
    this.scene.events.on("PowerupHandler:setCount", (count:number)=>{
     //console.log("---22 [[ PowerupHandler:setCount",count);
      this.setCount(count)
    }) ;
    this.scene.events.on("BallAndTargetsOverlap:onOverLap", (target: any) => {
      this.currentTarget = target;
      if (this.currentTarget?.texture.key == BALLS[BALLS.powerup]) {
        this.currentPowerupCount++;

        this.scene.events.emit(
          "PowerupHandler:onChange",
          this.currentPowerupCount
        );
      }
    });
  }

  setCount(count: number) {
   // console.log("---[[ PowerupHandler:setCount",count);
    this.currentPowerupCount = count;
    this.scene.events.emit("PowerupHandler:onChange", this.currentPowerupCount);
  }
}

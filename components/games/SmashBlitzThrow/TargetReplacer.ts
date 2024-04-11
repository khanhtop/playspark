import { BALLS, BOMB_INDEX, TOTAL_TARGET_COUNT } from "./Consts";
import { getRandomInt } from "./Helper";
import { Observer } from "./Observer";
import { Targets } from "./Targets";

export class TargetReplacer {
  scene: Phaser.Scene;
  currentTarget?: Phaser.GameObjects.Sprite;
  

  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;

    this.scene.events.on("BallAndTargetsOverlap:onOverLap", (target: any) => {
      this.currentTarget = target;
      //console.log("-[[ gfg", this.currentTarget?.texture.key);
    });
    this.scene.events.on("ExplosionEffect:onAnimFinished", (pointer: any) => {
      let id: number = 0;
      if (Targets.instance)
        id = Targets.instance?.getIdByTarget(this.currentTarget);

      //let sprites = ["wizball",]
  
      let randomIndex = this.getRandomBall()
      let spType = BALLS[randomIndex];
      //console.log(spLength, randomIndex, spType);
      Targets.instance?.setSprite(id, spType);
      if (this.currentTarget) this.currentTarget.alpha = 1;
    });
  }
  private getBombCount() {
    let bombCount = 0;
   
    Targets.instance?.getAllTargets().forEach((element,index) => {
     
      if (element.texture.key == BALLS[BOMB_INDEX]) {
        bombCount++;
      }

    });
    return bombCount;
  }
  private getRandomBall() {
    let bombCount = this.getBombCount();
    let spLength = Object.keys(BALLS).length / 2; // EXEPT SUPER GOLD BALL
    let randomIndex = getRandomInt(spLength);
    while(bombCount == TOTAL_TARGET_COUNT-1 && randomIndex == BOMB_INDEX){
      randomIndex = getRandomInt(spLength);
    }
    return randomIndex;
  }
}

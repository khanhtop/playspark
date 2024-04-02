import { BALLS } from "./Consts";

export class ScoreManager {
  scene: Phaser.Scene;

  currentScore: number = 0;
  private totalScore: number = 0;
  multiplier: number = 1;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;

    this.scene.events.on("ScoreManager:getTotalScore", (callBack: any) => {
      callBack(this.totalScore);
    });

    this.scene.events.on("ScoreManager:setMultiplier", (multiplier: number) => {
      this.multiplier = multiplier;
    });
    this.scene.events.on("BallAndTargetsOverlap:onOverLap", (target: any) => {
      if (target.texture.key == BALLS[BALLS.super_gold]) {
        this.currentScore += 10 * this.multiplier;
        this.totalScore += 10 * this.multiplier;

       // console.log(this.currentScore);
        this.scene.events.emit("ScoreManager:onChange", this.currentScore);
      }
      if (
        target.texture.key == BALLS[BALLS.blue_ball] ||
        target.texture.key == BALLS[BALLS.purple_ball] ||
        target.texture.key == BALLS[BALLS.gold_ball]
      ) {
        this.currentScore += 5 * this.multiplier;
        this.totalScore += 5 * this.multiplier;

        //console.log(this.currentScore);
        this.scene.events.emit("ScoreManager:onChange", this.currentScore);
      }
    });
  }

  setCount(count: number) {
    this.currentScore = count;
    this.scene.events.emit("ScoreManager:onChange", this.currentScore);
  }
}

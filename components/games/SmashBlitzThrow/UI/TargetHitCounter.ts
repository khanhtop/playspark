import { BALLS } from "../Consts";

export class TargetHitCounter {
  scene: Phaser.Scene;
  currentTarget?: Phaser.GameObjects.Sprite;
  remainingGoal: number = 0;
  counter: number = 0;
  private totalTargetHitCounter: number = 0;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;
    this.remainingGoal = 0;

    // this.scene.events.emit("GoalCounter:onChange", this.remainingGoal);
    this.scene.events.on(
      "TargetHitCounter:getTotalTargetHitCounter",
      (callBack: any) => {
        callBack(this.totalTargetHitCounter);
      }
    );

    this.scene.events.on("BallAndTargetsOverlap:onOverLap", (target: any) => {
      this.currentTarget = target;
      this.counter++;

      this.scene.events.emit("TargetHitCounter:onHit", this.counter);

      if (
        this.currentTarget?.texture.key == BALLS[BALLS.blue_ball] ||
        this.currentTarget?.texture.key == BALLS[BALLS.purple_ball] ||
        this.currentTarget?.texture.key == BALLS[BALLS.gold_ball] ||
        this.currentTarget?.texture.key == BALLS[BALLS.super_gold]
      ) {
        this.totalTargetHitCounter++;

        this.scene.events.emit("TargetHitCounter:onTargetHit");
        this.remainingGoal--;
        if (this.remainingGoal >= 0)
          this.scene.events.emit(
            "TargetHitCounter:onGoalCountChange",
            this.remainingGoal
          );
      }

      if (this.currentTarget?.texture.key == BALLS[BALLS.bomb]) {
        this.scene.events.emit("TargetHitCounter:onBombHit");
      }

      if (this.currentTarget?.texture.key == BALLS[BALLS.powerup]) {
        this.scene.events.emit("TargetHitCounter:onPowerupHit");
      }
    });
  }

  setGoalCount(count: number) {
    this.remainingGoal = count;
    this.scene.events.emit(
      "TargetHitCounter:onGoalCountChange",
      this.remainingGoal
    );
  }
}

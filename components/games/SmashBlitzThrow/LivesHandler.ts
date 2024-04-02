import { BALLS } from "./Consts";

export class LivesHandler {
  scene: Phaser.Scene;
  currentTarget?: Phaser.GameObjects.Sprite;
  currentLifes: number = 0;
  constructor(_scene: Phaser.Scene, defaultValue:number) {
    this.scene = _scene;
    this.currentLifes = defaultValue;
    this.scene.events.emit("LivesHandler:onChange", this.currentLifes);

    this.scene.events.on("BallAndTargetsOverlap:onOverLap", (target: any) => {
      this.currentTarget = target;
      if (this.currentTarget?.texture.key == BALLS[BALLS.bomb]) {
        this.currentLifes--;
        if (this.currentLifes >= 0)
          this.scene.events.emit("LivesHandler:onChange", this.currentLifes);
      }
    });
  }

  setLife(count: number) {
    this.currentLifes = count;
    this.scene.events.emit("LivesHandler:onChange", this.currentLifes);
  }

}

import { BALLS, FLAME_BOOST_TRY_COUNT, ROKET_BOOST_MULTIPLIER } from "../Consts";

export class FlameBoost {
  scene: Phaser.Scene;

  currentScore: number = 0;
  multiplier: number = 1;

  boostCount: number;
  canBoost: boolean;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;

    this.boostCount = 0;
    this.canBoost = false;
    this.scene.events.on("FlameBoost:boost", () => {
      this.boostCount = FLAME_BOOST_TRY_COUNT;
      this.canBoost = true;
    });

    this.scene.events.on("BallShooter:onShoot", () => {
      if (this.boostCount == 0 && this.canBoost) {
        this.scene.events.emit("ScoreManager:setMultiplier", 1);
        this.canBoost = false;
        return;
      }
      if (this.boostCount == 0 || !this.canBoost) return;

      this.scene.events.emit("ScoreManager:setMultiplier", ROKET_BOOST_MULTIPLIER);
      this.boostCount--;
    });
  }
}

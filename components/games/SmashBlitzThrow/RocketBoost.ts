export class RocketBoost {
  scene: Phaser.Scene;

  currentScore: number = 0;
  multiplier: number = 1;

  boostCount: number;
  canBoost: boolean;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;

    this.boostCount = 0;
    this.canBoost = false;
    this.scene.events.on("RocketBoost:boost", () => {
      this.boostCount = 3;
      this.canBoost = true;
     
    });

    
    this.scene.events.on("BallShooter:onShootComplete", () => {
      if (this.boostCount == 0 && this.canBoost) {
        this.scene.events.emit("Targets:setTargetTexture", 0, "powerup");
        this.scene.events.emit("Targets:setTargetTexture", 1, "gold_ball");
        this.scene.events.emit("Targets:setTargetTexture", 2, "purple_ball");
        this.scene.events.emit("Targets:setTargetTexture", 3, "gold_ball");
        this.scene.events.emit("Targets:setTargetTexture", 4, "purple_ball");
        this.canBoost = false;
        return;
      }
      if (this.boostCount == 0 || !this.canBoost) return;

      this.scene.events.emit("Targets:setTargetTexture", 0, "super_gold");
      this.scene.events.emit("Targets:setTargetTexture", 1, "super_gold");
      this.scene.events.emit("Targets:setTargetTexture", 2, "super_gold");
      this.scene.events.emit("Targets:setTargetTexture", 3, "super_gold");
      this.scene.events.emit("Targets:setTargetTexture", 4, "super_gold");
      this.boostCount--;
    });
  }
}

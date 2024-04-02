export class LevelManager {
  scene: Phaser.Scene;
  public static instance: LevelManager;
  // level [targetCount, Timer, green area percent , timing bar speed ]
  data = [
    [1, 30, 0.5, 2],
    [3, 30, 0.45, 2.2],
    [5, 30, 0.4, 2.4],
    [10, 30, 0.35,2.6],
    [10, 25, 0.3, 2.8],
    [10, 20, 0.25, 3],
    [10, 20, 0.2, 3.5],
    [10, 15, 0.15, 4],
    [10, 15, 0.5, 4.5],
    [10, 15, 0.5, 5],
  ];
  private currentLevel: number = 0;
  constructor(_scene: Phaser.Scene) {
    LevelManager.instance = this;
    this.scene = _scene;
    this.scene.events.on("LevelManager:getCurrentLevel", (callBack: any) => {
      callBack(this.currentLevel, this.data[this.currentLevel]);
    });

    this.scene.events.on("RESTART", () => {
      this.currentLevel = 0;
    });

    this.scene.events.on("LevelManager:getNextLevel", (callBack: any) => {
      this.currentLevel++;
      if (this.data[this.currentLevel] == undefined) callBack(null);
      else callBack(this.currentLevel, this.data[this.currentLevel]);
    });
  }
}

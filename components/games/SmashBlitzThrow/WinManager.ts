import { GAME_STATES } from "./Consts";
import { Global } from "./Global";
import { LevelManager } from "./LevelManager";
import SmashBlitzThrowing from "./app";

export class WinManager {
  scene: Phaser.Scene;
  canWin: boolean;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;
    this.canWin = false;
    let currentLevel: number = 0;
    let totalScore: number = 0;
    let totalTaragetHit: number = 0;

    _scene.events.on("CountDownTimer:onComplete", () => {
      if (!this.canWin || Global.gameState != GAME_STATES.PLAYING) return;

      _scene.events.emit(
        "LevelManager:getCurrentLevel",
        (_currentLevel: number, _data: any) => {
          currentLevel = _currentLevel;
        }
      );

      _scene.events.emit(
        "ScoreManager:getTotalScore",
        (_totalScore: number) => {
          totalScore = _totalScore;
        }
      );
      
      
      _scene.events.emit(
        "TargetHitCounter:getTotalTargetHitCounter",
        (_totalTaragetHit: number) => {
          totalTaragetHit = _totalTaragetHit;
        }
      );

   


      this.canWin = false;
      _scene.events.emit("WinManager:onWin");
      _scene.events.emit(
        "LevelCompletePopup:show",
        currentLevel + 1,
        100,
        totalTaragetHit,
        totalScore
      );
    });

    _scene.events.on("GoalCounter:onChange", (counter: number) => {
      if (counter <= 0) this.canWin = true;
    });

    _scene.events.on("TargetHitCounter:onGoalCountChange", (count: number) => {
      if (count == 0) {
        this.canWin = true;
        /* let score =
          SmashBlitzThrowing.instance.prevScore -
          SmashBlitzThrowing.instance.prevScoreCounter;
        SmashBlitzThrowing.instance.prevScoreCounter =
          SmashBlitzThrowing.instance.prevScore;

        SmashBlitzThrowing.instance.countDownTimer.stop();
        let targetHitCount =
          SmashBlitzThrowing.instance.targetHitCounter -
          SmashBlitzThrowing.instance.prevTargetCounter;
        // SmashBlitzThrowing.instance.levelCompletePopup.show(
        //   LevelManager.instance.currentLevel + 1,
        //   100,
        //   targetHitCount,
        //   score
        // );

        _scene.events.emit(
          "LevelCompletePopup:show",
          LevelManager.instance.currentLevel + 1,
          100,
          targetHitCount,
          score
        );

        SmashBlitzThrowing.instance.prevTargetCounter =
          SmashBlitzThrowing.instance.targetHitCounter;*/
      }
    });
  }
}

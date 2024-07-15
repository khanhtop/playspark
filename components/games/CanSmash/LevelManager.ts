import { Scene } from "@babylonjs/core";
import { EventTypes, Events } from "./Events";
import { GameData } from "./GameData";
import { ILevelCompleteUIData } from "./GUI/LevelCompleteUIData";
import { LevelCreator } from "./LevelCreator";
import { TimeBonus } from "./Combo/TimeBonus";

export class LevelManager {
  scene: Scene;
  constructor(scene: Scene) {
    this.scene = scene;

    Events.ui.add((data: any) => {
      switch (data.type) {
        case EventTypes.TIMER_COMPLETE:
          this.onTimerComplete();
          return;
        case EventTypes.CONTINUE_BTN_CLICKED:
          this.onContinueBtnClicked();
          return;
        case EventTypes.ON_LEVEL_COMPLETE_UI_CLOSE_BTN_CLICKED:
          this.onCloseBtnClicked();
          return;
      }
    });
  }

  onCloseBtnClicked() {
    let currentLevel = GameData.instance.getCurrentLevel();
    let totalLevel = GameData.instance.getTotalLevel();

    if (currentLevel < totalLevel) LevelCreator.instane.restart();
    else
      Events.gamePlay.notifyObservers({
        name: "LevelManager:onLastWinPopupClosed",
      });
  }
  onContinueBtnClicked() {
    let currentLevel = GameData.instance.getCurrentLevel();
    let totalLevel = GameData.instance.getTotalLevel();
    if (currentLevel < totalLevel) LevelCreator.instane.create(currentLevel);
  }

  onTimerComplete() {
    let hitCount = GameData.instance.getHitCount();
    let currentLevel = GameData.instance.getCurrentLevel();
    let totalLevel = GameData.instance.getTotalLevel();
    let nextLevelHitTargets = GameData.instance.getNextLevelHitCount();
    let timeBonus = TimeBonus.instance.getBonus();
    let totalScore = GameData.instance.getTotalScore();
    totalScore += timeBonus;
    GameData.instance.setTotalScore(totalScore);
    let levelScore = GameData.instance.getScore();
    let nextLevelTime = GameData.instance.getNextLevelTime();

    if (hitCount >= GameData.instance.getTargetCount()) {
      //console.log(TimeBonus.instance.getBonus());

      let data: ILevelCompleteUIData = {
        nextLevelTime: currentLevel < totalLevel ? nextLevelTime : undefined,
        levelNum: currentLevel,
        levelScore: levelScore,
        timeBonus: timeBonus,
        targetsHits: hitCount,
        totalScore: totalScore,
        nextLevel: currentLevel < totalLevel ? currentLevel + 1 : undefined,
        nextLevelHitTargets:
          currentLevel < totalLevel ? nextLevelHitTargets : undefined,
      };
      Events.gamePlay.notifyObservers({
        type: EventTypes.LEVEL_COMPLETE,
        data,
      });

      if (currentLevel >= totalLevel)
        Events.gamePlay.notifyObservers({
          name: "LevelManager:onLastWinPopUpShow",
        });
    } else {
      let data = {
        levelNum: currentLevel,
        levelScore: levelScore,
        targetsHits: hitCount,
        totalScore: totalScore,
      };
      Events.gamePlay.notifyObservers({
        type: EventTypes.GAME_OVER,
        data: data,
      });
    }
  }
}

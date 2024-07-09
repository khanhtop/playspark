import { EventData, EventTypes, Events } from "../Events";
import { TimerUI } from "../GUI/TimerUI";
import { GameData } from "../GameData";

export class TimeBonus {
  static instance: TimeBonus = null;
  private bonus: number = 0;
  private isBonusSet: boolean;
  constructor() {
    TimeBonus.instance = this;

    Events.gamePlay.add((data: any) => {
      switch (data.type) {
        case EventTypes.ON_HIT_COUNT_CHANGE:
          if (this.isBonusSet) break;

          let timer = TimerUI.instance.getCurrentTime();
          // let maxTime = TimerUI.instance.getMaxTime();
          let hitCount = GameData.instance.getHitCount();
          let targetCount = GameData.instance.getTargetCount();
          if (timer > 20 && hitCount >= targetCount) {
            this.bonus = 100;
            this.isBonusSet = true;
          } else if (timer > 10 && hitCount >= targetCount) {
            this.bonus = 75;
            this.isBonusSet = true;
          } else if (timer > 5 && hitCount >= targetCount) {
            this.bonus = 50;
            this.isBonusSet = true;
          }
          break;

        case EventTypes.LEVEL_COMPLETE:
        
          this.isBonusSet = false;
          this.bonus = 0;
          break;
      }
    });
  }
  getBonus() {
    return this.bonus;
  }
}

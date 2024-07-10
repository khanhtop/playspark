import { EventData, EventTypes, Events } from "../Events";

export class ComboBonus {
  score: number = 0;
  comboCount: number = 0;
  constructor() {
    Events.hits.add((data: EventData) => {
      switch (data.name) {
        case "can":
          this.onCanHit();
          break;

        default:
          return;
      }
    });

    Events.gamePlay.add((data: any) => {
      switch (data.type) {
        case EventTypes.ON_BALL_SHOOT:
          this.onShoot();
          break;

        default:
          return;
      }
    });
  }
  onShoot() {
    Events.gamePlay.notifyObservers({
      type: EventTypes.SET_SCORE_MULTIPLE_FACTOR,
      factor: 1,
    });

    this.comboCount = 0;
  }
  onCanHit() {
    this.comboCount++;
    if (this.comboCount < 2) return;
    this.notifyTextPOpup(`Combo ${this.comboCount} X`);
  }

  notifyTextPOpup(_text) {
    Events.ui.notifyObservers({
      type: EventTypes.SHOW_COMBO_TEXT,
      text: _text,
    });
  }
}

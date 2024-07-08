import {
  BIGBALL_POWERUP_COST,
  BIGBALL_POWERUP_TIMER,
  POWERUP_CREDIT_COUNT,
  SHIELD_POWERUP_COST,
  SHIELD_POWERUP_TIMER,
} from "../Consts";
import { EventData, EventTypes, Events } from "../Events";

export class PowerupCreditManager {
  powerupCredit: number = 0;
  constructor(powerupCredit: number) {
    this.powerupCredit = powerupCredit;
    this.notify();

    Events.hits.add((data: any) => {
      switch (data.name) {
        case "powerup":
          this.powerupCredit++;
          this.notify();
          this.notifyTextPOpup(
            data.target.position,
            "+" + POWERUP_CREDIT_COUNT
          );
          break;

        default:
          return;
      }
    });

    Events.ui.add((data: any) => {
      if(data.sender == this) return;

      switch (data.type) {
        case EventTypes.BIGBALL_POWERUP_BTN_CLICKED:
         // console.log("BIGBALL_POWERUP_BTN_CLICKED",this.powerupCredit - BIGBALL_POWERUP_COST);
          if (this.powerupCredit - BIGBALL_POWERUP_COST < 0) return;
          this.powerupCredit -= BIGBALL_POWERUP_COST;
          this.notify();
          Events.ui.notifyObservers({
            type: EventTypes.BIGBALL_POWERUP_BTN_CLICKED,
            reciver: data.sender,
            sender:this,
            time: BIGBALL_POWERUP_TIMER,
          });
          break;
        case EventTypes.SHIELD_POWERUP_BTN_CLICKED:
        //  console.log("SHIELD_POWERUP_BTN_CLICKED");

          if (this.powerupCredit - SHIELD_POWERUP_COST < 0) return;
          this.powerupCredit -= SHIELD_POWERUP_COST;
          this.notify();
          Events.ui.notifyObservers({
            type: EventTypes.SHIELD_POWERUP_BTN_CLICKED,
            reciver: data.sender,
            sender:this,
            time: SHIELD_POWERUP_TIMER,
          });
          break;
        default:
          return;
      }
    });
  }

  notify() {
    Events.ui.notifyObservers({
      type: EventTypes.POWERUP_CREDIT_CHANGE,
      count: this.powerupCredit,
    });
  }
  notifyTextPOpup(_pos, _text) {
    Events.ui.notifyObservers({ type: EventTypes.SHOW_TEXT_POPUP, text: _text, pos: _pos });
  }
}

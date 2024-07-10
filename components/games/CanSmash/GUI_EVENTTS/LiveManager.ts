import { ENEMY_REDUCE_SCORE } from "../Consts";
import { EventData, EventTypes, Events } from "../Events";

export class LiveManager {
  live: number = 0;
  canDecreaseLive: boolean = true;

  constructor(live: number) {
    this.live = live;
    this.notify();

    var self = this;
    Events.ui.add((data: any) => {
      if (data.type == EventTypes.SET_DECREASELIVE_STATE) {
        self.canDecreaseLive = data.state;
      }
    });

    Events.hits.add((data: any) => {
      switch (data.name) {
        case "enemy":
          if (data.targetName == "ground") break;

          this.notifyImagePopup(
            data.data.sender.canContainer.position,
            "danger"
          );
          if (!this.canDecreaseLive) return;
          this.decreaseLive();

          this.notifyTextPOpup(
            data.data.sender.canContainer.position,
            "-" + ENEMY_REDUCE_SCORE
          );
          this.notify();

          break;

        default:
          return;
      }
    });
  }
  decreaseLive() {
    if (this.live == 0) return;

    this.live--;
    Events.ui.notifyObservers({ type: EventTypes.ON_LIVE_DECREAASED });

    if (this.live == 0) {
      Events.ui.notifyObservers({ type: EventTypes.ON_LIVE_LOSE });
    }
  }
  notify() {
    Events.ui.notifyObservers({ name: "live", count: this.live });
  }
  notifyTextPOpup(_pos, _text) {
    Events.ui.notifyObservers({
      type: EventTypes.SHOW_TEXT_POPUP,
      text: _text,
      pos: _pos,
    });
  }
  notifyImagePopup(_pos, _img) {
    Events.ui.notifyObservers({ name: "image_popup", image: _img, pos: _pos });
  }
}

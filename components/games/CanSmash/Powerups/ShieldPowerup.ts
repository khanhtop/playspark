import { EventTypes, Events } from "../Events";

export class ShieldPowerup {
  constructor() {
    Events.powerup.add((data: any) => {
      if (data.type == EventTypes.SHIELD_POWERUP_BTN_CLICKED) {
        //console.log(data);
        Events.ui.notifyObservers({
          type: EventTypes.SET_DECREASELIVE_STATE,
          state: !data.state,
        });
      }
    });
  }
}

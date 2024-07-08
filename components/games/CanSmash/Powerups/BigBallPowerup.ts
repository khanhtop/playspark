import { EventTypes, Events } from "../Events";

export class BigBallPowerup {
  constructor() {
    Events.powerup.add((data: any) => {
      if (data.type == EventTypes.BIGBALL_POWERUP_BTN_CLICKED) {
   
      }
    });
  }
}

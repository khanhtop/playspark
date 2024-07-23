import { GameData } from "./GameData";
import { Timer } from "./Timer";

export class Utils {
  static isgamePaused = false;
  static pause(state: boolean) {
    Timer.Instance.Pause(state);
    GameData.instance.getScene().physicsEnabled = !state;
    Utils.isgamePaused = state;
  }
  static DToR(degree: number) {
    return degree * (Math.PI / 180);
  }
  static getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }



  private constructor() {}
}

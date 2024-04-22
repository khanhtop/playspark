import { GAME_STATES } from "./Consts";
import { Global } from "./Global";

export class GameStateCtrl {
  public static gameState: GAME_STATES = GAME_STATES.TUTURIAL;
  constructor(_scene: Phaser.Scene) {
    Global.gameState = GAME_STATES.TUTURIAL;
    _scene.events.on("WinManager:onWin", () => {
      Global.gameState = GAME_STATES.WIN_POPOP;
    });
    _scene.events.on("Tutorial:hide", () => {
      Global.gameState = GAME_STATES.PLAYING;
    });
    _scene.events.on("LevelCompletePopup:onClaimBtnClick", () => {
      Global.gameState = GAME_STATES.PLAYING;
    });
    _scene.events.on("PAUSE_PLAY", () => {
      if (Global.gameState == GAME_STATES.PAUSE)
        Global.gameState = GAME_STATES.PLAYING;
      else Global.gameState = GAME_STATES.PAUSE;
    });

    _scene.events.on("LoseManager:onLose", () => {
      Global.gameState = GAME_STATES.LOSE;
    });
  }
}

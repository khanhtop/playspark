import * as GUI from "@babylonjs/gui";
import { LevelCompleteUI } from "./LevelCompleteUI";
import { EventTypes, Events } from "../Events";
import { ComboPopup } from "./ComboPopup";
import { HUD } from "./HUD";
import { GameOverUI } from "./GameOverUI";
import { PauseUI } from "./PauseUI";
import { GameData } from "../GameData";
import { Utils } from "../Utils";
import { SaveLoadData } from "../SaveLoadData.";
import { BlackBG } from "./BlackBG";
import { TutorialManager } from "./TutorialManager";

export class GUI2D {
  static instance: GUI2D = null;
  advancedTexture: GUI.AdvancedDynamicTexture = null;
  constructor() {
    GUI2D.instance = this;

    this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

    let maxTimer = 30;
    let timer = maxTimer;

    this.advancedTexture.idealWidth = 1080 / 2;
    // advancedTexture.idealHeight = 1920/3;
    this.advancedTexture.renderAtIdealSize = true;

    let comboPopup = new ComboPopup(this.advancedTexture);

    new HUD(this.advancedTexture);

    let blackbg = new BlackBG(this.advancedTexture);
    blackbg.hide();

    Events.ui.add((data: any) => {
      if (data.type != EventTypes.SHOW_COMBO_TEXT) return;
      comboPopup.animate(data.text);
    });

    let levelCompleteUI = new LevelCompleteUI(this.advancedTexture);
    /*let data: ILevelCompleteUIData = {
      levelNum: 1,
      levelScore: 100,
      timeBonus: 100,
      targetsHits: 2,
      totalScore: 100,
      nextLevel:  undefined,
      nextLevelHitTargets: undefined,
    };
    levelCompleteUI.showPopup(data)*/
    // levelCompleteUI.showPopup(3,11,31,11,141)
    levelCompleteUI.hidePopup();
    Events.gamePlay.add((data: any) => {
      if (data.type != EventTypes.LEVEL_COMPLETE) return;
      levelCompleteUI.showPopup(data.data);
      Utils.pause(true);
    });

    let pauseUI = new PauseUI(this.advancedTexture);
    pauseUI.hidePopup();

    Events.ui.add((data: any) => {
      switch (data.type) {
        case EventTypes.ON_SFX_BTN_STATE_CHANGED:
          GameData.instance.setSfxState(data.state);
          SaveLoadData.instance.save();
          break;
        case EventTypes.ON_MUSIC_BTN_STATE_CHANGED:
          GameData.instance.setMusicState(data.state);
          SaveLoadData.instance.save();
          break;
        case EventTypes.SAVE_BTN_CLICKED:
        case EventTypes.ON_PAUSE_POPUP_CLOSED:
          pauseUI.hidePopup();

          break;
      }
    });

    Events.gamePlay.add((data: any) => {
      if (data.type != EventTypes.ON_PAUSE_BTN_CLICKED) return;
      let currentLevel = GameData.instance.getCurrentLevel();
      let currentScore = GameData.instance.getTotalScore();
      Utils.pause(true);

      let sfxState = GameData.instance.getSfxState();
      let musicState = GameData.instance.getMusicState();

      pauseUI.showPopup(musicState, sfxState, currentLevel, currentScore);
    });
    Events.gamePlay.add((data: any) => {
      if (data.type != EventTypes.ON_PAUSE_POPUP_CLOSED) return;
      Utils.pause(false);
      pauseUI.hidePopup();
    });

    let gameOverUI = new GameOverUI(this.advancedTexture);
    gameOverUI.hidePopup();
    Events.gamePlay.add((data: any) => {
      if (data.type != EventTypes.GAME_OVER) return;
      // levelNum: 3,
      // levelScore: 2000,
      // targetsHits: hitCount,
      // totalScore: 1000,
      // console.log(
      //   data.data.levelNum,
      //   data.data.levelScore,
      //   data.data.targetsHits
      // );

      setTimeout(() => {
        let currentLevel = GameData.instance.getCurrentLevel();
        let currentScore = GameData.instance.getTotalScore();
        // currentLevel: number,currentScore: number,targetHits:
        gameOverUI.showPopup(currentLevel, currentScore, data.data.targetsHits);
      }, 1000);
    });

    Events.gamePlay.add((data: any) => {
      if (data.type != "GUI2D:hideGameOverUI") return;
      gameOverUI.hidePopup();
    });

    Events.ui.add((data: any) => {
      if (data.type != EventTypes.ON_LIVE_LOSE) return;

      setTimeout(() => {
        let currentLevel = GameData.instance.getCurrentLevel();
        let currentScore = GameData.instance.getTotalScore();
        let targetsHits = GameData.instance.getHitCount();
        gameOverUI.showPopup(currentLevel, currentScore, targetsHits);
      }, 1000);
    });

    Events.ui.add((data: any) => {
      if (
        !(
          data.type == EventTypes.CONTINUE_BTN_CLICKED ||
          data.type == EventTypes.ON_LEVEL_COMPLETE_UI_CLOSE_BTN_CLICKED
        )
      )
        return;
      Utils.pause(false);
      levelCompleteUI.hidePopup();
      Events.ui.notifyObservers({
        type: EventTypes.CHANGE_SCORE,
        count: GameData.instance.getTotalScore(),
      });
    });
  }
}

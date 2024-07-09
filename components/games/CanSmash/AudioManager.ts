import { Engine, Scene, Sound } from "@babylonjs/core";
import { EventTypes, Events } from "./Events";
import { GameData } from "./GameData";
import { ICan } from "./Can/ICan";
import { Sounds } from "./Sounds";

export class AudioManager {
  private isSfxOn: boolean = true;
  private isMusicOn: boolean = true;

  constructor(scene: Scene) {
    this.isMusicOn = GameData.instance.getMusicState();
    this.isSfxOn = GameData.instance.getSfxState();

    scene.onPointerDown = (evt, pickResult) => {
      if (evt.button === 0) {
        Engine.audioEngine.unlock();
        scene.onPointerDown = null;
        scene.onPointerDown = (evt, pickResult) => {
          if (evt.button === 0) {
            Engine.audioEngine.unlock();
            scene.onPointerDown = null;
          }
        };
      }
    };

    Engine.audioEngine.useCustomUnlockedButton = true;

    var music = new Sound("Music", Sounds.data.music, scene, null, {
      loop: true,
      autoplay: this.isMusicOn,
    });

    var click = new Sound("Click", Sounds.data.click, scene);
    var powerUpUiActiveClick = new Sound(
      "Click",
      Sounds.data.powerUpUiActiveClick,
      scene
    );
    var canHit = new Sound("canHit", Sounds.data.canHit, scene);
    var powerupHit = new Sound("powerupHit", Sounds.data.powerupHit, scene);
    var enemyHit = new Sound("enemyHit", Sounds.data.enemyHit, scene);
    var lose = new Sound("lose", Sounds.data.lose, scene);
    var win = new Sound("win", Sounds.data.win, scene);
    var combo = new Sound("combo", Sounds.data.combo, scene);
    var targetReach = new Sound("combo", Sounds.data.targetReach, scene);

    Events.ui.add((data: any) => {
      this.isMusicOn = GameData.instance.getMusicState();
      this.isSfxOn = GameData.instance.getSfxState();

      switch (data.type) {
        case EventTypes.REMAINING_TARGET_UI:
          if (data.hitCount == data.targetCount) targetReach.play();

          break;
        case EventTypes.ON_SFX_BTN_STATE_CHANGED:
          this.playClickSFX(click);
          break;
        case EventTypes.ON_MUSIC_BTN_STATE_CHANGED:
          if (data.state) {
            if (!music.isPlaying) music.play();
          } else {
            if (music.isPlaying) music.stop();
          }
          break;

        case EventTypes.SHOW_COMBO_TEXT:
          if (this.isSfxOn) combo.play();
          break;
        case EventTypes.ON_LIVE_DECREAASED:
          break;
        case EventTypes.SHOW_TEXT_POPUP:
          break;
        case EventTypes.ON_LIVE_LOSE:
          lose.play();
          break;
        case EventTypes.BIGBALL_POWERUP_BTN_CLICKED:
        case EventTypes.SHIELD_POWERUP_BTN_CLICKED:
          // console.log(data.isActive)
          if (data.isActive) {
            powerUpUiActiveClick.play();
          } else if (data.isActive == false) {
            this.playClickSFX(click);
          }
          break;
        case EventTypes.SAVE_BTN_CLICKED:
        case EventTypes.ON_PAUSE_POPUP_CLOSED:

        case EventTypes.CONTINUE_BTN_CLICKED:
          this.playClickSFX(click);
          break;
      }
    });

    Events.gamePlay.add((data: any) => {
      if (!this.isSfxOn) return;
      switch (data.type) {
        case EventTypes.GAME_OVER:
          lose.play();
          break;
        case EventTypes.ON_PAUSE_BTN_CLICKED:
          this.playClickSFX(click);
          break;
        case EventTypes.LEVEL_COMPLETE:
          win.play();
          break;
        case EventTypes.ON_BALL_SHOOT:
          break;
      }
    });

    Events.hits.add((_data: ICan) => {
      if (!this.isSfxOn) return;
      switch (_data.name) {
        case "can":
          canHit.play();
          break;
        case "enemy":
          if (_data.targetName == "ground") break;
          enemyHit.play();
          break;
        case "powerup":
          powerupHit.play();
          break;
      }
    });
  }

  private playClickSFX(click: Sound) {
    if (this.isSfxOn) click.play();
  }
}

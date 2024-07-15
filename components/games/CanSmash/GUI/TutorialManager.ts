import * as GUI from "@babylonjs/gui";
import { EventTypes, Events } from "../Events";
import { Tutorial1 } from "./Tutorial1";
import { BlackBG } from "./BlackBG";
import { Utils } from "../Utils";
import { Tutorial2 } from "./Tutorial2";
import { Tutorial3 } from "./Tutorial3";
import { Timer } from "../Timer";
import {
  BALL_RESET_POS_TIME,
  CAN_REAPPEAR_TIME,
  ON_POWERUP_ENABLED,
} from "../Consts";
import { Images } from "../Images";
import { LevelCreator } from "../LevelCreator";
import { Vector3 } from "@babylonjs/core";

export class TutorialManager {
  constructor(advancedTexture: GUI.AdvancedDynamicTexture) {
    let continueBtn = this.createContinueBtn();

    let tutorial1 = new Tutorial1(advancedTexture, continueBtn);
    tutorial1.hide();

    continueBtn = this.createContinueBtn();
    let tutorial2 = new Tutorial2(advancedTexture, continueBtn);
    tutorial2.hide();

    continueBtn = this.createContinueBtn();
    let tutorial3 = new Tutorial3(advancedTexture, continueBtn);
    tutorial3.hide();

    let tutorialStep = 1;

    let ph = Events.powerup.add((data: any) => {
      if (data.type != ON_POWERUP_ENABLED) return;
      BlackBG.instance.show(Images.data.blackbg3);
      tutorial3.show();
      setTimeout(() => {
        Utils.pause(true);
      }, 1000);

      Events.powerup.remove(ph);
    });

    if (tutorialStep <= 2) {
      let ghs = Events.gamePlay.add((data: any) => {
        if (data.type != EventTypes.ON_BALL_SHOOT) return;
        switch (tutorialStep) {
          case 2:
            Timer.Instance.add(
              BALL_RESET_POS_TIME,
              () => {
                this.showTutorial2(tutorial2);
              },
              this
            );

            break;
          case 3:
            Events.gamePlay.remove(ghs);
            break;
        }
      });
    }
    /* Utils.pause(true);
    setTimeout(() => {
      Utils.pause(false);
    }, 1000);*/

    switch (tutorialStep) {
      case 1:
        BlackBG.instance.show(Images.data.blackbg1);
        tutorial1.show();
        setTimeout(() => {
          Utils.pause(true);
        }, 1000);

        break;
      case 2:
        this.showTutorial2(tutorial2);

        break;
      case 3:
        BlackBG.instance.show(Images.data.blackbg3);
        tutorial3.show();
        setTimeout(() => {
          Utils.pause(true);
        }, 1000);
        break;
    }

    Events.ui.add((data: any) => {
      if (data.type != EventTypes.TUTORIAL_CLOSE_BTN_CLICKED) return;
      tutorial1.hide();
      tutorial2.hide();
      tutorial3.hide();
      Events.input.notifyObservers({
        name: "BallPicker:setActive",
        state: true,
      });
      BlackBG.instance.hide();
      Utils.pause(false);
      tutorialStep++;
    });
  }

  private showTutorial2(tutorial2: Tutorial2) {
    // dont remove this line
    //  Utils.isgamePaused = true;

    Events.gamePlay.notifyObservers({ type: "LevelCreator:resetCansPos" });

    Events.input.notifyObservers({
      name: "BallPicker:setActive",
      state: false,
    });

    BlackBG.instance.show(Images.data.blackbg2);
    tutorial2.show();
    setTimeout(() => {
      Utils.pause(true);
    }, 1000);
  }

  hide() {}
  show(step: number) {}

  createContinueBtn() {
    var close_btn = new GUI.Image();
    close_btn.source = Images.data.tutorial_continue;
    close_btn.widthInPixels = 120*1.2;
    close_btn.heightInPixels = 47*1.2;
    close_btn.leftInPixels = 150;
    close_btn.topInPixels = 0;
    close_btn.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    close_btn.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;

    close_btn.onPointerClickObservable.add(() => {
      Events.ui.notifyObservers({
        type: EventTypes.TUTORIAL_CLOSE_BTN_CLICKED,
      });
    });
    return close_btn;
  }
}

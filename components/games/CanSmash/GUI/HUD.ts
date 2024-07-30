import * as GUI from "@babylonjs/gui";
import { PowerupUI } from "../Powerups/PowerupUI";
import { TimerUI } from "./TimerUI";
import { ScoreUI } from "./ScoreUI";
import { PauseBtnUI } from "./PauseBtnUI";
import { EntityUI } from "./EntityUI";
import { EventTypes, Events } from "../Events";
import { BIGBALL_POWERUP_COST, SHIELD_POWERUP_COST } from "../Consts";
import { Timer } from "../Timer";
import { Images } from "../Images";

export class HUD {
  constructor(advancedTexture: GUI.AdvancedDynamicTexture) {
    let maxTimer = 30;
    let timer = maxTimer;

    var self = this;
    var top_panel = new GUI.Image();
    top_panel.source = Images.data.TopPanel;
    top_panel.heightInPixels = 130;
    top_panel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    top_panel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    advancedTexture.addControl(top_panel);

    let shieldGUI1 = new PowerupUI(
      advancedTexture,
      Images.data.shield,
      Images.data.ring1,
      EventTypes.SHIELD_POWERUP_BTN_CLICKED
    );
    //shieldGUI1.setCounterText(SHIELD_POWERUP_COST);
    shieldGUI1.container.topInPixels = -10;

    let biggerBallGUI1 = new PowerupUI(
      advancedTexture,
      Images.data.biggerBall,
      Images.data.ring2,
      EventTypes.BIGBALL_POWERUP_BTN_CLICKED
    );
    // biggerBallGUI1.setCounterText(BIGBALL_POWERUP_COST);
    biggerBallGUI1.container.topInPixels = -110;

    let timerUI = new TimerUI(advancedTexture);

    Events.ui.add((data: any) => {
      if (data.type != EventTypes.RESET_TIMER) return;
      timerUI.reset(data.time);
    });

    let scoreUi = new ScoreUI(advancedTexture);
    scoreUi.setCounterText("10,000,000");
    Events.ui.add((data: any) => {
      if (data.type == EventTypes.CHANGE_SCORE) {
        scoreUi.setCounterText(data.count.toString());
      }
    });
    //creditUI.setCounterText("10");

    let pauseBtnUI = new PauseBtnUI(advancedTexture);

    //

    let heartUI = new EntityUI(advancedTexture);
    heartUI.setTexture(Images.data.heart);
    heartUI.setPos(20, -160);

    Events.ui.add((data: any) => {
      if (data.name == "live") {
        heartUI.setCounterText(data.count.toString());
      }
    });

    let creditUI = new EntityUI(advancedTexture);
    creditUI.setTexture(Images.data.Energy);
    creditUI.setPos(20, -290);

    Events.ui.add((data: any) => {
      if (data.type == "EntityUI:setCreditCount")
        creditUI.setCounterText(data.count.toString());
    });

    Events.ui.add((data: any) => {
      if (data.type == EventTypes.POWERUP_CREDIT_CHANGE) {
        creditUI.setCounterText(data.count.toString());

        if (data.count >= BIGBALL_POWERUP_COST) biggerBallGUI1.startTween();
        else biggerBallGUI1.stopTween();

        if (data.count >= SHIELD_POWERUP_COST) shieldGUI1.startTween();
        else shieldGUI1.stopTween();
      }
    });

    let remainingTargetUI = new EntityUI(advancedTexture, 140);
    remainingTargetUI.setTexture(Images.data.Booster05);
    remainingTargetUI.setPos(20, -10);

    Events.ui.add((data: any) => {
      if (data.type != EventTypes.REMAINING_TARGET_UI) return;
      remainingTargetUI.setCounterText(`${data.hitCount}/${data.targetCount}`);
    });
  }
}

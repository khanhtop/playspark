import {
  BALLS,
  FLAME_BOOST_COST,
  FLAME_BOOST_TEXTURE,
  FLAME_BOOST_TRY_COUNT,
} from "../Consts";
import SmashBlitzThrowing from "../app";
import { PowerupBtn } from "./PowerupBtn";
import { PowerupOverlay } from "./PowerupOverlay";

export class FlameBoostBtn {
  isFirstFlameBoost: boolean = true;
  constructor(_scene: Phaser.Scene, x: number, y: number) {
    this.isFirstFlameBoost = true;

    let powerupOverlay = PowerupOverlay.getInstance(_scene);

    let powerupBtnFire = new PowerupBtn(
      _scene,
      x,
      y,
      FLAME_BOOST_TEXTURE,
      FLAME_BOOST_COST.toString()
    );

    let cmnt = () => {
      // console.log("booster flame");
      if (SmashBlitzThrowing.instance.boostCredits < FLAME_BOOST_COST) return;
      SmashBlitzThrowing.instance.boostCredits -= FLAME_BOOST_COST;
      _scene.events.emit(
        "PowerupHandler:setCount",
        SmashBlitzThrowing.instance.boostCredits
      );
      _scene.events.emit("RocketBoost:boost");

      if (this.isFirstFlameBoost) {
        this.isFirstFlameBoost = false;
        powerupOverlay.show();
        powerupOverlay.setTitleText("IGNITE BOOST UNLOCKED!", [
          [0, "#ffffff"],
          [0.54, "#ffffff"],
          [0.54, "#C1FF72"],
          [0.54, "#C1FF72"],
          [1, "#C1FF72"],
        ]);
        powerupOverlay.setMsgText(
          `SUPER TARGETS ON YOUR NEXT ${FLAME_BOOST_TRY_COUNT} ATTEMPTS`,
          [
            [0, "#C1FF72"],
            [0.365, "#C1FF72"],
            [0.365, "#ffffff"],
            [1, "#ffffff"],
          ]
        );
      }
    };

    powerupBtnFire.clickArea.on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_UP,
      cmnt
    );
  }
}

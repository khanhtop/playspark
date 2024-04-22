import { ROKET_BOOST_COST, ROKET_BOOST_MULTIPLIER, ROKET_BOOST_TEXTURE, ROKET_BOOST_TRY_COUNT } from "../Consts";
import SmashBlitzThrowing from "../app";
import { PowerupBtn } from "./PowerupBtn";
import { PowerupOverlay } from "./PowerupOverlay";

export class RocketBoostBtn {
  isFirstRoketBoost: boolean = true;
  constructor(_scene: Phaser.Scene, x: number, y: number) {
    this.isFirstRoketBoost = true;

    let powerupOverlay = PowerupOverlay.getInstance(_scene);

    let powerupBtnRocket = new PowerupBtn(
      _scene,
      x,
      y,
      ROKET_BOOST_TEXTURE,
      ROKET_BOOST_COST.toString()
    );
    let cmnt = () => {
      // console.log("booster flame");
      if ( SmashBlitzThrowing.instance.boostCredits < ROKET_BOOST_COST) return;
      SmashBlitzThrowing.instance.boostCredits -= ROKET_BOOST_COST;
      _scene.events.emit(
        "PowerupHandler:setCount",
        SmashBlitzThrowing.instance.boostCredits
      );
      _scene.events.emit("FlameBoost:boost");
      if (this.isFirstRoketBoost) {
        this.isFirstRoketBoost = false;
        powerupOverlay.show();

        powerupOverlay.setTitleText("SUPER BOOST UNLOCKED!", [
          [0, "#ffffff"],
          [0.54, "#ffffff"],
          [0.54, "#C1FF72"],
          [0.54, "#C1FF72"],
          [1, "#C1FF72"],
        ]);
        powerupOverlay.setMsgText(`GET X${ROKET_BOOST_MULTIPLIER} MULTIPLIER ON YOUR NEXT ${ROKET_BOOST_TRY_COUNT}  ATTEMPTS`, [
          [0, "#ffffff"],
          [0.08, "#ffffff"],
          [0.08, "#C1FF72"],
          [0.41, "#C1FF72"],
          [0.41, "#ffffff"],
          [1, "#ffffff"],
        ]);
      }
    };
    powerupBtnRocket.clickArea.on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_UP,
      cmnt
    );
  }
}

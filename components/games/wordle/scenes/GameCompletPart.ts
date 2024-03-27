import { Scene } from "phaser";
import { Helper } from "./Helper";
import { Observer } from "./Observer";
import { CONSTS } from "./Consts";
import { GAME } from "./GameConfg";

export class GameComletePart {
  public static init(
    app: Scene,
    LAYOUT: any,
    UI: any,
    mW: number,
    mH: number,
    w: number,
    h: number
  ) {
    const BONUS_PART = (LAYOUT as any)[CONSTS.LAYOUT_KEYS.BONUS];

    let black_bg = app.add
      .graphics()
      .fillStyle(0x000000, 0.5) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
      .fillRect(0, 0, app.game.canvas.width, app.game.canvas.height)
      .setInteractive();

    Observer.emitter.on("onResize", (_w: number, _h: number) => {
      black_bg.clear();
      black_bg.fillRect(0, 0, _w, _h);
    });

    BONUS_PART.add(black_bg);

    BONUS_PART.add(
      app.add
        .sprite(mW, mH - 40, "popup_bg")
        .setDisplaySize(
          Helper.convertScaleData(300),
          Helper.convertScaleData(360)
        )
    );

    BONUS_PART.add(
      Helper.addButton(
        UI,
        app,
        "main-btn-bg",
        Helper.convertScaleData(200),
        Helper.convertScaleData(70),
        mW,
        mH - Helper.convertScaleData(200),
        "NICE!",
        BONUS_PART,
        "#fff",
        () => {
          Helper.changeScreen(LAYOUT, CONSTS.LAYOUT_KEYS.BONUS, false);
          Helper.addScreen(LAYOUT, CONSTS.LAYOUT_KEYS.SCORE);
          GAME.PAUSE = true;
          GAME.COIN += GAME.CUR_COIN;
          (UI as any)[CONSTS.UI_KEYS.COIN_GAME].setText(GAME.CUR_COIN);

          Observer.emitter.emit("btn_click");
        }
      )
    );


    /* app.anims.create({
        key: "diamond",
        frames: app.anims.generateFrameNames("gems", {
          prefix: "diamond_",
          end: 15,
          zeroPad: 4,
        }),
        frameRate: 16,
        yoyo: true,
        repeat: -1,
        repeatDelay: 300,
      })
*/

    app.anims.create({
      key: "diamond",
      frames: app.anims.generateFrameNumbers("gems", {
        frames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
      }),
      frameRate: 15,
      repeat: -1,
      repeatDelay: 1000,
    });

    BONUS_PART.add(
      app.add
        .sprite(mW, mH - Helper.convertScaleData(80), "gems")
        .play("diamond")
        .setScale(0.35)
    );

    BONUS_PART.add(
      app.add
        .text(
          mW,
          mH - Helper.convertScaleData(-40),
          "You have completed \n all the words!"
        )
        .setOrigin(0.5, 0.5)
        .setStyle({
          ...CONSTS.TEXT_MAIN_STYLE,
          fontSize: Helper.convertScaleData(20) + "px",
          fill: "#000000",
        })
    );

    BONUS_PART.add(
      Helper.addButton(
        UI,
        app,
        "green_btn",
        Helper.convertScaleData(150),
        Helper.convertScaleData(70),
        mW,
        mH + Helper.convertScaleData(100),
        "Continue",
        BONUS_PART,
        "#fff",
        () => {
          Helper.changeScreen(LAYOUT, CONSTS.LAYOUT_KEYS.BONUS, false);
          Helper.startRound(UI);

          Observer.emitter.emit("btn_click");
        }
      )
    );

    BONUS_PART.setVisible(false);
  }
}

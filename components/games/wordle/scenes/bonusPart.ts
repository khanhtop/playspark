import { Scene } from "phaser";
import { Helper } from "./Helper";
import { Observer } from "./Observer";
import { CONSTS } from "./Consts";
import { GAME } from "./GameConfg";

export class BonusPart {
  // BONUS PART
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

    BONUS_PART.add(
      app.add
        .graphics()
        .fillStyle(0x000000, 0.5) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
        .fillRect(0, 0, w, h)
        .setInteractive()
    );

    BONUS_PART.add(
      app.add
        .sprite(mW, mH - 40, "word_input_btn")
        .setDisplaySize(
          Helper.convertScaleData(300),
          Helper.convertScaleData(330)
        )
    );

    //reza
    BONUS_PART.add(
      Helper.addButton(
        UI,
        app,
        "main-btn-bg",
        Helper.convertScaleData(200),
        Helper.convertScaleData(70),
        mW,
        mH - Helper.convertScaleData(200),
        "You Win!",
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

    BONUS_PART.add(
      app.add
        .sprite(mW, mH - Helper.convertScaleData(90), "bonus")
        .setDisplaySize(
          Helper.convertScaleData(130),
          Helper.convertScaleData(140)
        )
    );

    BONUS_PART.add(
      app.add
        .sprite(mW, mH + 5, "green_btn")
        .setDisplaySize(
          Helper.convertScaleData(200),
          Helper.convertScaleData(70)
        )
        .setInteractive()
        .on("pointerup", () => {
          Helper.changeScreen(LAYOUT, CONSTS.LAYOUT_KEYS.BONUS, false);
          Helper.addScreen(LAYOUT, CONSTS.LAYOUT_KEYS.SCORE);
          GAME.PAUSE = true;
          GAME.COIN += GAME.CUR_COIN;
          (UI as any)[CONSTS.UI_KEYS.COIN_GAME].setText(GAME.CUR_COIN);

          Observer.emitter.emit("btn_click");
        })
    );

    // BONUS_PART.add(
    //   this.add.sprite(mW - Helper.convertScaleData(50), mH, 'play').setDisplaySize(Helper.convertScaleData(40), Helper.convertScaleData(40))
    // )

    // UI[UI_KEYS.COIN_VIDEO] = this.add.text(mW, mH, '80').setStyle({
    //   ...this.text_main_style,
    //   fontSize: Helper.convertScaleData(35) + 'px',
    //   fill: '#fff',
    // }).setOrigin(0.5, 0.5).setVisible(false)
    // BONUS_PART.add(UI[UI_KEYS.COIN_VIDEO])

    // BONUS_PART.add(
    //   this.add.sprite(mW + Helper.convertScaleData(55), mH - 3, 'coin').setDisplaySize(Helper.convertScaleData(45), Helper.convertScaleData(45))
    // )

    (UI as any)[CONSTS.UI_KEYS.COIN_BONUS] = app.add
      .text(mW, mH + Helper.convertScaleData(0), "Claim 20")
      .setStyle({
        ...CONSTS.TEXT_MAIN_STYLE,
        fontSize: Helper.convertScaleData(20) + "px",
        // fill: '#faab41',
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on("pointerup", () => {
        Helper.changeScreen(LAYOUT, CONSTS.LAYOUT_KEYS.BONUS, false);
        Helper.addScreen(LAYOUT, CONSTS.LAYOUT_KEYS.SCORE);
        GAME.PAUSE = true;
        GAME.COIN += GAME.CUR_COIN;
        (UI as any)[CONSTS.UI_KEYS.COIN_GAME].setText(GAME.CUR_COIN);

        Observer.emitter.emit("btn_click");
      });
    BONUS_PART.add((UI as any)[CONSTS.UI_KEYS.COIN_BONUS]);

    BONUS_PART.add(
      app.add
        .sprite(
          mW + Helper.convertScaleData(65),
          mH + Helper.convertScaleData(-5),
          "coin"
        )
        .setDisplaySize(
          Helper.convertScaleData(40),
          Helper.convertScaleData(40)
        )
    );

    BONUS_PART.setVisible(false);
  }
}

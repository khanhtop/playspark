import { GameObjects, Scene } from "phaser";
import { Helper } from "./Helper";
import { Observer } from "./Observer";
import { CONSTS } from "./Consts";
import { GAME } from "./GameConfg";

export class GamePart {
  public static init(
    app: Scene,
    LAYOUT: any,
    UI: any,
    mW: number,
    mH: number,
    w: number,
    h: number,
    callBack: any,
    sampleWords: any
  ) {
    let GAME_PART = (LAYOUT as any)[CONSTS.LAYOUT_KEYS.GAME];
    // GAME TOP PART
    const topY = 40;
    (UI as any)[CONSTS.UI_KEYS.BACK_BTN_GAME] = Helper.addButton(
      UI,
      app,
      "back",
      Helper.convertScaleData(20),
      Helper.convertScaleData(35),
      Helper.convertScaleData(35),
      Helper.convertScaleData(40),
      "",
      GAME_PART,
      "",
      () => {
        if (GAME.PAUSE) return;
        Observer.emitter.emit("btn_click");

        /// this.initGame();
        Observer.emitter.emit("initGame");
        Helper.changeScreen(LAYOUT, CONSTS.LAYOUT_KEYS.GAME, false);
        Helper.changeScreen(LAYOUT, CONSTS.LAYOUT_KEYS.MENU);
      }
    );

    // GAME DAILY PART

    // GAME_PART.add(
    //   this.add.sprite(mW, topY, 'calendar').setOrigin(0.5, 0.5).setDisplaySize(45, 45)
    // )
    // UI[UI_KEYS.CALENDA_DAY_GAME] = this.add.text(mW, topY + Helper.convertScaleData(5), "21").setStyle({
    //   ...CONSTS.TEXT_MAIN_STYLE,
    //   fontSize: 24 + 'px',
    //   fill: '#333',
    // }).setOrigin(0.5, 0.5);
    // UI[UI_KEYS.CALENDA_MONTH_GAME] = this.add.text(mW, topY - Helper.convertScaleData(15), "JAN").setStyle({
    //   ...CONSTS.TEXT_MAIN_STYLE,
    //   fontSize: 6 + 'px',
    //   fill: '#fff',
    // }).setOrigin(0.5, 0.5);
    // GAME_PART.add(UI[UI_KEYS.CALENDA_DAY_GAME]);

    // GAME CLASSIC PART
    GAME_PART.add(
      app.add
        .text(mW, topY - Helper.convertScaleData(15), "SCORE")
        .setStyle({
          ...CONSTS.TEXT_MAIN_STYLE,
          fontSize: Helper.convertScaleData(15) + "px",
          fill: "#575757",
        })
        .setOrigin(0.5, 0.5)
    );

    (UI as any)[CONSTS.UI_KEYS.SCORE_GAME] = app.add
      .text(mW, topY + Helper.convertScaleData(5), "10")
      .setStyle({
        ...CONSTS.TEXT_MAIN_STYLE,
        fontSize: Helper.convertScaleData(30) + "px",
        fill: "#575757",
      })
      .setOrigin(0.5, 0.5);
    GAME_PART.add((UI as any)[CONSTS.UI_KEYS.SCORE_GAME]);

    GAME_PART.add(
      app.add
        .sprite(
          mW + Helper.convertScaleData(40),
          topY - Helper.convertScaleData(10),
          "info"
        )
        .setOrigin(0.5, 0.5)
        .setDisplaySize(20, 20)
        .setInteractive()
        .on("pointerup", () => {
          Helper.addScreen(LAYOUT, CONSTS.LAYOUT_KEYS.GUIDE);
          GAME.PAUSE = true;

          Observer.emitter.emit("btn_click");
        })
    );

    GAME_PART.add(
      app.add
        .sprite(w - Helper.convertScaleData(30), topY, "coin")
        .setOrigin(0.5, 0.5)
        .setDisplaySize(30, 30)
    );
    (UI as any)[CONSTS.UI_KEYS.COIN_GAME] = app.add
      .text(w - Helper.convertScaleData(50), topY, "0")
      .setStyle({
        ...CONSTS.TEXT_MAIN_STYLE,
        fontSize: Helper.convertScaleData(24) + "px",
        fill: "#fff",
      })
      .setOrigin(1, 0.5);
    GAME_PART.add((UI as any)[CONSTS.UI_KEYS.COIN_GAME]);

    // GAME MIDDLE PART
    const boxR = Helper.convertScaleData(45);
    const startY = Helper.convertScaleData(80);
    const startX = mW - boxR * 1.05 * 2.5;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        (UI as any)[`WB${i}${j}`] = app.add
          .sprite(startX + boxR * 1.05 * j, startY + boxR * 1.05 * i, "outline")
          .setDisplaySize(boxR, boxR)
          .setOrigin(0, 0);
        (UI as any)[`WT${i}${j}`] = app.add
          .text(
            startX + boxR * 1.05 * j + boxR / 2,
            startY + boxR * 1.05 * i + boxR / 2,
            ""
          )
          .setStyle({
            ...CONSTS.TEXT_MAIN_STYLE,
            fontSize: 25 + "px",
            color: "#fff",
          })
          .setOrigin(0.5, 0.5);

        GAME_PART.add((UI as any)[`WB${i}${j}`]);
        GAME_PART.add((UI as any)[`WT${i}${j}`]);
      }
    }
    let lastY = 0;
    CONSTS.INPUT_KEYS.forEach((key, i) => {
      let j = 0;
      let x = 0;
      let y = 0;
      let width = Helper.convertScaleData(35);
      let height = Helper.convertScaleData(50);
      let startX = mW - 4.5 * width;
      let startY = Helper.convertScaleData(80) + boxR * 7.3;

      let texture = "word_input_btn";
      let isBack = i == CONSTS.INPUT_KEYS.length - 1;

      if (i < 10) {
      } else if (i < 19) {
        startX += width / 2;
        i -= 10;
        j = 1;
      } else {
        i -= 19;
        j = 2;
      }
      x = startX + width * (i % 10);
      y = startY + height * j;

      lastY = y;

      if (isBack) {
        x += width;
        width *= 3;
      }

      Helper.addButton(
        UI,
        app,
        texture,
        width,
        height,
        x,
        y,
        key,
        GAME_PART,
        "#333",
        () => {
          if (GAME.PAUSE) return;

          Observer.emitter.emit("btn_click");

          const winput = key;
          const row = GAME.LINE;
          const column = GAME.TYPING.length;

          if (GAME.TYPING.length != 0 && isBack) {
            GAME.TYPING = GAME.TYPING.slice(0, -1);
            (UI as any)[`WB${row}${column - 1}`]?.setTexture("outline");
            (UI as any)[`WT${row}${column - 1}`]?.setText("");
            return;
          }
          if (GAME.TYPING.length == 5 || isBack) return;

          (UI as any)[`WB${row}${column}`]?.setTexture("outline");
          (UI as any)[`WT${row}${column}`]?.setText(winput);
          GAME.TYPING += winput;
        },
        `input_${key}`
      );
      GAME_PART.add((UI as any)[`input_${key}`]);
    });

    // GAME DOWN PART
    (UI as any)[CONSTS.UI_KEYS.SUMBMIT_BTN_GAME] = Helper.addButton(
      UI,
      app,
      "main-btn-bg",
      Helper.convertScaleData(150),
      Helper.convertScaleData(70),
      mW,
      lastY + Helper.convertScaleData(60),
      "SUBMIT",
      GAME_PART,
      "#fff",
      //this.onSubmint
      callBack
    );

    GAME_PART.add(
      Helper.addPowerUpBtn(
        app,
        UI,
        "blue_circle",
        "item1",
        "red_circle",
        Helper.convertScaleData(50),
        Helper.convertScaleData(50),
        Helper.convertScaleData(30),
        lastY + Helper.convertScaleData(60),
        GAME_PART,
        GAME.POWER_UPS.TARGET,
        () => {
          if (GAME.PAUSE) return;
          if (Helper.isPowerUp(UI, CONSTS.UI_KEYS.POWER_TARGET) == -1) {
            return;
          }

          Observer.emitter.emit("onPowerUp");

          let word = sampleWords[GAME.STREAK].toString();

          let key = "ABCDEFGHIJKMLNOPQRSTUVWXYZ";
          let count = 3;

          let randomLetters = Helper.getRandomLetters(
            word.toUpperCase(),
            key,
            count
          );

          for (let i = 0; i < count; i++) {
            (UI as any)[`input_${randomLetters[i].toUpperCase()}`].setTexture("inp0");
          }
        },
        CONSTS.UI_KEYS.POWER_TARGET
      )
    );

    GAME_PART.add(
      Helper.addPowerUpBtn(
        app,
        UI,
        "pink_circle",
        "item2",
        "red_circle",
        50,
        50,
        Helper.convertScaleData(80),
        lastY + Helper.convertScaleData(60),
        GAME_PART,
        GAME.POWER_UPS.DISPLAY,
        () => {
          if (GAME.PAUSE) return;
          if (Helper.isPowerUp(UI, CONSTS.UI_KEYS.POWER_DISPLAY) == -1) {
            return;
          }
          Observer.emitter.emit("onPowerUp");

          let word = sampleWords[GAME.STREAK].toString();

          let remainingLetter = "";
          let randomIndex = Math.floor(Math.random() * word.length);
          remainingLetter = word[randomIndex];

          (UI as any)[`WB${GAME.LINE}${randomIndex}`].setTexture(`w2`);
          (UI as any)[`WT${GAME.LINE}${randomIndex}`]
            .setText(remainingLetter)
            .setStyle({
              ...CONSTS.TEXT_MAIN_STYLE,
              fontSize: Helper.convertScaleData(24) + "px",
              align: "center",
              fill: "#333",
            });
        },
        CONSTS.UI_KEYS.POWER_DISPLAY
      )
    );

    let next_btn: Phaser.GameObjects.Group = Helper.addPowerUpBtn(
      app,
      UI,
      "next_btn",
      "next",
      "red_circle",
      Helper.convertScaleData(80),
      Helper.convertScaleData(50),
      w - Helper.convertScaleData(60),
      lastY + Helper.convertScaleData(60),
      GAME_PART,
      GAME.POWER_UPS.NEXT,
      () => {
        if (GAME.PAUSE) return;
        if (Helper.isPowerUp(UI, CONSTS.UI_KEYS.POWER_NEXT) == -1) {
          return;
        }

        Observer.emitter.emit("onSubmit");

        Helper.startRound(UI);
        sampleWords.splice(GAME.STREAK, 1);
      },
      CONSTS.UI_KEYS.POWER_NEXT
    );

    Observer.emitter.on("onResize", (_w: number, _h: number) => {
      // console.log(UI["POWER_NEXT"]);
      //console.log(next_btn);
     // next_btn.setX(_w - 50);
     // next_btn.setY(_h - 50);
      // Phaser.Display.Align.In.BottomRight(next_btn , pic);
      //  (UI as any)[GAME.POWER_UPS.NEXT].setX(_w/2);
      // (UI as any)[GAME.POWER_UPS.NEXT].setY(_h/2);

      // GAME_PART.setX(_w/2);
      // GAME_PART.setY(_h/2);
    });

    GAME_PART.add(next_btn);

    GAME_PART.setVisible(false);
  }
}

import { Scene } from "phaser";
import { CONSTS } from "./Consts";
import { GAME } from "./GameConfg";

export class Helper {
  public static convertScaleData(x: number, rate = 1) {
    return x * rate;
  }
  public static shuffle(array: any) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  public static compareWords(word: string, compareWord: string) {
    let result = [];
    word = word.toLocaleUpperCase();
    for (let i = 0; i < word.length; i++) {
      if (word[i] === compareWord[i]) {
        result.push(2);
      } else if (compareWord.includes(word[i])) {
        result.push(1);
      } else {
        result.push(0);
      }
    }

    return result;
  }
  public static changeScreen(LAYOUT: any, key: string, val = true) {
    if (val) {
      Object.keys(CONSTS.LAYOUT_KEYS).forEach((k) => {
        (LAYOUT as any)[k].setVisible(false);
      });
    } else {
      GAME.PAUSE = false;
    }

    (LAYOUT as any)[key].setVisible(val);
  }

  public static score(UI: any, number = 0) {
    // this.changeScreen(LAYOUT_KEYS.SCORE, true)

    (UI as any)[CONSTS.UI_KEYS.SCORE_LAYOUT_VAL].setText(number);

    GAME.SCORE += number;
    (UI as any)[CONSTS.UI_KEYS.SCORE_GAME]?.setText(GAME.SCORE);
  }
  public static isPowerUp(UI: any, key: string) {
    let num = -1;
    if (key == CONSTS.UI_KEYS.POWER_DISPLAY && GAME.POWER_UPS.DISPLAY > 0) {
      num = --GAME.POWER_UPS.DISPLAY;
    } else if (key == CONSTS.UI_KEYS.POWER_NEXT && GAME.POWER_UPS.NEXT > 0) {
      num = --GAME.POWER_UPS.NEXT;
    } else if (
      key == CONSTS.UI_KEYS.POWER_TARGET &&
      GAME.POWER_UPS.TARGET > 0
    ) {
      num = --GAME.POWER_UPS.TARGET;
    }
    if (num != -1) {
      (UI as any)[key].setText(num);
    }
    return num;
  }
  public static startRound(UI: any) {
    GAME.CUR_COIN = 0;
    // GAME.STREAK = 0;
    GAME.LINE = 0;
    GAME.TYPING = "";

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        (UI as any)[`WB${i}${j}`].setTexture("outline");
        (UI as any)[`WT${i}${j}`]
          .setStyle({
            ...CONSTS.TEXT_MAIN_STYLE,
            fontSize: Helper.convertScaleData(25) + "px",
            color: "#fff",
          })
          .setText("");
      }
    }

    CONSTS.INPUT_KEYS.forEach((key) => {
      (UI as any)[`input_${key}`].setTexture("word_input_btn");
    });
  }

  public static addScreen(LAYOUT: any, key: string) {
    (LAYOUT as any)[key].setVisible(true);
  }
  public static addPowerUpBtn(
    app: Scene,
    UI: any,
    backSprite: string,
    sprite: string,
    badge: string,
    width: number,
    height: number,
    x: number,
    y: number,
    group: any,
    text: number,
    handleFunc = function () {},
    key: string
  ) {
    let _text = text.toString();
    const style = {
      fontFamily: "customFont",
      fontSize: Helper.convertScaleData(12) + "px",
      align: "center",
      fill: "#fff",
    };
    let _group: Phaser.GameObjects.Group = new Phaser.GameObjects.Group(app);
    let bgSprite = app.add
      .sprite(x, y, backSprite)
      .setOrigin(0.5, 0.5)
      .setDisplaySize(width, height)
      .setInteractive()
      .on("pointerup", handleFunc);

    let sp = app.add
      .sprite(x, y, sprite)
      .setOrigin(0.5, 0.5)
      .setDisplaySize(height * 0.6, height * 0.6);

    const badgeX = x + width * 0.3;
    const badgeY = y + height * 0.3;

    let sp2 = app.add
      .sprite(badgeX, badgeY, badge)
      .setOrigin(0.5, 0.5)
      .setDisplaySize(20, 20);

    group.add(bgSprite);
    group.add(sp);

    group.add(sp2);

    let txt = null;
    if (_text != "") {
      txt = (UI as any)[key] = app.add
        .text(badgeX, badgeY, _text)
        .setStyle(style)
        .setOrigin(0.5, 0.5);
      group.add((UI as any)[key]);
    }

    _group.add(bgSprite);
    _group.add(sp);
    _group.add(sp2);
    if (txt != null) _group.add(txt);

    return _group;
  }

  public static getRandomLetters(word: string, key: string, count: number) {
    let remainingLetters = "";

    for (let i = 0; i < key.length; i++) {
      if (!word.includes(key[i])) {
        remainingLetters += key[i];
      }
    }

    let randomLetters = "";
    for (let i = 0; i < count; i++) {
      let randomIndex = Math.floor(Math.random() * remainingLetters.length);
      randomLetters += remainingLetters[randomIndex];
    }

    return randomLetters;
  }
  public static addButton(
    UI: any,
    app: Scene,
    sprite: string,
    width: number,
    height: number,
    x: number,
    y: number,
    text: string,
    group: any,
    color = "#fff",
    handleFunc = function () {},
    key = ""
  ) {
    const style = {
      fontFamily: "customFont",
      fontSize: Helper.convertScaleData(24) + "px",
      align: "center",
      fill: color,
    };

    if (key == "") {
      group.add(
        app.add
          .sprite(x, y, sprite)
          .setOrigin(0.5, 0.5)
          .setInteractive()
          .setDisplaySize(width, height)
          .on("pointerup", handleFunc.bind(this))
      );
    } else {
      (UI as any)[key] = app.add
        .sprite(x, y, sprite)
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .setDisplaySize(width, height)
        .on("pointerup", handleFunc.bind(this));
      group.add((UI as any)[key]);
    }

    if (text != "") {
      group.add(app.add.text(x, y, text).setStyle(style).setOrigin(0.5, 0.5));
    }

    return group;
  }
}

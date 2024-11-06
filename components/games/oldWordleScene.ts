import Phaser from "phaser";
import { getImageWithSize } from "@/helpers/cloudinary";

let w: number,
  h: number,
  mW: number,
  mH: number,
  ballR: number,
  playerR: number,
  aiR: number,
  scr: number,
  goalH: number,
  sideW: number,
  boundW: number,
  boundH: number,
  ballVY: number,
  ballVX: number,
  collW: number,
  scrW: number,
  scrH: number,
  heartNum: number,
  heartR: number,
  boosterNum: number;
let UI = {};
let LAYOUT = {};
let SCORE_SYSTEM = [
  {
    score: 250,
    coin: 100,
  },
  {
    score: 200,
    coin: 75,
  },
  {
    score: 150,
    coin: 50,
  },
  {
    score: 100,
    coin: 25,
  },
  {
    score: 50,
    coin: 15,
  },
  {
    score: 10,
    coin: 5,
  },
];

let LAYOUT_KEYS = {
  LOGO: "LOGO",
  MENU: "MENU",
  GAME: "GAME",
  BONUS: "BONUS",
  SCORE: "SCORE",
  GUIDE: "GUIDE",
};

let UI_KEYS = {
  PLAY_BTN_LOGO: "PLAY_BTN_LOGO",
  DAILY_BTN_MENU: "DAILY_BTN_MENU",
  CLASSIC_BTN_MENU: "CLASSIC_BTN_MENU",
  BACK_BTN_GAME: "BACK_BTN_GAME",
  SUMBMIT_BTN_GAME: "SUMBMIT_BTN_GAME",
  CALENDA_DAY_GAME: "CALENDA_DAY_GAME",
  CALENDA_MONTH_GAME: "CALENDA_MONTH_GAME",
  COIN_GAME: "COIN_GAME",
  SCORE_LAYOUT_VAL: "SCORE_LAYOUT_VAL",
  SCORE_LAYOUT_STREAK: "SCORE_LAYOUT_STREAK",
  SCORE_GAME: "SCORE_GAME",
  COIN_BONUS: "COIN_BONUS",
  COIN_VIDEO: "COIN_VIDEO",
  POWER_TARGET: "POWER_TARGET",
  POWER_DISPLAY: "POWER_DISPLAY",
  POWER_NEXT: "POWER_NEXT",
};

let GAME_TYPE = {
  DAILY: "DAILY",
  CLASSIC: "CLASSIC",
};

let GAME = {
  STATUS: GAME_TYPE.CLASSIC,
  WORDS: [],
  TYPING: "",
  LINE: 0,
  SCORE: 0,
  STREAK: 0,
  COIN: 0,
  CUR_COIN: 0,
  PAUSE: false,
  POWER_UPS: {
    TARGET: 1,
    DISPLAY: 1,
    NEXT: 3,
  },
};

let sampleWords = ["score", "leave", "rummy", "jumpe", "uncry", "camel"];

const INPUT_KEYS = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "BACK",
];

let gameType = "wordle";

export default class WordleScene extends Phaser.Scene {
  public static instance: WordleScene;
  private params: any;
  private text_main_style: any;

  constructor(newGameType: string, newParams: any) {
    super();
    WordleScene.instance = this;
    gameType = newGameType;
    console.log(newParams);
    this.params = newParams;
    sampleWords = this.shuffle([...this.params.words]);
  }

  preload() {
    w = this.game.canvas.clientWidth;
    h = this.game.canvas.clientHeight;
    ballR = w * 0.1;
    playerR = w * 0.175;
    aiR = w * 0.175;
    scr = h * 0.08;
    mW = w / 2;
    mH = (h - scr) / 2 + scr;
    goalH = h * 0.09;
    sideW = w * 0.08;
    boundW = w - 2 * sideW;
    boundH = h - scr - 2 * goalH;
    ballVY = h * 0.5;
    ballVX = w * 0.75;
    collW = w * 0.24;
    scrW = w * 0.375;
    scrH = (w * 0.175) / 1.614;
    heartR = w * 0.0625;
    heartNum = this.params.lives;

    this.params.backgroundSprite = !!this.params.backgroundSprite
      ? getImageWithSize(this.params.backgroundSprite, 1200)
      : "/pong/" + gameType + "/bg.jpg";

    this.load.image("bg", this.params.backgroundSprite);
    this.load.image("main-btn-bg", "/pong/" + gameType + "/main-btn-bg.png");
    this.load.image("back", "/pong/" + gameType + "/back.png");
    this.load.image("calendar", "/pong/" + gameType + "/calendar.png");
    this.load.image("info", "/pong/" + gameType + "/info.png");
    this.load.image("coin", "/pong/" + gameType + "/coin.png");
    this.load.image("item1", "/pong/" + gameType + "/item1.png");
    this.load.image("item2", "/pong/" + gameType + "/item2.png");
    this.load.image("red_circle", "/pong/" + gameType + "/red_circle.png");
    this.load.image("pink_circle", "/pong/" + gameType + "/pink_circle.png");
    this.load.image("blue_circle", "/pong/" + gameType + "/blue_circle.png");
    this.load.image("outline", "/pong/" + gameType + "/outline.png");
    this.load.image("w2", "/pong/" + gameType + "/1.png");
    this.load.image("w1", "/pong/" + gameType + "/2.png");
    this.load.image("w0", "/pong/" + gameType + "/3.png");
    this.load.image("inp0", "/pong/" + gameType + "/5.png");
    this.load.image("inp1", "/pong/" + gameType + "/7.png");
    this.load.image("inp2", "/pong/" + gameType + "/6.png");
    this.load.image(
      "word_input_btn",
      "/pong/" + gameType + "/word_input_btn.png"
    );
    this.load.image("back_btn", "/pong/" + gameType + "/back_btn.png");
    this.load.image("next_btn", "/pong/" + gameType + "/next_btn.png");
    this.load.image("next", "/pong/" + gameType + "/next.png");
    this.load.image("bonus", "/pong/" + gameType + "/bonus.png");
    this.load.image("green_btn", "/pong/" + gameType + "/green_btn.png");
    this.load.image("play", "/pong/" + gameType + "/play.png");
    this.load.image("h1", "/pong/" + gameType + "/h1.png");
    this.load.image("h2", "/pong/" + gameType + "/h2.png");
    this.load.image("h3", "/pong/" + gameType + "/h3.png");
    this.load.image("h4", "/pong/" + gameType + "/h4.png");
    this.load.image("arrow", "/pong/" + gameType + "/arrow.png");
    this.load.image("bonus_video", "/pong/" + gameType + "/bonus_video.png");
    this.load.image("help", "/pong/" + gameType + "/help.png");

    // this.load.image("middleAd", this.params.sponsorLogo);

    // PONG ASSETS
    this.load.image("booster", "/pong/pongassets/booster-ball.png");
    this.load.image("FREEZE", "/pong/pongassets/freeze.png");
    this.load.image("MAGNIFY", "/pong/pongassets/magnify.png");
    this.load.image("SHRINK", "/pong/pongassets/shrink.png");
    this.load.audio("boosterAudio", "/pong/pongassets/audio/booster.mp3");

    this.load.audio("bg", "/pong/" + gameType + "/sfx/bgNoise.mp3");
    this.load.audio("whistle", "/pong/" + gameType + "/sfx/startWhistle.mp3");
    this.load.audio("ballHit", "/pong/" + gameType + "/sfx/ballHit.mp3");
    this.load.audio("goal", "/pong/" + gameType + "/sfx/goalScored.mp3");
    this.load.audio("lost", "/pong/" + gameType + "/sfx/goalConceded.mp3");
    this.load.audio("final", "/pong/" + gameType + "/sfx/finalWhistle.mp3");
    this.load.audio("win", "/pong/" + gameType + "/sfx/win.mp3");
    this.load.audio("btn", "/pong/" + gameType + "/sfx/btn.wav");
    this.load.audio("power_up", "/pong/" + gameType + "/sfx/power_up.wav");
    this.load.audio("submit", "/pong/" + gameType + "/sfx/submit.wav");

    // FONT
    let fontUrl = "/pong/" + gameType + "/Bangers-Regular.ttf";
    const font = new FontFace("customFont", `url(${fontUrl})`);

    font
      .load()
      .then(() => {
        // Font loaded successfully
        document.fonts.add(font);
      })
      .catch((error) => {
        // Font failed to load
        console.log("Failed to load font:", error);
      });
    this.text_main_style = {
      fontFamily: "customFont",
      fontSize: 24 + "px",
      align: "center",
      fill: "#ffffff",
    };
  }

  // 400 800

  private submit: any;
  private win: any;
  private final: any;
  private btn: any;
  private power_up: any;

  create() {
    this.sound.add("bg").setLoop(true).play();
    this.submit = this.sound.add("submit");
    this.win = this.sound.add("win");
    this.final = this.sound.add("final");
    this.btn = this.sound.add("btn");
    this.power_up = this.sound.add("power_up");

    this.add.image(0, 0, "bg").setOrigin(0).setDisplaySize(w, h);
    // this.add.image(mW, mH, "middleAd").setDisplaySize(80, 80).setAlpha(this.textures.exists('middleAd') ? 1 : 0);

    Object.keys(LAYOUT_KEYS).forEach((key) => {
      LAYOUT[key] = this.add.group();
    });

    // LOGO PART

    UI[UI_KEYS.PLAY_BTN_LOGO] = this.addButton(
      "main-btn-bg",
      this.convertScaleData(140),
      this.convertScaleData(65),
      mW,
      mH + this.convertScaleData(30),
      "PLAY",
      LAYOUT[LAYOUT_KEYS.LOGO],
      "#fff",
      () => {
        this.changeScreen(LAYOUT_KEYS.LOGO, false);
        this.changeScreen(LAYOUT_KEYS.MENU);
        this.btn.play();
      }
    );

    LAYOUT[LAYOUT_KEYS.LOGO].add(
      this.add
        .text(mW, mH - this.convertScaleData(70), "Wordle")
        .setOrigin(0.5, 0.5)
        .setStyle({
          ...this.text_main_style,
          fontSize: this.convertScaleData(60) + "px",
          fill: "#000",
        })
    );
    LAYOUT[LAYOUT_KEYS.LOGO].setVisible(false);

    // MENU PART
    // UI[UI_KEYS.DAILY_BTN_MENU] = this.addButton('main-btn-bg', this.convertScaleData(240), this.convertScaleData(75), mW, mH - this.convertScaleData(110), "DAILY PUZZLE", LAYOUT[LAYOUT_KEYS.MENU], "#fff", () => {
    //   this.changeScreen(LAYOUT_KEYS.MENU, false);
    //   this.changeScreen(LAYOUT_KEYS.GAME)
    //   GAME.STATUS = GAME_TYPE.DAILY;
    // });
    UI[UI_KEYS.CLASSIC_BTN_MENU] = this.addButton(
      "main-btn-bg",
      this.convertScaleData(240),
      this.convertScaleData(75),
      mW,
      mH - this.convertScaleData(30),
      "CLASSIC",
      LAYOUT[LAYOUT_KEYS.MENU],
      "#fff",
      () => {
        this.btn.play();

        this.changeScreen(LAYOUT_KEYS.MENU, false);
        this.changeScreen(LAYOUT_KEYS.GAME);
        GAME.STATUS = GAME_TYPE.CLASSIC;

        GAME.POWER_UPS.TARGET = 1;
        GAME.POWER_UPS.DISPLAY = 1;
        GAME.POWER_UPS.NEXT = 3;
        this.startRound();
      }
    );

    LAYOUT[LAYOUT_KEYS.MENU].setVisible(true);

    // GAME PART
    let GAME_PART = LAYOUT[LAYOUT_KEYS.GAME];
    // GAME TOP PART
    const topY = 40;
    UI[UI_KEYS.BACK_BTN_GAME] = this.addButton(
      "back",
      this.convertScaleData(20),
      this.convertScaleData(35),
      this.convertScaleData(35),
      this.convertScaleData(40),
      "",
      GAME_PART,
      "",
      () => {
        if (GAME.PAUSE) return;
        this.btn.play();

        this.initGame();
        this.changeScreen(LAYOUT_KEYS.GAME, false);
        this.changeScreen(LAYOUT_KEYS.MENU);
      }
    );

    // GAME DAILY PART

    // GAME_PART.add(
    //   this.add.sprite(mW, topY, 'calendar').setOrigin(0.5, 0.5).setDisplaySize(45, 45)
    // )
    // UI[UI_KEYS.CALENDA_DAY_GAME] = this.add.text(mW, topY + this.convertScaleData(5), "21").setStyle({
    //   ...this.text_main_style,
    //   fontSize: 24 + 'px',
    //   fill: '#333',
    // }).setOrigin(0.5, 0.5);
    // UI[UI_KEYS.CALENDA_MONTH_GAME] = this.add.text(mW, topY - this.convertScaleData(15), "JAN").setStyle({
    //   ...this.text_main_style,
    //   fontSize: 6 + 'px',
    //   fill: '#fff',
    // }).setOrigin(0.5, 0.5);
    // GAME_PART.add(UI[UI_KEYS.CALENDA_DAY_GAME]);

    // GAME CLASSIC PART
    GAME_PART.add(
      this.add
        .text(mW, topY - this.convertScaleData(15), "SCORE")
        .setStyle({
          ...this.text_main_style,
          fontSize: this.convertScaleData(15) + "px",
          fill: "#575757",
        })
        .setOrigin(0.5, 0.5)
    );

    UI[UI_KEYS.SCORE_GAME] = this.add
      .text(mW, topY + this.convertScaleData(5), "10")
      .setStyle({
        ...this.text_main_style,
        fontSize: this.convertScaleData(30) + "px",
        fill: "#575757",
      })
      .setOrigin(0.5, 0.5);
    GAME_PART.add(UI[UI_KEYS.SCORE_GAME]);

    GAME_PART.add(
      this.add
        .sprite(
          mW + this.convertScaleData(40),
          topY - this.convertScaleData(10),
          "info"
        )
        .setOrigin(0.5, 0.5)
        .setDisplaySize(20, 20)
        .setInteractive()
        .on("pointerup", () => {
          this.addScreen(LAYOUT_KEYS.GUIDE);
          this.btn.play();
        })
    );

    GAME_PART.add(
      this.add
        .sprite(w - this.convertScaleData(30), topY, "coin")
        .setOrigin(0.5, 0.5)
        .setDisplaySize(30, 30)
    );
    UI[UI_KEYS.COIN_GAME] = this.add
      .text(w - this.convertScaleData(50), topY, "0")
      .setStyle({
        ...this.text_main_style,
        fontSize: this.convertScaleData(24) + "px",
        fill: "#fff",
      })
      .setOrigin(1, 0.5);
    GAME_PART.add(UI[UI_KEYS.COIN_GAME]);

    // GAME MIDDLE PART
    const boxR = this.convertScaleData(45);
    const startY = this.convertScaleData(80);
    const startX = mW - boxR * 1.05 * 2.5;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        UI[`WB${i}${j}`] = this.add
          .sprite(startX + boxR * 1.05 * j, startY + boxR * 1.05 * i, "outline")
          .setDisplaySize(boxR, boxR)
          .setOrigin(0, 0);
        UI[`WT${i}${j}`] = this.add
          .text(
            startX + boxR * 1.05 * j + boxR / 2,
            startY + boxR * 1.05 * i + boxR / 2,
            ""
          )
          .setStyle({
            ...this.text_main_style,
            fontSize: 25 + "px",
            color: "#fff",
          })
          .setOrigin(0.5, 0.5);

        GAME_PART.add(UI[`WB${i}${j}`]);
        GAME_PART.add(UI[`WT${i}${j}`]);
      }
    }
    let lastY = 0;
    INPUT_KEYS.forEach((key, i) => {
      let j = 0;
      let x = 0;
      let y = 0;
      let width = this.convertScaleData(35);
      let height = this.convertScaleData(50);
      let startX = mW - 4.5 * width;
      let startY = this.convertScaleData(80) + boxR * 7.3;

      let texture = "word_input_btn";
      let isBack = i == INPUT_KEYS.length - 1;

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

      this.addButton(
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

          this.btn.play();

          const winput = key;
          const row = GAME.LINE;
          const column = GAME.TYPING.length;

          if (GAME.TYPING.length != 0 && isBack) {
            GAME.TYPING = GAME.TYPING.slice(0, -1);
            UI[`WB${row}${column - 1}`].setTexture("outline");
            UI[`WT${row}${column - 1}`].setText("");
            return;
          }
          if (GAME.TYPING.length == 5 || isBack) return;

          UI[`WB${row}${column}`].setTexture("outline");
          UI[`WT${row}${column}`].setText(winput);
          GAME.TYPING += winput;
        },
        `input_${key}`
      );
      GAME_PART.add(UI[`input_${key}`]);
    });

    // GAME DOWN PART
    UI[UI_KEYS.SUMBMIT_BTN_GAME] = this.addButton(
      "main-btn-bg",
      this.convertScaleData(150),
      this.convertScaleData(70),
      mW,
      lastY + this.convertScaleData(60),
      "SUBMIT",
      GAME_PART,
      "#fff",
      this.onSubmint
    );

    GAME_PART.add(
      this.addPowerUpBtn(
        "blue_circle",
        "item1",
        "red_circle",
        this.convertScaleData(50),
        this.convertScaleData(50),
        this.convertScaleData(30),
        lastY + this.convertScaleData(60),
        GAME_PART,
        GAME.POWER_UPS.TARGET,
        () => {
          if (GAME.PAUSE) return;
          if (this.isPowerUp(UI_KEYS.POWER_TARGET) == -1) {
            return;
          }

          this.power_up.play();

          let word = sampleWords[GAME.STREAK].toString();
          let key = "ABCDEFGHIJKMLNOPQRSTUVWXYZ";
          let count = 3;

          let randomLetters = this.getRandomLetters(
            word.toUpperCase(),
            key,
            count
          );

          for (let i = 0; i < count; i++) {
            UI[`input_${randomLetters[i]}`].setTexture("inp0");
          }
        },
        UI_KEYS.POWER_TARGET
      )
    );

    GAME_PART.add(
      this.addPowerUpBtn(
        "pink_circle",
        "item2",
        "red_circle",
        50,
        50,
        this.convertScaleData(80),
        lastY + this.convertScaleData(60),
        GAME_PART,
        GAME.POWER_UPS.DISPLAY,
        () => {
          if (GAME.PAUSE) return;
          if (this.isPowerUp(UI_KEYS.POWER_DISPLAY) == -1) {
            return;
          }
          this.power_up.play();

          let word = sampleWords[GAME.STREAK].toString();

          let remainingLetter = "";
          let randomIndex = Math.floor(Math.random() * word.length);
          remainingLetter = word[randomIndex];

          UI[`WB${GAME.LINE}${randomIndex}`].setTexture(`w2`);
          UI[`WT${GAME.LINE}${randomIndex}`].setText(remainingLetter).setStyle({
            ...this.text_main_style,
            fontSize: this.convertScaleData(24) + "px",
            align: "center",
            fill: "#333",
          });
        },
        UI_KEYS.POWER_DISPLAY
      )
    );

    GAME_PART.add(
      this.addPowerUpBtn(
        "next_btn",
        "next",
        "red_circle",
        this.convertScaleData(80),
        this.convertScaleData(50),
        w - this.convertScaleData(60),
        lastY + this.convertScaleData(60),
        GAME_PART,
        GAME.POWER_UPS.NEXT,
        () => {
          if (GAME.PAUSE) return;
          if (this.isPowerUp(UI_KEYS.POWER_NEXT) == -1) {
            return;
          }

          this.submit.play();

          this.startRound();
          sampleWords.splice(GAME.STREAK, 1);
        },
        UI_KEYS.POWER_NEXT
      )
    );

    GAME_PART.setVisible(false);

    // BONUS PART
    const BONUS_PART = LAYOUT[LAYOUT_KEYS.BONUS];

    BONUS_PART.add(
      this.add
        .graphics()
        .fillStyle(0x000000, 0.5) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
        .fillRect(0, 0, w, h)
        .setInteractive()
    );

    BONUS_PART.add(
      this.add
        .sprite(mW, mH - 40, "word_input_btn")
        .setDisplaySize(this.convertScaleData(300), this.convertScaleData(330))
    );

    BONUS_PART.add(
      this.addButton(
        "main-btn-bg",
        this.convertScaleData(200),
        this.convertScaleData(70),
        mW,
        mH - this.convertScaleData(200),
        "You Win!",
        BONUS_PART,
        "#fff",
        () => {
          this.changeScreen(LAYOUT_KEYS.BONUS, false);
          this.addScreen(LAYOUT_KEYS.SCORE);
          GAME.COIN += GAME.CUR_COIN;
          UI[UI_KEYS.COIN_GAME].setText(GAME.CUR_COIN);
          this.btn.play();
        }
      )
    );

    BONUS_PART.add(
      this.add
        .sprite(mW, mH - this.convertScaleData(90), "bonus")
        .setDisplaySize(this.convertScaleData(130), this.convertScaleData(140))
    );

    BONUS_PART.add(
      this.add
        .sprite(mW, mH + 5, "green_btn")
        .setDisplaySize(this.convertScaleData(200), this.convertScaleData(70))
        .setInteractive()
        .on("pointerup", () => {
          this.changeScreen(LAYOUT_KEYS.BONUS, false);
          this.addScreen(LAYOUT_KEYS.SCORE);
          GAME.COIN += GAME.CUR_COIN;
          UI[UI_KEYS.COIN_GAME].setText(GAME.CUR_COIN);
          this.btn.play();
        })
    );

    // BONUS_PART.add(
    //   this.add.sprite(mW - this.convertScaleData(50), mH, 'play').setDisplaySize(this.convertScaleData(40), this.convertScaleData(40))
    // )

    // UI[UI_KEYS.COIN_VIDEO] = this.add.text(mW, mH, '80').setStyle({
    //   ...this.text_main_style,
    //   fontSize: this.convertScaleData(35) + 'px',
    //   fill: '#fff',
    // }).setOrigin(0.5, 0.5).setVisible(false)
    // BONUS_PART.add(UI[UI_KEYS.COIN_VIDEO])

    // BONUS_PART.add(
    //   this.add.sprite(mW + this.convertScaleData(55), mH - 3, 'coin').setDisplaySize(this.convertScaleData(45), this.convertScaleData(45))
    // )

    UI[UI_KEYS.COIN_BONUS] = this.add
      .text(mW, mH + this.convertScaleData(0), "Claim 20")
      .setStyle({
        ...this.text_main_style,
        fontSize: this.convertScaleData(20) + "px",
        // fill: '#faab41',
        fill: "#ffffff",
      })
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on("pointerup", () => {
        this.changeScreen(LAYOUT_KEYS.BONUS, false);
        this.addScreen(LAYOUT_KEYS.SCORE);
        GAME.COIN += GAME.CUR_COIN;
        UI[UI_KEYS.COIN_GAME].setText(GAME.CUR_COIN);
        this.btn.play();
      });
    BONUS_PART.add(UI[UI_KEYS.COIN_BONUS]);

    BONUS_PART.add(
      this.add
        .sprite(
          mW + this.convertScaleData(65),
          mH + this.convertScaleData(-5),
          "coin"
        )
        .setDisplaySize(this.convertScaleData(40), this.convertScaleData(40))
    );

    BONUS_PART.setVisible(false);

    const SCORE_PART = LAYOUT[LAYOUT_KEYS.SCORE];

    SCORE_PART.add(
      this.add
        .graphics()
        .fillStyle(0x000000, 0.5) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
        .fillRect(0, 0, w, h)
        .setInteractive()
    );

    SCORE_PART.add(
      this.add
        .text(mW, mH - this.convertScaleData(200), "Your Score")
        .setOrigin(0.5, 0.5)
        .setStyle({
          ...this.text_main_style,
          fontSize: this.convertScaleData(35) + "px",
          fill: "#fff",
        })
    );

    UI[UI_KEYS.SCORE_LAYOUT_VAL] = this.add
      .text(mW, mH - this.convertScaleData(150), "80")
      .setOrigin(0.5, 0.5)
      .setStyle({
        ...this.text_main_style,
        fontSize: this.convertScaleData(40) + "px",
        fill: "#fff",
      });
    SCORE_PART.add(UI[UI_KEYS.SCORE_LAYOUT_VAL]);
    SCORE_PART.add(
      this.add
        .text(mW, mH - this.convertScaleData(100), "Current Streak")
        .setOrigin(0.5, 0.5)
        .setStyle({
          ...this.text_main_style,
          fontSize: this.convertScaleData(35) + "px",
          fill: "#fff",
        })
    );

    UI[UI_KEYS.SCORE_LAYOUT_STREAK] = this.add
      .text(mW, mH - 50, "0")
      .setOrigin(0.5, 0.5)
      .setStyle({
        ...this.text_main_style,
        fontSize: this.convertScaleData(40) + "px",
        fill: "#fff",
      });
    SCORE_PART.add(UI[UI_KEYS.SCORE_LAYOUT_STREAK]);

    SCORE_PART.add(
      this.add
        .sprite(mW - 40, mH - 50, "bonus_video")
        .setOrigin(0.5, 0.5)
        .setDisplaySize(40, 40)
    );

    SCORE_PART.add(
      this.addButton(
        "main-btn-bg",
        this.convertScaleData(200),
        this.convertScaleData(70),
        mW,
        mH + this.convertScaleData(50),
        "Continue",
        SCORE_PART,
        "#fff",
        () => {
          this.changeScreen(LAYOUT_KEYS.SCORE, false);
          this.startRound();
          this.btn.play();
        }
      )
    );

    SCORE_PART.setVisible(false);

    // GAME GUIDE PART
    const GUIDE_PART = LAYOUT[LAYOUT_KEYS.GUIDE];
    GUIDE_PART.add(
      this.add
        .graphics()
        .fillStyle(0x000000, 0.5) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
        .fillRect(0, 0, w, h)
        .setInteractive()
    );

    GUIDE_PART.add(
      this.add
        .sprite(mW, mH - this.convertScaleData(140), "word_input_btn")
        .setDisplaySize(this.convertScaleData(300), this.convertScaleData(330))
        .setInteractive()
        .on("pointerup", () => {
          this.changeScreen(LAYOUT_KEYS.GUIDE, false);
          this.btn.play();
        })
    );

    GUIDE_PART.add(
      this.add
        .text(mW, mH - this.convertScaleData(250), "HOW TO PLAY")
        .setOrigin(0.5, 0.5)
        .setStyle({
          ...this.text_main_style,
          fontSize: this.convertScaleData(30) + "px",
          fill: "#575757",
        })
    );

    GUIDE_PART.add(
      this.add
        .text(
          mW - this.convertScaleData(110),
          mH - this.convertScaleData(200),
          "6"
        )
        .setOrigin(0.5, 0.5)
        .setStyle({
          ...this.text_main_style,
          fontSize: this.convertScaleData(30) + "px",
          fill: "#575757",
        })
    );

    GUIDE_PART.add(
      this.add
        .text(
          mW - this.convertScaleData(80),
          mH - this.convertScaleData(200),
          "You have 6 tries to guess the \nword"
        )
        .setOrigin(0, 0.5)
        .setStyle({
          ...this.text_main_style,
          fontSize: this.convertScaleData(12) + "px",
          fill: "#575757",
          align: "left",
        })
    );

    GUIDE_PART.add(
      this.add
        .sprite(
          mW - this.convertScaleData(110),
          mH - this.convertScaleData(150),
          "h1"
        )
        .setDisplaySize(this.convertScaleData(30), this.convertScaleData(30))
    );

    GUIDE_PART.add(
      this.add
        .text(
          mW - this.convertScaleData(80),
          mH - this.convertScaleData(150),
          "The colours of the letters will\nchange to show if they are \ncorrect"
        )
        .setOrigin(0, 0.5)
        .setStyle({
          ...this.text_main_style,
          fontSize: this.convertScaleData(12) + "px",
          fill: "#575757",
          align: "left",
        })
    );

    GUIDE_PART.add(
      this.add
        .sprite(
          mW - this.convertScaleData(110),
          mH - this.convertScaleData(100),
          "h2"
        )
        .setDisplaySize(this.convertScaleData(30), this.convertScaleData(30))
    );

    GUIDE_PART.add(
      this.add
        .text(
          mW - this.convertScaleData(80),
          mH - this.convertScaleData(100),
          "Use “booster” to reveal 3\nincorrect letters on the keyboard"
        )
        .setOrigin(0, 0.5)
        .setStyle({
          ...this.text_main_style,
          fontSize: this.convertScaleData(12) + "px",
          fill: "#575757",
          align: "left",
        })
    );

    GUIDE_PART.add(
      this.add
        .sprite(
          mW - this.convertScaleData(110),
          mH - this.convertScaleData(50),
          "h3"
        )
        .setDisplaySize(this.convertScaleData(30), this.convertScaleData(30))
    );

    GUIDE_PART.add(
      this.add
        .text(
          mW - this.convertScaleData(80),
          mH - this.convertScaleData(50),
          "Use “bullseye” to reveal 1 \ncorrect letter on the game board"
        )
        .setOrigin(0, 0.5)
        .setStyle({
          ...this.text_main_style,
          fontSize: this.convertScaleData(12) + "px",
          fill: "#575757",
          align: "left",
        })
    );

    // GUIDE_PART.add(
    //   this.add.text(mW, mH + this.convertScaleData(70), 'EXAMPLE').setOrigin(0.5, 0.5).setStyle({
    //     ...this.text_main_style,
    //     fontSize: this.convertScaleData(40) + 'px',
    //     fill: '#fff',
    //   })
    // )

    GUIDE_PART.add(
      this.add
        .sprite(mW, mH + this.convertScaleData(170), "help")
        .setDisplaySize(this.convertScaleData(350), this.convertScaleData(245))
    );

    GUIDE_PART.setVisible(false);

    // this.cameras.main.postFX.addVignette(0.5, 0.5, 0.975);
    // this.cameras.main.postFX
    //   .addColorMatrix()
    //   .contrast(1.25)
    //   .polaroid()
    //   .brightness(0.9);

    this.initGame();
  }

  isPowerUp(key) {
    let num = -1;
    if (key == UI_KEYS.POWER_DISPLAY && GAME.POWER_UPS.DISPLAY > 0) {
      num = --GAME.POWER_UPS.DISPLAY;
    } else if (key == UI_KEYS.POWER_NEXT && GAME.POWER_UPS.NEXT > 0) {
      num = --GAME.POWER_UPS.NEXT;
    } else if (key == UI_KEYS.POWER_TARGET && GAME.POWER_UPS.TARGET > 0) {
      num = --GAME.POWER_UPS.TARGET;
    }
    if (num != -1) {
      UI[key].setText(num);
    }
    return num;
  }

  shuffle(array) {
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

  private scoreHandler;

  public setScoreHandle(handleScore: any) {
    this.scoreHandler = handleScore;
  }

  public initGame(lives = 3) {
    this.cameras.main.fadeIn(1200);
    GAME.SCORE = this.params.score;
    UI[UI_KEYS.SCORE_GAME].setText(GAME.SCORE);
    GAME.STREAK = 0;
    // setTimeout(() => this.startRound(), 2500);
  }

  loseGame() {
    this.cameras.main.fadeOut(1000);
    this.final.play();
    this.scoreHandler(GAME.SCORE);
    // game is lost
    //this.initGame();
  }

  convertScaleData(x, rate = 1) {
    return x * rate;
  }

  onSubmint() {
    if (GAME.TYPING == "" || GAME.TYPING.length != 5) return;

    this.btn.play();

    const word = GAME.TYPING;
    const compare_word = sampleWords[GAME.STREAK].toLocaleUpperCase();

    console.log(word, compare_word);

    const result = this.compareWords(word, compare_word);
    console.log(result);
    let isSuccess = 0;
    result.forEach((key, i) => {
      if (key == 2) isSuccess++;
      UI[`WB${GAME.LINE}${i}`].setTexture(`w${key}`);
      UI[`WT${GAME.LINE}${i}`].setStyle({
        ...this.text_main_style,
        fontSize: this.convertScaleData(24) + "px",
        align: "center",
        fill: key == 0 ? "#fff" : "#333",
      });
      UI[`input_${word[i]}`].setTexture(`inp${key}`);
    });
    if (isSuccess == 5) {
      this.win.play();
      const score = SCORE_SYSTEM[GAME.LINE].score;
      GAME.CUR_COIN = SCORE_SYSTEM[GAME.LINE].coin;
      this.addScreen(LAYOUT_KEYS.BONUS);

      // UI[UI_KEYS.COIN_VIDEO].setText(GAME.CUR_COIN * 2.5)
      UI[UI_KEYS.COIN_BONUS].setText(`Claim ${GAME.CUR_COIN}`);

      GAME.STREAK++;
      UI[UI_KEYS.SCORE_LAYOUT_STREAK].setText(GAME.STREAK);
      this.score(score);
    } else if (GAME.LINE == 5) {
      this.loseGame();
    }

    GAME.LINE++;
    GAME.WORDS.push(GAME.TYPING);
    GAME.TYPING = "";
  }

  compareWords(word, compareWord) {
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

  getRandomLetters(word, key, count) {
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

  addButton(
    sprite,
    width,
    height,
    x,
    y,
    text,
    group,
    color = "#fff",
    handleFunc = function () {},
    key = ""
  ) {
    const style = {
      fontFamily: "customFont",
      fontSize: this.convertScaleData(24) + "px",
      align: "center",
      fill: color,
    };

    if (key == "") {
      group.add(
        this.add
          .sprite(x, y, sprite)
          .setOrigin(0.5, 0.5)
          .setInteractive()
          .setDisplaySize(width, height)
          .on("pointerup", handleFunc.bind(this))
      );
    } else {
      UI[key] = this.add
        .sprite(x, y, sprite)
        .setOrigin(0.5, 0.5)
        .setInteractive()
        .setDisplaySize(width, height)
        .on("pointerup", handleFunc.bind(this));
      group.add(UI[key]);
    }

    if (text != "") {
      group.add(this.add.text(x, y, text).setStyle(style).setOrigin(0.5, 0.5));
    }

    return group;
  }

  addPowerUpBtn(
    backSprite,
    sprite,
    badge,
    width,
    height,
    x,
    y,
    group,
    text,
    handleFunc = function () {},
    key
  ) {
    text = text.toString();
    const style = {
      fontFamily: "customFont",
      fontSize: this.convertScaleData(12) + "px",
      align: "center",
      fill: "#fff",
    };

    group.add(
      this.add
        .sprite(x, y, backSprite)
        .setOrigin(0.5, 0.5)
        .setDisplaySize(width, height)
        .setInteractive()
        .on("pointerup", handleFunc)
    );

    group.add(
      this.add
        .sprite(x, y, sprite)
        .setOrigin(0.5, 0.5)
        .setDisplaySize(height * 0.6, height * 0.6)
    );

    const badgeX = x + width * 0.3;
    const badgeY = y + height * 0.3;

    group.add(
      this.add
        .sprite(badgeX, badgeY, badge)
        .setOrigin(0.5, 0.5)
        .setDisplaySize(20, 20)
    );

    if (text != "") {
      UI[key] = this.add
        .text(badgeX, badgeY, text)
        .setStyle(style)
        .setOrigin(0.5, 0.5);
      group.add(UI[key]);
    }

    return group;
  }

  changeScreen(key, val = true) {
    if (val) {
      Object.keys(LAYOUT_KEYS).forEach((k) => {
        LAYOUT[k].setVisible(false);
      });
    } else {
      GAME.PAUSE = false;
    }

    LAYOUT[key].setVisible(val);
  }

  addScreen(key) {
    LAYOUT[key].setVisible(true);
    GAME.PAUSE = true;
  }

  startRound() {
    GAME.CUR_COIN = 0;
    // GAME.STREAK = 0;
    GAME.LINE = 0;
    GAME.TYPING = "";

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        UI[`WB${i}${j}`].setTexture("outline");
        UI[`WT${i}${j}`]
          .setStyle({
            ...this.text_main_style,
            fontSize: this.convertScaleData(25) + "px",
            color: "#fff",
          })
          .setText("");
      }
    }

    INPUT_KEYS.forEach((key) => {
      UI[`input_${key}`].setTexture("word_input_btn");
    });
  }

  score(number = 0) {
    // this.changeScreen(LAYOUT_KEYS.SCORE, true)

    UI[UI_KEYS.SCORE_LAYOUT_VAL].setText(number);

    GAME.SCORE += number;
    UI[UI_KEYS.SCORE_GAME].setText(GAME.SCORE);
  }

  update(time, delta) {}
}

import Phaser, { Scene, Sound } from "phaser";
import { Observer } from "./Observer";
import { Helper } from "./Helper";
import { SoundManager } from "./SoundManager";
import { ImageLoader } from "./ImageLoader";
import { CONSTS } from "./Consts";
import { GAME } from "./GameConfg";
import { BonusPart } from "./bonusPart";
import { ScorePart } from "./ScorePart";
import { GamePart } from "./GamePart";
import { GuidePart } from "./GuidePart";
import { GameComletePart } from "./GameCompletPart";

import { getImageWithSize } from "@/helpers/cloudinary";
import { WordCompletePart } from "./WordCompletePart";

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

let sampleWords = ["score", "leave", "rummy", "jumpe", "uncry", "camel"];

let gameType = "wordle";
let soundManager: SoundManager;

export default class WordleScene extends Phaser.Scene {
  public static instance: WordleScene;
  private params: any;
  gameover_board: any;

  constructor(newGameType: string, newParams: any) {
    super("GameScene");
    Observer.emitter.destroy();
    Observer.emitter = new Phaser.Events.EventEmitter();

    WordleScene.instance = this;
    gameType = newGameType;

    this.params = newParams;
    // console.log("word from server: ", this.params.words);
    if (this.params.words.length != 0){
      // this.params.words = ["TOUCH", "COUCH", "TOUCH"];
     /* sampleWords = Helper.shuffle([
        ...(this.params.words?.length > 0 ? this.params.words : sampleWords),
      ]); *///Helper.shuffle(["TOUCH", "COUCH", "TOUCH", "TOUCH", "TOUCH"]); //reza [...this.params.words])
      //sampleWords = Helper.shuffle([...(this.params.words)]); 
      sampleWords = [...(this.params.words)]; 
    }
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
    heartNum = 10; //this.params.lives

    this.params.backgroundSprite = !!this.params.backgroundSprite
      ? getImageWithSize(this.params.backgroundSprite, w, h)
      : "/pong/" + gameType + "/bg.jpg";

    this.load.image("bg", this.params.backgroundSprite);
    ImageLoader.load(this, gameType);

    soundManager = new SoundManager();
    soundManager.loadAudios(this, gameType);

    // this.load.image("middleAd", this.params.sponsorLogo);

    // PONG ASSETS

    this.load.audio("boosterAudio", "/pong/pongassets/audio/booster.mp3");

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
  }

  // 400 800

  create() {
    soundManager.init(this);

    Observer.emitter.on("on_all_word_coplete_btn_click", () => {
      if (this.scoreHandler != undefined) this.scoreHandler(GAME.SCORE);
    });

    let bg = this.add
      .image(0, 0, "bg")
      .setOrigin(0)
      .setDisplaySize(this.game.canvas.width, this.game.canvas.height);
    onresize = (event) => {
      // console.log(this.game.canvas.clientWidth);
      // bg.setDisplaySize(this.game.canvas.clientWidth, this.game.canvas.clientHeight);
      bg.setDisplaySize(this.game.canvas.width, this.game.canvas.height);
      Observer.emitter.emit(
        "onResize",
        this.game.canvas.width,
        this.game.canvas.height
      );
    };
    // this.add.image(mW, mH, "middleAd").setDisplaySize(80, 80).setAlpha(this.textures.exists('middleAd') ? 1 : 0);

    Object.keys(CONSTS.LAYOUT_KEYS).forEach((key) => {
      (LAYOUT as any)[key] = this.add.group();
    });
    // LOGO PART

    (UI as any)[CONSTS.UI_KEYS.PLAY_BTN_LOGO] = Helper.addButton(
      UI,
      this,
      "main-btn-bg",
      Helper.convertScaleData(140),
      Helper.convertScaleData(65),
      mW,
      mH + Helper.convertScaleData(30),
      "PLAY",
      (LAYOUT as any)[CONSTS.LAYOUT_KEYS.LOGO],
      "#fff",
      () => {
        Helper.changeScreen(LAYOUT, CONSTS.LAYOUT_KEYS.LOGO, false);
        Helper.changeScreen(LAYOUT, CONSTS.LAYOUT_KEYS.MENU);
        Observer.emitter.emit("btn_click");
      }
    );

    (LAYOUT as any)[CONSTS.LAYOUT_KEYS.LOGO].add(
      this.add
        .text(mW, mH - Helper.convertScaleData(70), "Wordle")
        .setOrigin(0.5, 0.5)
        .setStyle({
          ...CONSTS.TEXT_MAIN_STYLE,
          fontSize: Helper.convertScaleData(60) + "px",
          fill: "#000",
        })
    );
    (LAYOUT as any)[CONSTS.LAYOUT_KEYS.LOGO].setVisible(false);

    // MENU PART
    // UI[UI_KEYS.DAILY_BTN_MENU] = Helper.addButton(UI,this,'main-btn-bg', Helper.convertScaleData(240), Helper.convertScaleData(75), mW, mH - Helper.convertScaleData(110), "DAILY PUZZLE", LAYOUT[LAYOUT_KEYS.MENU], "#fff", () => {
    //   this.changeScreen(LAYOUT_KEYS.MENU, false);
    //   this.changeScreen(LAYOUT_KEYS.GAME)
    //   GAME.STATUS = GAME_TYPE.DAILY;
    // });
    (UI as any)[CONSTS.UI_KEYS.CLASSIC_BTN_MENU] = Helper.addButton(
      UI,
      this,
      "main-btn-bg",
      Helper.convertScaleData(240),
      Helper.convertScaleData(75),
      mW,
      mH - Helper.convertScaleData(30),
      "CLASSIC",
      (LAYOUT as any)[CONSTS.LAYOUT_KEYS.MENU],
      "#fff",
      () => {
        Observer.emitter.emit("btn_click");

        Helper.changeScreen(LAYOUT, CONSTS.LAYOUT_KEYS.MENU, false);
        Helper.changeScreen(LAYOUT, CONSTS.LAYOUT_KEYS.GAME);
        GAME.STATUS = CONSTS.GAME_TYPE.CLASSIC;

        GAME.POWER_UPS.TARGET = 1;
        GAME.POWER_UPS.DISPLAY = 1;
        GAME.POWER_UPS.NEXT = 3;
        Helper.startRound(UI);
      }
    );

    (LAYOUT as any)[CONSTS.LAYOUT_KEYS.MENU].setVisible(true);

    // GAME PART
    GamePart.init(
      this,
      LAYOUT,
      UI,
      mW,
      mH,
      w,
      h,
      () => {
        this.onSubmint();
      },
      sampleWords
    );
    // bonus part
    BonusPart.init(this, LAYOUT, UI, mW, mH, w, h);

    GameComletePart.init(this, LAYOUT, UI, mW, mH, w, h);

    // WordCompletePart.init(this, LAYOUT, UI, mW, mH, w, h);

    //scre part
    ScorePart.init(this, LAYOUT, UI, mW, mH, w, h);
    // GAME GUIDE PART
    GuidePart.init(this, LAYOUT, mW, mH, w, h);

    // this.cameras.main.postFX.addVignette(0.5, 0.5, 0.975);
    // this.cameras.main.postFX
    //   .addColorMatrix()
    //   .contrast(1.25)
    //   .polaroid()
    //   .brightness(0.9);

    this.gameover_board = this.add.group();
    this.gameover_board.add(
      this.add.graphics()
    .fillStyle(0x000000, 0.5) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
    .fillRect(0, 0, this.cameras.main.width, this.cameras.main.height).setScrollFactor(0, 0).setDepth(200)
    )
    this.gameover_board.add(
      this.add.text(w / 2, h / 2, "GAME OVER").setOrigin(0.5, 0.5).setStyle({
        align: 'center',
        fill: '#ffffff',
        fontSize: "35" + "px",
      }).setStroke(
        "#5b6437",
        5
      ).setScrollFactor(0, 0).setDepth(201)
    )
    this.gameover_board.setVisible(false)

    this.initGame();
  }

  private scoreHandler: any;

  public setScoreHandle(handleScore: any) {
    this.scoreHandler = handleScore;
  }

  public initGame(lives = 3) {
    this.cameras.main.fadeIn(1200);
    GAME.SCORE = this.params.score;
    GAME.LEVEL = this.params.level ?? 1;

    (UI as any)[CONSTS.UI_KEYS.SCORE_GAME].setText(GAME.SCORE);
    GAME.STREAK = (this.params.level-1) % sampleWords.length ?? 0;
    // setTimeout(() => this.startRound(), 2500);
  }

  loseGame() {
    this.cameras.main.fadeOut(3000);
    this.gameover_board.setVisible(true)
    this.tweens.add({
      targets: this.sound,
      volume: 0,
      duration: 2000, // Duration of the animation in milliseconds
      ease: 'Bounce', // Easing function for a bouncing effect
    });

    this.time.delayedCall(3000, () => {
      if (this.scoreHandler != undefined) this.scoreHandler(GAME.SCORE, GAME.LEVEL);
    }, [], this);

    Observer.emitter.emit("onLoseGame");

    // game is lost
    //reza uncommented
    //this.initGame();
  }

  onSubmint() {
    if (GAME.TYPING == "" || GAME.TYPING.length != 5) return;

    Observer.emitter.emit("btn_click");

    const word = GAME.TYPING;

    const compare_word = sampleWords[GAME.STREAK].toLocaleUpperCase();

    const result = Helper.compareWords(word, compare_word);

    let isSuccess = 0;
    result.forEach((key, i) => {
      if (key == 2) isSuccess++;

      (UI as any)[`WB${GAME.LINE}${i}`]?.setTexture(`w${key}`);
      (UI as any)[`WT${GAME.LINE}${i}`]?.setStyle({
        ...CONSTS.TEXT_MAIN_STYLE,
        fontSize: Helper.convertScaleData(24) + "px",
        align: "center",
        fill: key == 0 ? "#fff" : "#333",
      });
      (UI as any)[`input_${word[i]}`].setTexture(`inp${key}`);
    });
    if (isSuccess == 5) {
      GAME.STREAK++;
      GAME.LEVEL++;
      if (GAME.STREAK == sampleWords.length) {
        Helper.addScreen(LAYOUT, CONSTS.LAYOUT_KEYS.GAME_COMPLETE);
        GAME.PAUSE = true;
        Observer.emitter.emit("onWinGame");

        return;
      }

      Observer.emitter.emit("onWinGame");

      const score = SCORE_SYSTEM[GAME.LINE].score;
      GAME.CUR_COIN = SCORE_SYSTEM[GAME.LINE].coin;
      Helper.addScreen(LAYOUT, CONSTS.LAYOUT_KEYS.BONUS);
      GAME.PAUSE = true;
      // (UI as any)[UI_KEYS.COIN_VIDEO].setText(GAME.CUR_COIN * 2.5)
      //console.log(UI ,CONSTS.UI_KEYS.COIN_BONUS,(UI as any)[CONSTS.UI_KEYS.COIN_BONUS],GAME.CUR_COIN);
      //(UI as any)[CONSTS.UI_KEYS.COIN_BONUS].setText(`Claim ${GAME.CUR_COIN}`);

      (UI as any)[CONSTS.UI_KEYS.SCORE_LAYOUT_STREAK].setText(GAME.STREAK);
      Helper.score(UI, score);
    } else if (GAME.LINE == 5) {
      this.loseGame();
    }

    GAME.LINE++;
    //// GAME.WORDS.push(GAME.TYPING);
    GAME.TYPING = "";
  }

  /*update(time, delta) {

  }*/
}

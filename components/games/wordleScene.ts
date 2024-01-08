import Phaser from "phaser";
import { scaleImageViaCloudinary } from "@/helpers/images";

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

let LAYOUT_KEYS = {
  LOGO: 'LOGO',
  MENU: 'MENU',
  GAME: 'GAME'
}

let UI_KEYS = {
  PLAY_BTN_LOGO: 'PLAY_BTN_LOGO',
  DAILY_BTN_MENU: 'DAILY_BTN_MENU',
  CLASSIC_BTN_MENU: 'CLASSIC_BTN_MENU',
  BACK_BTN_GAME: 'BACK_BTN_GAME',
  SUMBMIT_BTN_GAME: 'SUMBMIT_BTN_GAME',
  CALENDA_DAY_GAME: 'CALENDA_DAY_GAME',
  CALENDA_MONTH_GAME: 'CALENDA_MONTH_GAME',
  COIN_GAME: 'COIN_GAME',
}

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
]

let gameType = "wordle";

export default class WordleScene extends Phaser.Scene {
  public static instance: WordleScene;
  private params: any;
  private text_main_style: any;

  constructor(newGameType: string, newParams: any) {
    super();
    WordleScene.instance = this;
    gameType = newGameType;
    console.log(newParams)
    this.params = newParams;
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
    scrH = w * 0.175 / 1.614;
    heartR = w * 0.0625;
    heartNum = this.params.lives

    this.load.image("bg", "/pong/" + gameType + "/bg.jpg");
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
    this.load.image("word_input_btn", "/pong/" + gameType + "/word_input_btn.png");
    this.load.image("back_btn", "/pong/" + gameType + "/back_btn.png");
    this.load.image("next_btn", "/pong/" + gameType + "/next_btn.png");
    this.load.image("blue_btn", "/pong/" + gameType + "/blue_btn.png");
    this.load.image("next", "/pong/" + gameType + "/next.png");

    this.load.image("middleAd", this.params.sponsorLogo);

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


    // FONT
    let fontUrl = '/pong/' + gameType + '/Bangers-Regular.ttf';
    const font = new FontFace('customFont', `url(${fontUrl})`);

    font
      .load()
      .then(() => {
        // Font loaded successfully
        document.fonts.add(font);
      })
      .catch((error) => {
        // Font failed to load
        console.log('Failed to load font:', error);
      });
    this.text_main_style = {
      fontFamily: 'customFont',
      fontSize: 24 + 'px',
      align: 'center',
      fill: '#ffffff',
    }
  }

  // 400 800

  private whistle: any;
  private ballHit: any;
  private final: any;
  private goal: any;
  private lost: any;

  create() {
    this.sound.add("bg").setLoop(true).play();
    this.whistle = this.sound.add("whistle");
    this.ballHit = this.sound.add("ballHit");
    this.final = this.sound.add("final");
    this.goal = this.sound.add("goal");
    this.lost = this.sound.add("lost");


    this.add.image(0, 0, "bg").setOrigin(0).setDisplaySize(w, h);
    this.add.image(mW, mH, "middleAd").setDisplaySize(80, 80).setAlpha(this.textures.exists('middleAd') ? 1 : 0);


    LAYOUT[LAYOUT_KEYS.GAME] = this.add.group();
    LAYOUT[LAYOUT_KEYS.LOGO] = this.add.group();
    LAYOUT[LAYOUT_KEYS.MENU] = this.add.group();

    // LOGO PART
    UI[UI_KEYS.PLAY_BTN_LOGO] = this.addButton('main-btn-bg', this.convertScaleData(140), this.convertScaleData(65), mW, mH + this.convertScaleData(30), "PLAY", LAYOUT[LAYOUT_KEYS.LOGO]);

    LAYOUT[LAYOUT_KEYS.LOGO].add(
      this.add.text(mW, mH - this.convertScaleData(70), 'Wordle').setOrigin(0.5, 0.5).setStyle({
        ...this.text_main_style,
        fontSize: this.convertScaleData(60) + 'px',
        fill: '#000',
      })
    )
    LAYOUT[LAYOUT_KEYS.LOGO].setVisible(false)
    
    // MENU PART
    UI[UI_KEYS.DAILY_BTN_MENU] = this.addButton('main-btn-bg', this.convertScaleData(240), this.convertScaleData(75), mW, mH - this.convertScaleData(110), "DAILY PUZZLE", LAYOUT[LAYOUT_KEYS.MENU]);
    UI[UI_KEYS.CLASSIC_BTN_MENU] = this.addButton('main-btn-bg', this.convertScaleData(240), this.convertScaleData(75), mW, mH - this.convertScaleData(30), "CLASSIC", LAYOUT[LAYOUT_KEYS.MENU]);

    LAYOUT[LAYOUT_KEYS.MENU].setVisible(false)

    // GAME PART
    let GAME_PART = LAYOUT[LAYOUT_KEYS.GAME];
    // GAME TOP PART
    const topY = 40;
    UI[UI_KEYS.BACK_BTN_GAME] = this.addButton('back', this.convertScaleData(20), this.convertScaleData(20), this.convertScaleData(35), this.convertScaleData(50),  "", GAME_PART);

    GAME_PART.add(
      this.add.sprite(mW, topY, 'calendar').setOrigin(0.5, 0.5).setDisplaySize(45, 45)
    )
    UI[UI_KEYS.CALENDA_DAY_GAME] = this.add.text(mW, topY + this.convertScaleData(5), "21").setStyle({
      ...this.text_main_style,
      fontSize: 24 + 'px',
      fill: '#333',
    }).setOrigin(0.5, 0.5);
    UI[UI_KEYS.CALENDA_MONTH_GAME] = this.add.text(mW, topY - this.convertScaleData(15), "JAN").setStyle({
      ...this.text_main_style,
      fontSize: 6 + 'px',
      fill: '#fff',
    }).setOrigin(0.5, 0.5);
    GAME_PART.add(UI[UI_KEYS.CALENDA_DAY_GAME]);

    
    GAME_PART.add(
      this.add.sprite(mW + this.convertScaleData(40), topY - this.convertScaleData(10), 'info').setOrigin(0.5, 0.5).setDisplaySize(20, 20)
    )
    
    GAME_PART.add(
      this.add.sprite(w - this.convertScaleData(30), topY, 'coin').setOrigin(0.5, 0.5).setDisplaySize(30, 30)
    )
    UI[UI_KEYS.COIN_GAME] = this.add.text(w - this.convertScaleData(50), topY, "175").setStyle({
      ...this.text_main_style,
      fontSize: 24 + 'px',
      fill: '#fff',
    }).setOrigin(1, 0.5);

    // GAME MIDDLE PART
    const boxR = 45;
    const startY = 80;
    const startX = mW - (boxR * 1.05) * 2.5;
    for(let i = 0; i < 6; i++) {
      for(let j = 0; j < 5; j++) {
        GAME_PART.add(
          this.add.sprite(startX + (boxR * 1.05) * j, startY + (boxR * 1.05) * i, 'outline').setDisplaySize(boxR, boxR).setOrigin(0, 0)
        )
      }
    }

    INPUT_KEYS.forEach((key, i) => {
      let j = 0;
      let x = 0;
      let y = 0;
      let width = 35;
      let height = 50;
      let startX = mW - 4.5 * width;
      let startY = 80 + boxR * 7.3;

      let texture = 'word_input_btn';
      let isBack = (i == INPUT_KEYS.length - 1)

      if(i < 10) {
      } else if(i < 19) {
        startX += width / 2;
        i -= 10;
        j = 1
      } else {
        i -= 19;
        j = 2
      }
      x = startX + width * (i % 10)
      y = startY + height * j;

      if(isBack) {
        x += width 
        width *= 3;
      }

      GAME_PART.add(
        this.addButton(texture, width, height, x, y, key, GAME_PART, "#333")
      )
    })

    // GAME DOWN PART
    UI[UI_KEYS.SUMBMIT_BTN_GAME] = this.addButton('main-btn-bg', this.convertScaleData(150), this.convertScaleData(70), mW, h - this.convertScaleData(100),  "SUBMIT", GAME_PART);

    GAME_PART.add(
      this.addPowerUpBtn('blue_circle', 'item1', 'red_circle', 50, 50, this.convertScaleData(30), h - this.convertScaleData(100), GAME_PART, '2')
    )

    GAME_PART.add(
      this.addPowerUpBtn('pink_circle', 'item2', 'red_circle', 50, 50, this.convertScaleData(80), h - this.convertScaleData(100), GAME_PART, '2')
    )

    GAME_PART.add(
      this.addPowerUpBtn('next_btn', 'next', 'red_circle', 80, 50, w - this.convertScaleData(60), h - this.convertScaleData(100), GAME_PART, '2')
    )

    GAME_PART.setVisible(true)

    this.cameras.main.postFX.addVignette(0.5, 0.5, 0.975);
    this.cameras.main.postFX
      .addColorMatrix()
      .contrast(1.25)
      .polaroid()
      .brightness(0.9);

    this.initGame();
  }



  private scoreHandler;

  public setScoreHandle(handleScore: any) {
    this.scoreHandler = handleScore;
  }

  public initGame(lives = 3) {
    this.cameras.main.fadeIn(1200);

    setTimeout(() => this.startRound(), 2500);
  }

  loseGame() {
    this.cameras.main.fadeOut(1000);
    this.final.play();
    // this.scoreHandler(this.scoreNum);
    // game is lost
    //this.initGame();
  }

  convertScaleData(x, rate = 1) {
    return x * rate
  }

  addButton(sprite, width, height, x, y, text, group, color = "#fff") {

    const style = {
      fontFamily: 'customFont',
      fontSize: 24 + 'px',
      align: 'center',
      fill: color,
    };

    group.add(
      this.add.sprite(x, y, sprite).setOrigin(0.5, 0.5).setDisplaySize(width, height)
    )

    if(text != "") {
      group.add(
        this.add.text(x, y, text).setStyle(style).setOrigin(0.5, 0.5)
      )      
    }

    return group;
  }

  addPowerUpBtn(backSprite, sprite, badge, width, height, x, y, group,  text) {
    const style = {
      fontFamily: 'customFont',
      fontSize: 12 + 'px',
      align: 'center',
      fill: "#fff",
    };

    group.add(
      this.add.sprite(x, y, backSprite).setOrigin(0.5, 0.5).setDisplaySize(width, height)
    )

    group.add(
      this.add.sprite(x, y, sprite).setOrigin(0.5, 0.5).setDisplaySize(height * 0.6, height * 0.6)
    )

    const badgeX = x + width * 0.3;
    const badgeY = y + height * 0.3;

    group.add(
      this.add.sprite(badgeX, badgeY, badge).setOrigin(0.5, 0.5).setDisplaySize(20, 20)
    )

    if(text != "") {
      group.add(
        this.add.text(badgeX, badgeY, text).setStyle(style).setOrigin(0.5, 0.5)
      )      
    }

    return group;

  }

  startRound() {

  }

  score(which = 0) {

  }


  update(time, delta) {

  }
}

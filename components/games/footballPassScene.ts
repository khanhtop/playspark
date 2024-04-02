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
  heartR: number;

let helpIdx = 0;
let power = 0;

let tackleTime = 0;

let gameType = "football";

let boardW = 800;
let boardH = 2000;
let totalScore = 0;
let randomIdx = {}

let scoreSystem = {
  touchdown: 300,
  yard: 1,
  firstdown: 100,
}

let plans = [
  "PLAN1",
  "PLAN2",
  "PLAN3",
  "PLAN4",
  "PLAN5",
]

export default class FootballPassScene extends Phaser.Scene {
  public static instance: FootballPassScene;
  private ball!: Phaser.Physics.Arcade.Sprite;
  private player!: Phaser.Physics.Arcade.Sprite;
  private params: any;
  lifeNumText: any;
  private text_main_style: any;
  private tapGroup: Phaser.GameObjects.Group;
  private playerGroup: Phaser.GameObjects.Group;
  private blueline: any;
  private yellowline: any;
  private selRing: Phaser.GameObjects.Sprite;
  private aiPlayers: Phaser.Physics.Arcade.Sprite[];
  private aiEnemies: Phaser.Physics.Arcade.Sprite[];
  private status: Object;
  private posObject: any;
  private linesGroup: Phaser.GameObjects.Group[];
  private roundText: Phaser.GameObjects.Text;
  private touchDownText: Phaser.GameObjects.Text;
  private gameoverTexts: Object;
  private gameOverGroup: Phaser.GameObjects.Group;
  private gameTimeText: Phaser.GameObjects.Text;
  private roundTimeText: Phaser.GameObjects.Text;
  private highlight: Phaser.GameObjects.Image;
  private power_effect: Phaser.GameObjects.Sprite;
  private tabList: Phaser.GameObjects.Sprite[];
  private drag: Phaser.GameObjects.Sprite;
  private gameOverBack: Phaser.GameObjects.Sprite;
  private gameOverExitBtn: Phaser.GameObjects.Sprite;
  private helpGroup: Phaser.GameObjects.Group;
  private helpBack: Phaser.GameObjects.Sprite;
  private TAP: Phaser.GameObjects.Sprite;

  constructor(newGameType: string, newParams: any) {
    super();
    FootballPassScene.instance = this;
    gameType = newGameType;
    this.params = newParams;

    this.params.playerSprite = !!this.params.playerSprite? this.params.playerSprite : '/pong/' + gameType + '/player.png';
    this.params.enemySprite = !!this.params.enemySprite? this.params.enemySprite : '/pong/' + gameType + '/enemy.png';

    this.params.backgroundSprite = !!this.params.backgroundSprite? this.params.backgroundSprite : '/pong/' + gameType + '/bg.png';
    
    this.params.objectSprite = !!this.params.objectSprite? this.params.objectSprite: "/pong/" + gameType + "/ball.png";


  }

  preload() {
    w = this.game.canvas.clientWidth;
    h = this.game.canvas.clientHeight;
    ballR = w * 0.05;
    playerR = w * 0.175;
    aiR = w * 0.175;
    scr = h * 0.08;
    mW = w / 2;
    mH = (h - scr) / 2 + scr;
    goalH = w / 800 * 160;
    sideW = w * 0;
    boundW = w - 2 * sideW;
    boundH = h - scr - 2 * goalH;
    ballVY = h * 0.5;
    ballVX = w * 0.75;
    collW = w * 0.24;
    scrW = w * 0.375;
    scrH = w * 0.175 / 1.614;
    heartR = w * 0.0625;
    heartNum = this.params.lives

    this.load.image("ball", "/pong/" + gameType + "/ball.png");
    this.load.image("peck", "/pong/" + gameType + "/peck.png");
    this.load.image("bg", this.params.backgroundSprite);
    this.load.image("heart", "/pong/" + gameType + "/heart.png");
    this.load.image("score", "/pong/" + gameType + "/score.png");

    this.load.image("middleAd", this.params.sponsorLogo);

    this.load.image("line", "/pong/" + gameType + "/line.png");
    this.load.image("game-over", "/pong/" + gameType + "/game-over.png");
    this.load.image("ring", "/pong/" + gameType + "/ring.png");
    this.load.image("TAP1", "/pong/" + gameType + "/TAP1.png");
    this.load.image("ring", "/pong/" + gameType + "/ring.png");

    this.load.image("PLAN1", "/pong/" + gameType + "/p1.png");
    this.load.image("PLAN2", "/pong/" + gameType + "/p2.png");
    this.load.image("PLAN3", "/pong/" + gameType + "/p3.png");
    this.load.image("PLAN4", "/pong/" + gameType + "/p4.png");
    this.load.image("PLAN5", "/pong/" + gameType + "/p5.png");
    this.load.image("plan-board", "/pong/" + gameType + "/plan-board.png");
    this.load.image("drag", "/pong/" + gameType + "/drag.png");
    this.load.image("mute", "/pong/" + gameType + "/mute.png");
    this.load.image("mute_on", "/pong/" + gameType + "/mute-on.png");
    this.load.image("pause", "/pong/" + gameType + "/pause.png");
    this.load.image("pause_back", "/pong/" + gameType + "/pause-back.png");
    this.load.image("pause_btn", "/pong/" + gameType + "/pause-btn.png");
    this.load.image("help1", "/pong/" + gameType + "/2.png");
    this.load.image("help2", "/pong/" + gameType + "/3.png");
    this.load.image("help3", "/pong/" + gameType + "/4.png");
    this.load.image("help4", "/pong/" + gameType + "/5.png");
    this.load.image("help5", "/pong/" + gameType + "/6.png");
    this.load.image("ring1", "/pong/" + gameType + "/ring1.png");
    this.load.image("arrow", "/pong/" + gameType + "/arrow.png");



    this.load.audio("bg", "/pong/" + gameType + "/sfx/crowd.mp3");
    this.load.audio("whistle", "/pong/" + gameType + "/sfx/startWhistle.mp3");
    this.load.audio("ballHit", "/pong/" + gameType + "/sfx/ballHit.mp3");
    this.load.audio("goal", "/pong/" + gameType + "/sfx/goalScored.mp3");
    this.load.audio("lost", "/pong/" + gameType + "/sfx/goalConceded.mp3");
    this.load.audio("final", "/pong/" + gameType + "/sfx/finalWhistle.mp3");
    this.load.audio("button", "/pong/" + gameType + "/sfx/button.wav");
    this.load.audio("gameover", "/pong/" + gameType + "/sfx/gameover.wav");
    this.load.audio("throw", "/pong/" + gameType + "/sfx/throw.wav");
    this.load.audio("touchdown1", "/pong/" + gameType + "/sfx/touchdown.wav");
    this.load.audio("touchdown", "/pong/" + gameType + "/sfx/touchdown.m4a");
    this.load.audio("tackle1", "/pong/" + gameType + "/sfx/tackle.wav");
    this.load.audio("tackle", "/pong/" + gameType + "/sfx/tackle.m4a");
    this.load.audio("sacked", "/pong/" + gameType + "/sfx/sacked.m4a");
    this.load.audio("hitbody", "/pong/" + gameType + "/sfx/hitbody.wav");
    this.load.audio("firstdown", "/pong/" + gameType + "/sfx/firstdown.wav");



    this.load.spritesheet(
      'player_anim',
      this.params.playerSprite,
      { frameWidth: 141, frameHeight: 150 }
    );

    this.load.spritesheet(
      'enemy_anim',
      this.params.enemySprite,
      { frameWidth: 150, frameHeight: 150 }
    );

    this.load.spritesheet(
      'smoke',
      '/pong/' + gameType + '/smoke.png',
      { frameWidth: 156, frameHeight: 105 }
    );

    this.load.spritesheet(
      'power_effect',
      '/pong/' + gameType + '/power_effect.png',
      { frameWidth: 421, frameHeight: 68 }
    );
    
    this.load.spritesheet(
      'ball_anim',
      this.params.objectSprite,
      { frameWidth: 480, frameHeight: 441 }
    );

    let fontUrl = '/pong/' + gameType + '/ZingRustDemo-Base.ttf';
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
      fontSize: 14 + 'px',
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

  private gameover: any;
  private throw: any;
  private touchdown: any;
  private touchdown1: any;
  private button: any;
  private tackle: any;
  private tackle1: any;
  private sacked: any;
  private hitbody: any;
  private firstdown: any;

  create() {
    totalScore = this.params.score;

    this.status = {
      isBallPlayer: true,
      isPlaying: false,
      planIdx: -1,
      isKick: false,
      isThrowBall: false,
      isSacked: false,
      isRound: true,
      isGamePause: true,
      roundNum: 1,
      score: {
        touchDown: 0,
        firstDown: 0,
        passStreak: 0,
        runYards: 0,
      },
      runDistance: 0,
      startGameTime: new Date().getTime(),
      startRoundTime: new Date().getTime()
    }

    this.posObject = {
      startPos : {
        x : 400,
        y : 160 + 140 * 11,
        first: 160 + 140 * 10,
        second: 160 + 140 * 7,
      },
      runPos: {
        x : 0,
        y : 0
      },
      lastLine: 160 + 140,
      PLAN1: {
        players : [
          {
            x : 100,
            y : 50
          },
          {
            x : 400,
            y : 50
          },
          {
            x : 600,
            y : 50,
          },
          {
            x : 700,
            y : 50
          }
        ],
        enemies: [
          {
            x : 100,
            y : -80
          },
          {
            x : 400,
            y : -100
          },
          {
            x : 600,
            y : -150
          },
          {
            x : 700,
            y : -300
          },
        ],
        targets: [
          [
            {
              x : 100,
              y : -210
            },
            {
              x : 460,
              y : -520
            }
          ],
          [
            {
              x : 400,
              y : 0
            },
            {
              x : 400,
              y : 0
            },
          ],
          [
            {
              x : 600,
              y : -260
            },
            {
              x : 400,
              y : -160
            },
          ],
          [
            {
              x : 700,
              y : -210
            },
            {
              x : 800,
              y : -500
            }
          ]
        ]
      },
      PLAN2: {
        players : [
          {
            x : 100,
            y : 50
          },
          {
            x : 400,
            y : 50
          },
          {
            x : 600,
            y : 50,
          },
          {
            x : 700,
            y : 50
          }
        ],
        enemies: [
          {
            x : 100,
            y : -80
          },
          {
            x : 400,
            y : -100
          },
          {
            x : 600,
            y : -150
          },
          {
            x : 700,
            y : -300
          },
        ],
        targets: [
          [
            {
              x : 100,
              y : -210
            },
            {
              x : 360,
              y : -320
            }
          ],
          [
            {
              x : 400,
              y : 0
            },
            {
              x : 400,
              y : 0
            },
          ],
          [
            {
              x : 600,
              y : -260
            },
            {
              x : 300,
              y : -460
            },
          ],
          [
            {
              x : 700,
              y : -210
            },
            {
              x : 400,
              y : -500
            }
          ]
        ]
      },
      PLAN3: {
        players : [
          {
            x : 100,
            y : 50
          },
          {
            x : 200,
            y : 50
          },
          {
            x : 400,
            y : 50,
          },
          {
            x : 600,
            y : 50
          }
        ],
        enemies: [
          {
            x : 100,
            y : -80
          },
          {
            x : 200,
            y : -100
          },
          {
            x : 400,
            y : -80
          },
          {
            x : 600,
            y : -300
          },
        ],
        targets: [
          [
            {
              x : 100,
              y : -210
            },
            {
              x : 260,
              y : -420
            }
          ],
          [
            {
              x : 200,
              y : -210
            },
            {
              x : 100,
              y : -420
            },
          ],
          [
            {
              x : 400,
              y : 0
            },
            {
              x : 400,
              y : 0
            },
          ],
          [
            {
              x : 600,
              y : -210
            },
            {
              x : 800,
              y : -500
            }
          ]
        ]
      },
      PLAN4: {
        players : [
          {
            x : 100,
            y : 50
          },
          {
            x : 200,
            y : 50
          },
          {
            x : 300,
            y : 50,
          },
          {
            x : 500,
            y : 50
          }
        ],
        enemies: [
          {
            x : 100,
            y : -80
          },
          {
            x : 200,
            y : -100
          },
          {
            x : 300,
            y : -120
          },
          {
            x : 500,
            y : -180
          },
        ],
        targets: [
          [
            {
              x : 700,
              y : -80
            },
            {
              x : 700,
              y : -220
            },
            {
              x : 800,
              y : -420
            },
          ],
          [
            {
              x : 200,
              y : -210
            },
            {
              x : 100,
              y : -420
            },
          ],
          [
            {
              x : 300,
              y : -80
            },
            {
              x : 200,
              y : -420
            },
          ],
          [
            {
              x : 500,
              y : 0
            },
            {
              x : 500,
              y : 0
            }
          ]
        ]
      },
      PLAN5: {
        players : [
          {
            x : 100,
            y : 50
          },
          {
            x : 400,
            y : 50
          },
          {
            x : 600,
            y : 50,
          },
          {
            x : 700,
            y : 50
          }
        ],
        enemies: [
          {
            x : 100,
            y : -80
          },
          {
            x : 400,
            y : -100
          },
          {
            x : 600,
            y : -80
          },
          {
            x : 700,
            y : -300
          },
        ],
        targets: [
          [
            {
              x : 100,
              y : -420
            },
            {
              x : 100,
              y : -420
            }
          ],
          [
            {
              x : 400,
              y : 0
            },
            {
              x : 400,
              y : 0
            },
          ],
          [
            {
              x : 600,
              y : -220
            },
            {
              x : 800,
              y : -420
            },
          ],
          [
            {
              x : 700,
              y : -210
            },
            {
              x : 400,
              y : -220
            }
          ]
        ]
      },
    }

    this.gameoverTexts = {};

    this.sound.add("bg").setLoop(true).play();
    this.whistle = this.sound.add("whistle");
    this.ballHit = this.sound.add("ballHit");
    this.final = this.sound.add("final");
    this.goal = this.sound.add("goal");
    this.lost = this.sound.add("lost");
    this.button = this.sound.add("button");
    this.gameover = this.sound.add("gameover");
    this.throw = this.sound.add("throw");
    this.touchdown = this.sound.add("touchdown");
    this.touchdown1 = this.sound.add("touchdown1");
    this.tackle = this.sound.add("tackle");
    this.tackle1 = this.sound.add("tackle1");
    this.sacked = this.sound.add("sacked");
    this.hitbody = this.sound.add("hitbody");
    this.firstdown = this.sound.add("firstdown");

    this.physics.world.setBounds(
      sideW,
      goalH,
      boundW,
      boardH * w / boardW,
      true,
      true,
      false,
      false
    );
    let bg = this.add.image(0, 0, "bg").setOrigin(0).setDisplaySize(w, boardH * w / boardW);
    // this.add.image(mW, mH, "middleAd").setDisplaySize(80, 80).setAlpha(this.textures.exists('middleAd') ? 1 : 0);
    //this.add.image(0, 0, 'bg').setOrigin(0).setDisplaySize(w, h);

    
    this.cameras.main.setBounds(0, 0, bg.displayWidth, bg.displayHeight);
    // BEGIN HEADER
    
    this.blueline = this.add.rectangle(w / 2, w / 800 * 300, w * 0.96, 5, 0x22d3ee).setOrigin(0.5, 0.5);
    this.yellowline = this.add.rectangle(w / 2, w / 800 * (300 + 140), w * 0.96, 5, 0xf3cb04).setOrigin(0.5, 0.5);

    const header = this.add.image(w / 2, 30, 'line').setOrigin(0.5, 0.5).setDisplaySize(w * 0.9, 60 * w / 375).setScrollFactor(0, 0).setDepth(4);

    this.scoreText = this.add.text(header.x, header.y, '001423 PTS', {
      ...this.text_main_style,
      color: '#454545',
      fontSize: `${17 * w / 375}px`
    }).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setDepth(4);

    this.yardsText = this.add.text(header.x - w * 0.25, header.y, '2ND AND 11', {
      ...this.text_main_style,
      color: '#454545',
      fontSize: `${17 * w / 375}px`
    }).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setDepth(4);

    this.gameTimeText = this.add.text(header.x + w * 0.25, header.y, 'TDS: 0', {
      ...this.text_main_style,
      color: '#454545',
      fontSize: `${17 * w / 375}px`
    }).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setDepth(4);

    // MUTE, PASUE BTN
    
    this.add.sprite(header.x - w * 0.4, header.y + 40 * w / 375, 'pause').setOrigin(0.5, 0.5)
    .setDisplaySize(30 * w / 375, 30 * w / 375)
    .setScrollFactor(0, 0).setDepth(4)
    .setInteractive({ cursor: 'pointer' })
    .on("pointerup", () => {
      if(!this.status["isGamePause"]) {
        this.status["isGamePause"] = true;
        this.physics.pause()
        // this.scene.pause();

        this.gameoverTexts["touchdowns"].setText(`${this.status["score"].touchDown} X ${scoreSystem.touchdown} = ${this.status["score"].touchDown * scoreSystem.touchdown}`);
        this.gameoverTexts["firstdowns"].setText(`${this.status["score"].firstDown} X ${scoreSystem.firstdown} = ${this.status["score"].firstDown * scoreSystem.firstdown}`);
        this.gameoverTexts["runyards"].setText(`${this.status["score"].runYards} X ${scoreSystem.yard} = ${this.status["score"].runYards * scoreSystem.yard}`);
        this.gameoverTexts["gametotal"].setText(`${this.getTotalScore()}`);

        this.gameOverGroup.setVisible(true)
        this.gameOverExitBtn.setVisible(true);

        this.gameOverBack.setTexture("pause_back");
        this.gameOverBack.setPosition(gameOver.x, gameOver.y + this.getUIPos(50)).setDisplaySize(w, w * 0.93);
      } 
    });

    const muteBtn = this.add.sprite(header.x- w * 0.3, header.y + 40 * w / 375, 'mute').setOrigin(0.5, 0.5)
    .setDisplaySize(30 * w / 375, 30 * w / 375)
    .setScrollFactor(0, 0).setDepth(4)
    .setInteractive({ cursor: 'pointer' })
    .on("pointerup", () => {
      this.sound.mute = !this.sound.mute;
      muteBtn.setTexture(this.sound.mute? "mute_on" : "mute")
    });
    
    
    const lifePanel = this.add.image(w / 2 + w * 0.45 - w * 0.075, 75, 'line').setOrigin(0.5, 0.5).setDisplaySize(w * 0.15, 40).setScrollFactor(0, 0).setDepth(4);

    this.add.image(lifePanel.x - w * 0.03, lifePanel.y, 'heart').setOrigin(0.5, 0.5).setDisplaySize(15, 15).setScrollFactor(0, 0).setDepth(4);
    this.lifeNumText = this.add.text(lifePanel.x + w * 0.03, lifePanel.y, heartNum.toString(), {
      ...this.text_main_style,
      color: '#454545'
    }).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setDepth(4);
    // END HEADER

    // BEGIN BOTTOM

    this.tapGroup = this.add.group();

    this.drag = this.add.sprite(w / 2, h - 120, 'drag').setOrigin(0.5, 0.5).setDisplaySize(200, 150).setScrollFactor(0, 0).setVisible(false);

    this.TAP = this.add.sprite(w / 2, header.y + 30, 'TAP1').setOrigin(0.5, 0).setDisplaySize(w * 0.7, w * 0.7 * 0.65).setScrollFactor(0, 0);
      
    // this.tapGroup.add(this.TAP)

    const itemR = w * 0.2;

    this.tapGroup.add(
      this.add.image(w / 2, h - itemR * 1.35, 'plan-board').setOrigin(0.5, 0.5).setDisplaySize(itemR * 4, itemR * 1.7).setScrollFactor(0, 0)
    )

    this.highlight = this.add.image(mW, 37, "score").setDisplaySize(itemR* 1.03, itemR * 1.03).setScrollFactor(0, 0);
    this.highlight.setPosition(w / 2 - itemR * 1.2, h - itemR * 1.5);
    this.tapGroup.add(this.highlight);

    this.tabList = [];

    plans.forEach((plan, index) => {
      this.tabList.push(
        this.add.sprite(-300, h - itemR * 1.5, plan).setOrigin(0.5, 0.5).setDisplaySize(itemR, itemR).setScrollFactor(0, 0)
        .setInteractive({ cursor: 'pointer' })
        .on('pointerup', () => {
          this.button.play();
          this.onSelectPlan(plan, index)
        }).setVisible(false)
      )
      this.tabList[index].idx = index;
      this.tapGroup.add(this.tabList[index]);
    })

    // this.tabList.push(
    //   this.add.sprite(w / 2 - itemR * 1.2, h - itemR * 1.5, 'plan1').setOrigin(0.5, 0.5).setDisplaySize(itemR, itemR).setScrollFactor(0, 0)
    //   .setInteractive()
    //   .on('pointerup', () => {
    //     this.button.play();
    //     this.onSelectPlan("PLAN1", 0)
    //   })
    // )
    // this.tabList.push(
    //   this.add.sprite(w / 2, h - itemR * 1.5, 'plan2').setOrigin(0.5, 0.5).setDisplaySize(itemR, itemR).setScrollFactor(0, 0)
    //   .setInteractive()
    //   .on('pointerup', () => {
    //     this.button.play();
    //     this.onSelectPlan("PLAN2", 1)
    //   })
    // )
    // this.tabList.push(
    //   this.add.sprite(w / 2 + itemR * 1.2, h - itemR * 1.5, 'plan3').setOrigin(0.5, 0.5).setDisplaySize(itemR, itemR).setScrollFactor(0, 0)
    //   .setInteractive()
    //   .on('pointerup', () => {
    //     this.button.play();
    //     this.onSelectPlan("PLAN3", 2)
    //   })
    // )

    // this.tapGroup.add(this.tabList[0]);
    // this.tapGroup.add(this.tabList[1]);
    // this.tapGroup.add(this.tabList[2]);
    

    this.tapGroup.add(
      this.add.text(w / 2, h - itemR * 0.82, "SELECT A PLAY", {
        ...this.text_main_style,
        fontSize: '25px',
        color: '#454545'
      }).setOrigin(0.5, 0.5).setScrollFactor(0, 0)  
    )
    
    this.tapGroup.add(
      this.add.rectangle(w / 2 + itemR * 1.5, h - itemR * 0.8, itemR * 0.8, itemR * 0.2, 0x0f2f1f).setOrigin(0.5, 0.5).setScrollFactor(0, 0)
    )
    
    this.roundTimeText = this.add.text(w / 2 + itemR * 1.5, h - itemR * 0.8, "0:10", {
      ...this.text_main_style,
      color: '#ffffff'
    }).setOrigin(0.5, 0.5).setScrollFactor(0, 0)  
    this.tapGroup.add(this.roundTimeText);

    this.tapGroup.setDepth(3)
    
    // END BOTTOM
    
    // BEGIN GAME

    this.linesGroup = [];
    plans.forEach(key => {
      const group = this.add.group();
      this.posObject[key].targets.forEach((posArray, i) => {
        let offset = {
          x : 0, 
          y : - 50
        }
        let start = {
          x : this.posObject[key].players[i].x, 
          y : this.posObject[key].players[i].y
        }
        posArray.forEach(pos => {
          const line = this.add.line(0, 0, this.getUIPos(start.x + offset.x), this.getUIPos(start.y + offset.y), this.getUIPos(pos.x + offset.x), this.getUIPos(pos.y + offset.y),  0xd0ae04).setOrigin(0);
          line.setLineWidth(2);

          group.add(line);
          start.x = pos.x;
          start.y = pos.y;

        });
      });

      group.setVisible(false);
      this.linesGroup.push(group);
    })


    this.selRing = this.add.sprite(w / 2, h / 2, 'ring').setOrigin(0.5, 0.5).setDisplaySize(playerR * 0.5, playerR * 0.5);
    // END GAME


    this.ball = this.physics.add
      .sprite(mW, mH, "ball")
      .setDisplaySize(ballR, ballR)
      .setCircle(this.textures.get("ball").getSourceImage().width / 4)
      .setCollideWorldBounds(true)
      .setBounce(1, 1);
    this.player = this.physics.add
      .sprite(mW, h - goalH - playerR / 2, "peck")
      // .setTint(0x0000ff)
      .setDisplaySize(playerR, playerR)
      .setCircle(this.textures.get("peck").getSourceImage().width / 3)
      .setCollideWorldBounds(true)
      .setPushable(false);

    this.power_effect = this.physics.add
      .sprite(w * 0.005 + h * 0.45, h / 2 - 0.15 * h, 'power_effect')
      .setDisplaySize(190 * w / 1248, 30 * w / 1248)
      .setOrigin(1, 0)
      .setAlpha(1);

    this.playerGroup = this.add.group();
    this.playerGroup.add(this.player);
    this.playerGroup.add(this.selRing);
    this.playerGroup.add(this.power_effect);
    this.power_effect.position

    // ANIMATION CREATE
    const player_frame = this.anims.generateFrameNames('player_anim', {
      start: 0,
      end: 14,
    });
    const player_idle_frame = this.anims.generateFrameNames('player_anim', {
      start: 0,
      end: 0,
    });
    this.anims.create({
      key: 'player_anim',
      frames: player_frame,
      frameRate: 16,
      repeat: -1,
    });

    this.anims.create({
      key: 'player_idle_anim',
      frames: player_idle_frame,
      frameRate: 16,
      repeat: -1,
    });

    const enemy_frame = this.anims.generateFrameNames('enemy_anim', {
      start: 0,
      end: 15,
    });
    const enemy_idle_frame = this.anims.generateFrameNames('enemy_anim', {
      start: 0,
      end: 0,
    });
    this.anims.create({
      key: 'enemy_anim',
      frames: enemy_frame,
      frameRate: 16,
      repeat: -1,
    });
    this.anims.create({
      key: 'enemy_idle_anim',
      frames: enemy_idle_frame,
      frameRate: 16,
      repeat: -1,
    });

    const smoke_frame = this.anims.generateFrameNames('smoke', {
      start: 0,
      end: 1,
    });
    this.anims.create({
      key: 'smoke_anim',
      frames: smoke_frame,
      frameRate: 10,
      repeat: -1,
    });

    const ball_frame = this.anims.generateFrameNames('ball_anim', {
      start: 0,
      end: 7,
    });
    const ball_idle_frame = this.anims.generateFrameNames('ball_anim', {
      start: 0,
      end: 0,
    });
    this.anims.create({
      key: 'ball_anim',
      frames: ball_frame,
      frameRate: 16,
      repeat: -1,
    });
    this.anims.create({
      key: 'ball_idle_anim',
      frames: ball_idle_frame,
      frameRate: 16,
      repeat: -1,
    });

    // END ANIAMTION CREATE

    // BEGIN INIT AIs
    this.aiPlayers = [];
    this.aiEnemies = [];

    for(let i = 0; i < 4; i++) {
      this.aiPlayers.push(
        this.physics.add
          .sprite(mW, scr + goalH + playerR / 2, "peck")
          // .setTint(0xff0000)
          .setDisplaySize(playerR, playerR)
          .setCircle(this.textures.get("peck").getSourceImage().width / 3)
          .setCollideWorldBounds(true)
          .setPushable(true)
          .play('player_idle_anim')
      )

      this.aiEnemies.push(
        this.physics.add
          .sprite(mW, scr + goalH + playerR / 2, "peck")
          // .setTint(0xff0000)
          .setDisplaySize(playerR, playerR)
          .setCircle(this.textures.get("peck").getSourceImage().width / 3, 0, playerR * 0.5)
          .setCollideWorldBounds(true)
          .setPushable(true)
          .play('enemy_idle_anim')
      )
    }

    // END INIT AIs

    this.player.setInteractive();
    //(this.player as any).setDraggable(true);
    this.input.setDraggable(this.player);

    this.player.on(
      "pointerdown",
      function (pointer) {
        // Update the goal position when the mouse button is pressed
        this.goalXPos = Phaser.Math.Clamp(
          pointer.x,
          sideW + playerR / 2,
          w - sideW - playerR / 2
        );
        this.goalYPos = Phaser.Math.Clamp(
          pointer.y,
          playerR / 2,
          h - goalH - playerR / 2
        );
        this.isDragging = true;
        this.player.play('player_anim')

      },
      this
    );

    this.player.on(
      "drag",
      function (pointer, dragX, dragY) {
        // Update the goal position when the mouse is moving
        this.goalXPos = Phaser.Math.Clamp(
          dragX,
          sideW + playerR / 2,
          w - sideW - playerR / 2
        );
        this.goalYPos = Phaser.Math.Clamp(
          dragY,
          playerR / 2,
          boardH * w / boardW - goalH - playerR / 2
        );
      },
      this
    );

    this.player.on(
      "pointerup",
      function () {
        // Stop dragging and stop the player
        this.isDragging = false;
        this.player.setVelocity(0, 0);

        // this.player.play('player_anim')
      },
      this
    );

    bg.on("pointerup", (pointer) => {


      let x = pointer.x;
      let y = pointer.y + this.cameras.main.worldView.y;

      if(!this.status.isBallPlayer  || !this.status.isPlaying || this.status.isThrowBall) return;

      this.status.isThrowBall = true;
      this.status.isBallPlayer = false;
      this.status.isKick = true;

      let dx = x - this.ball.x;
      let dy = y - this.ball.y;

      let distance = Phaser.Math.Distance.Between(x, y, this.ball.x, this.ball.y)

      this.ball.target = {
        x : x,
        y : y
      }
      this.ball.start = {
        x : this.ball.x,
        y : this.ball.y,
      }

      let angle = Math.atan2(dy, dx);

      this.ball.setAngle(angle * 180 / Math.PI + 45);
      this.ball.setVelocity(dx / distance * 140, dy / distance * 140);
      this.ball.play("ball_anim");
      this.throw.play()
    }).setInteractive()

    // this.selRing.startFollow(this.player);

    this.goalTxt = this.add
      .text(mW, mH - 52, "GOAL!", {
        fontFamily: "TitanOne-Regular",
        fontSize: "56px",
        color: "#345e8e",
        stroke: "#ffffff",
        strokeThickness: 10,
      })
      .setOrigin(0.5, 0.5);

    this.addedScrTxt = this.add
      .text(mW, mH + 26, "+100", {
        fontFamily: "TitanOne-Regular",
        fontSize: "56px",
        color: "#ffffff",
        stroke: "#345e8e",
        strokeThickness: 10,
      })
      .setOrigin(0.5, 0.5);

    // this.physics.add.overlap(
    //   this.player,
    //   this.ball,
    //   () => {

    //     if(this.status.isBallPlayer) return;

    //     this.touches++;
    //     // if (!this.ballHit.isPlaying) this.ballHit.play();
    //     this.ballHit.stop();
    //     this.ballHit.play();
    //   },
    //   null,
    //   this
    // );

    for(let i = 0; i < 4; i++) {
      this.physics.add.overlap(
        this.ball,
        this.aiPlayers[i],
        () => {
          if(this.status.isPlaying && !this.status.isKick && !this.status.isBallPlayer) {
            // this.status.isPlaying = false;
            console.log("hit ball in playground.")
            this.status.isBallPlayer = true;

            let x = this.player.x;
            let y = this.player.y;
            
            this.posObject.runPos.x = this.aiPlayers[i].x;
            this.posObject.runPos.y = this.aiPlayers[i].y;

            this.player.setPosition(this.aiPlayers[i].x, this.aiPlayers[i].y);
            this.aiPlayers[i].setPosition(x, y);

          }
        },
        null,
        this
      )

      this.physics.add.overlap(
        this.player,
        this.aiEnemies[i],
        () => {
          if(this.player.anims.getName() != "smoke_anim" && this.status.isSacked) {
            // this.aiEnemies[i].play("smoke_anim");
            this.player.play("smoke_anim");
          }
        },
        null,
        this
      )

    }
    this.physics.add.collider(
      this.aiEnemies,
      this.aiPlayers,
      () => {

      },
      null,
      this
    )
    this.physics.add.collider(
      this.aiEnemies,
      this.aiEnemies,
      () => {

      },
      null,
      this
    )
    // ROUND TEXT STATUS
    this.roundText = this.add.text(mW, mH - this.getUIPos(300), "TOUCHDOWN!", {
      ...this.text_main_style,
      fontSize: this.getUIPos(110) + "px",
      fill: "#ffffff",
      stroke: '#000000',
      strokeThickness: 4
      
    }).setOrigin(0.5, 0.5).setScrollFactor(0, 0);

    this.touchDownText = this.add.text(mW, mH - this.getUIPos(160), `+${scoreSystem.touchdown}`, {
      ...this.text_main_style,
      fontSize: this.getUIPos(110) + "px",
      fill: "#c57614",
      stroke: '#000000',
      strokeThickness: 4
      
    }).setOrigin(0.5, 0.5).setScrollFactor(0, 0);

    // END ROUND TEXT STATUS

    // GAME OVER SCREEN
    this.gameOverGroup = this.add.group();
    const gameOver = this.add.sprite(mW, mH - this.getUIPos(150), 'game-over').setOrigin(0.5, 0.5).setScrollFactor(0, 0).setDisplaySize(w, w * 1);
    
    this.gameoverTexts["reachlevel"] = this.add.text(gameOver.x, gameOver.y - this.getUIPos(70), "LEVEL REACHED: 1", {
      ...this.text_main_style,
      fill: "#000",
      fontSize: this.getUIPos(45) + "px",
    }).setOrigin(0.5, 0.5).setScrollFactor(0, 0);
    
 
    const rightX = w * 0.2;
    this.gameoverTexts["touchdowns"] = this.add.text(gameOver.x + rightX, gameOver.y - this.getUIPos(0), "0 X 7,000 = 0", {
      ...this.text_main_style,
      fill: "#fff",
      align: 'right',
      fontSize: this.getUIPos(30) + "px",
    }).setOrigin(1, 0.5).setScrollFactor(0, 0);
    
    this.gameoverTexts["firstdowns"] = this.add.text(gameOver.x + rightX, gameOver.y + this.getUIPos(45), "2 X 125 = 250", {
      ...this.text_main_style,
      fill: "#fff",
      align: 'right',
      fontSize: this.getUIPos(30) + "px",
    }).setOrigin(1, 0.5).setScrollFactor(0, 0);

    this.gameoverTexts["runyards"] = this.add.text(gameOver.x + rightX, gameOver.y + this.getUIPos(90), "20 X 30 = 600", {
      ...this.text_main_style,
      fill: "#fff",
      align: 'right',
      fontSize: this.getUIPos(30) + "px",
    }).setOrigin(1, 0.5).setScrollFactor(0, 0);

    this.gameoverTexts["gametotal"] = this.add.text(gameOver.x + rightX, gameOver.y + this.getUIPos(135), "53455", {
      ...this.text_main_style,
      fill: "#fff",
      align: 'right',
      fontSize: this.getUIPos(30) + "px",
    }).setOrigin(1, 0.5).setScrollFactor(0, 0);

    this.gameOverGroup.add(gameOver);
    this.gameOverGroup.add(this.gameoverTexts["reachlevel"]);
    this.gameOverGroup.add(this.gameoverTexts["touchdowns"]);
    this.gameOverGroup.add(this.gameoverTexts["firstdowns"]);
    this.gameOverGroup.add(this.gameoverTexts["runyards"]);
    this.gameOverGroup.add(this.gameoverTexts["gametotal"]);

    // LEFT ARRANGE TITLES
    const leftX = -w * 0.14;
    this.gameOverGroup.add(
      this.add.text(gameOver.x + leftX, gameOver.y - this.getUIPos(0), "TOUCHDOWNS", {
        ...this.text_main_style,
        fill: "#f3cb04",
        align: 'right',
        fontSize: this.getUIPos(30) + "px",
      }).setOrigin(0.5, 0.5).setScrollFactor(0, 0)
    )

    this.gameOverGroup.add(
      this.add.text(gameOver.x + leftX, gameOver.y + this.getUIPos(45), "FIRST DOWNS", {
        ...this.text_main_style,
        fill: "#f3cb04",
        align: 'right',
        fontSize: this.getUIPos(30) + "px",
      }).setOrigin(0.5, 0.5).setScrollFactor(0, 0)
    )

    this.gameOverGroup.add(
      this.add.text(gameOver.x + leftX, gameOver.y + this.getUIPos(90), "RUN YARDS", {
        ...this.text_main_style,
        fill: "#f3cb04",
        align: 'right',
        fontSize: this.getUIPos(30) + "px",
      }).setOrigin(0.5, 0.5).setScrollFactor(0, 0)
    )

    this.gameOverGroup.add(
      this.add.text(gameOver.x + leftX, gameOver.y + this.getUIPos(135), "GAME TOTAL", {
        ...this.text_main_style,
        fill: "#f3cb04",
        align: 'right',
        fontSize: this.getUIPos(30) + "px",
      }).setOrigin(0.5, 0.5).setScrollFactor(0, 0)
    )

    // const gameOver = this.add.sprite(mW, mH - this.getUIPos(150), 'game-over').setOrigin(0.5, 0.5).setScrollFactor(0, 0).setDisplaySize(w, w * 1);

    this.gameOverExitBtn =  this.add.sprite(gameOver.x + this.getUIPos(w / 1.4), gameOver.y - this.getUIPos(240), "pause_btn")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(this.getUIPos(60), this.getUIPos(60))
      .setScrollFactor(0, 0)
      .setInteractive({ cursor: 'pointer' })
      .on("pointerup", () => {
        this.status["isGamePause"] = false;
        this.physics.resume();
        this.gameOverGroup.setVisible(false)
        this.gameOverBack.setTexture("game-over")
        this.gameOverBack.setPosition(mW, mH - this.getUIPos(150))
      })
    this.gameOverGroup.add(this.gameOverExitBtn)
    this.gameOverBack = gameOver;
    this.gameOverGroup.setVisible(false).setDepth(11)
    // END GAME OVER SCREEN

    // First Screen
    this.helpGroup = this.add.group();
    this.helpBack = this.add.sprite(mW, mH - this.getUIPos(100), "help1").setOrigin(0.5, 0.5).setDisplaySize(w, w * 1280 / 800).setScrollFactor(0, 0).setDepth(10);
    
    for(let i = 0; i < 5; i ++) {
      this.helpGroup.add(
        this.add.sprite(this.helpBack.x - this.getUIPos(60) + this.getUIPos(30) * i, this.helpBack.y + this.getUIPos(200), "ring1")
        .setDisplaySize(this.getUIPos(25), this.getUIPos(25))
        .setScrollFactor(0, 0)
        .setDepth(10)
        .setInteractive()
        .on("pointerup", () => {
          this.helpBack.setTexture(`help${i + 1}`);
        })
      );
    }

    this.helpGroup.add(this.helpBack);

    this.helpGroup.add(
      this.add.sprite(this.helpBack.x, this.helpBack.y + this.getUIPos(280), "ring1")
      .setDisplaySize(this.getUIPos(350), this.getUIPos(80))
      .setScrollFactor(0, 0)
      .setDepth(10)
      .setInteractive()
      .on("pointerup", () => {
        this.helpGroup.setVisible(false)
        this.status["isGamePause"] = false;
        this.status["startRoundTime"] = new Date().getTime();
      })
    )

    this.helpGroup.add(
      this.add.sprite(this.helpBack.x - this.getUIPos(200), this.helpBack.y, "arrow")
      .setDisplaySize(this.getUIPos(50), this.getUIPos(63))
      .setScrollFactor(0, 0)
      .setDepth(10)
      .setFlipX(true)
      .setInteractive({ cursor: 'pointer' })
      .on("pointerup", () => {
        helpIdx--;
        helpIdx = helpIdx < 0? 0 : helpIdx;
        this.helpBack.setTexture(`help${helpIdx + 1}`);
      })
    )

    this.helpGroup.add(
      this.add.sprite(this.helpBack.x + this.getUIPos(200), this.helpBack.y, "arrow")
      .setDisplaySize(this.getUIPos(50), this.getUIPos(63))
      .setScrollFactor(0, 0)
      .setDepth(10)
      .setInteractive({ cursor: 'pointer' })
      .on("pointerup", () => {
        helpIdx++;
        helpIdx = helpIdx > 4? 4 : helpIdx;
        this.helpBack.setTexture(`help${helpIdx + 1}`);
      })
    )

    // END FIRST SCREEN 


    this.ball.preFX.addShadow();
    this.player.preFX.addShadow();
    //this.cameras.main.postFX.addGlow();

    this.ball.setMaxVelocity(ballVX * 3, ballVY * 3);

    this.player.play('player_idle_anim');
    // this.cameras.main.startFollow(this.player);
    this.cameras.main.startFollow(this.ball, false, 0, 1, 0, 0);
    this.cameras.main.setFollowOffset(0, mH * 0.7)

    this.ball.play('ball_idle_anim')


    heartNum = this.params.lives
    this.scoreNum = this.params.score;
    this.initGame();

    // this.cameras.main.scrollY -= 4;
  }

  private ballDir: number = 1;
  private scoreNum = 0;
  private scoreText: Phaser.GameObjects.Text;
  private goalTxt: Phaser.GameObjects.Text;
  private addedScrTxt: Phaser.GameObjects.Text;
  private yardsText: Phaser.GameObjects.Text;

  private scoreHandler;

  public setScoreHandle(handleScore: any) {
    this.scoreHandler = handleScore;
  }

  public initGame(lives = 3) {
    this.cameras.main.fadeIn(1200);
    
    this.scoreNum += this.getTotalScore();

    this.goalTxt.setVisible(false);
    this.addedScrTxt.setVisible(false);

    // this.player.setPosition(mW, h - goalH - playerR / 2);
    this.player.setVelocity(0, 0);

    this.ball.setVelocity(0, 0);


    this.goalXPos = mW;
    this.goalYPos = h - goalH - playerR / 2;

    this.ballDir = 1;
    this.scoreText.text = this.params.score.toString()?.padStart(4, "0");

    this.ball.setAlpha(0.5);
    this.ball.setCircle(0.1);

    this.touches = 0;
    this.scored = false;
    this.isDragging = false;

    this.gameOverGroup.setVisible(false);
    this.status["startGameTime"] = new Date().getTime();
    this.status.isRound = true;

    // this.status["score"].touchDown = 0;
    // this.status["score"].firstDown = 0;
    // this.status["score"].passStreak = 0;
    // this.status["score"].runYards = 0;
    this.status.roundNum = 1;

    this.posObject.startPos.y = 160 + 140 * 11;
    this.posObject.startPos.first = 160 + 140 * 10;
    this.posObject.startPos.second = 160 + 140 * 7;

    const itemR = w * 0.2;
    this.highlight.setPosition(w / 2 - itemR * 1.2, h - itemR * 1.5);


    setTimeout(() => this.startRound(), 500);
  }

  loseGame() {
    this.cameras.main.fadeOut(1000);
    this.final.play();
    this.scoreNum += this.getTotalScore();
    this.scoreHandler(this.scoreNum);
    // game is lost
    //this.initGame();
  }

  loseLife(): boolean {
    if (heartNum > 0) {
      // Handle life loss logic here

      heartNum--;
      this.lifeNumText.setText(heartNum);

      if (heartNum === 0) {
        // Game lost
        // this.loseGame();
        return true;
      }
      return false;
    }
  }

  onSelectPlan(planType, idx) {
    console.log(planType, idx, randomIdx[idx], "select plan");

    const itemR = w * 0.2;
    this.highlight.setPosition(w / 2 - itemR * 1.2 + itemR * 1.2 * randomIdx[idx], h - itemR * 1.5);

    if(idx == this.status.planIdx && this.status.planIdx != -1) {
      this.onStartPlan();
      this.drag.setVisible(true);
      this.time.delayedCall(3000, () => {
        this.drag.setVisible(false);
      }, [], this);
    } else {
      
      this.linesGroup.forEach(group => {
        group.setVisible(false);
      })
      // if(this.status.planIdx != -1) {
      //   this.linesGroup[this.status.planIdx].setVisible(false);
      // }

      this.status.planIdx = idx;
      this.linesGroup[idx].setXY(0, this.getUIPos(this.posObject.startPos.first))
      this.linesGroup[idx].setVisible(true);
    }
    this.onInitPlayer();

  }

  onInitPlayer() {
    for(let i = 0; i < 4; i++) {
      let y = this.posObject.startPos.first;

      this.aiPlayers[i].pathIdx = 0;
      this.aiEnemies[i].pathIdx = 0;

      this.aiPlayers[i].setPosition(this.getUIPos(this.posObject[plans[this.status.planIdx]].players[i].x), this.getUIPos(this.posObject[plans[this.status.planIdx]].players[i].y + y))
      this.aiEnemies[i].setPosition(this.getUIPos(this.posObject[plans[this.status.planIdx]].enemies[i].x), this.getUIPos(this.posObject[plans[this.status.planIdx]].enemies[i].y + y)).setFlipY(true)

      this.aiPlayers[i].setAngle(0);
      this.aiEnemies[i].setAngle(0);
    }
  }

  onStartPlan() {
    this.status.isPlaying = true;
    this.tapGroup.setVisible(false);
    this.TAP.setVisible(false);
    if(this.status.planIdx != -1) {
      this.linesGroup[this.status.planIdx].setVisible(false);
    }
    this.onActivePlayers()
  }

  onActivePlayers() {
    for(let i = 0; i < 4; i ++) {
      this.aiPlayers[i].play("player_anim")
      this.aiEnemies[i].play("enemy_anim")
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getUIPos(x) {
    return x * w / boardW;
  }

  getRealPos(x) {
    return x * boardW / w;
  }

  getAttempText(num) {
    if(num == 1) return "1st";
    if(num == 2) return "2nd";
    if(num == 3) return "3th";
    if(num == 4) return "4th";
  }

  startRound() {
    // this.player.setPosition(mW, h - goalH - playerR / 2);
    //this.ai.setPosition(mW, scr + goalH + playerR / 2);
    this.status["startRoundTime"] = new Date().getTime();

    power = 0;
    this.power_effect.setFrame(Math.round(power));

    this.isDragging = false;

    this.status.isBallPlayer = true;
    this.status.isPlaying = false;
    this.status.planIdx = -1;
    this.status.isKick = false;
    this.status.isThrowBall = false;
    this.status.isSacked = false;

    this.posObject.startPos.x = 400;
    this.posObject.startPos.y = this.posObject.startPos.first + 140;

    this.yardsText.setText(`${this.getAttempText(this.status.roundNum)} AND ${Math.round((this.posObject.startPos.first - this.posObject.startPos.second) / 14)}`);
    // this.posObject.startPos.first = 160 + 140 * 10;
    // this.posObject.lineDistance = 140 * 3;

    // INIT DATA
  
    this.player.setPosition(this.getUIPos(this.posObject.startPos.x), this.getUIPos(this.posObject.startPos.y));
    this.player.setVelocity(0, 0).setAngle(0).play("player_idle_anim");
    this.blueline.setPosition(this.blueline.x, this.getUIPos(this.posObject.startPos.first));
    this.yellowline.setPosition(this.yellowline.x, this.getUIPos(this.posObject.startPos.second));

    this.initTabList();
    // this.onSelectPlan("PLAN1", 0);
    // END INIT DATA

    // INIT UI
    this.tapGroup.setVisible(true)

    this.roundText.setVisible(false);
    this.touchDownText.setVisible(false);

    // END INIT UI
    this.ballDir *= -1;
    // this.ball.setVelocity(dirX * ballVX, ballVY * this.ballDir);
    this.whistle.play();
    this.scored = false;
    //this.player.setVelocity(0, 0);
    //this.goalXPos = this.player.x;
    //this.goalYPos = this.player.y;
    //this.isDragging = false;
    this.touches = 0;

    this.ball.setImmovable(false);
    this.ball.setAlpha(1);
    this.goalTxt.setVisible(false);
    this.addedScrTxt.setVisible(false);
    this.ball.setCircle(this.textures.get("ball").getSourceImage().width / 2);

    this.aiEnemies.forEach(e => {
      e.setVelocity(0, 0).setAngle(0).play("enemy_idle_anim");
    });
    this.aiPlayers.forEach(p => {
      p.setVelocity(0, 0).setAngle(0).play("player_idle_anim");
    })

  }

  initTabList() {
    let randomTaps = this.shuffleArray(this.tabList);

    this.tabList.forEach(tap => {
      tap.setVisible(false);
    })

    for(let i = 0; i < 3; i ++) {
      let tap = randomTaps[i];
      const itemR = w * 0.2;
      tap.setPosition(w / 2 - itemR * 1.2 + itemR * 1.2 * i, h - itemR * 1.5);
      // tap.setVisible(true);
      randomIdx[tap.idx] = i;
    }
    console.log("randomIdx", randomIdx)
    console.log("randomIdx: --", plans[randomTaps[0].idx], randomTaps[0].idx)
    this.onSelectPlan(plans[randomTaps[0].idx], randomTaps[0].idx)
  }

  score(which = 0) {
    this.scored = true;

    //this.cameras.main.fadeIn(1000);
    this.ball.setVelocity(0, 0);
    setTimeout(() => {
      this.ball.setPosition(mW, mH);
      this.ball.setImmovable(true);
    }, 10);

    this.ball.setAlpha(0.5);
    this.ball.setCircle(0.1);

    let lost = false;
    if (which === 1) {
      lost = this.loseLife();
      this.lost.play();
      //this.cameras.main.flash(50);
      this.cameras.main.shake(30, 0.01);
    } else if (which === 0) {
      this.scoreNum += 100;
      this.goal.play();
      this.goalTxt.text = this.touches === 1 ? "COMBO HIT!" : "GOAL!";
      this.addedScrTxt.text = this.touches === 1 ? "+200" : "+100";

      if (this.touches === 1) {
        //this.cameras.main.flash(50);
        this.cameras.main.shake(40, 0.02);
      } else {
        //this.cameras.main.flash(30);
        this.cameras.main.shake(25, 0.01);
      }


      this.goalTxt.setVisible(true);
      this.addedScrTxt.setVisible(true);
    }

    if (!lost) setTimeout(() => this.startRound(), 2500);
    //this.startRound();
  }

  private touches = 0;
  private scored = false;
  private goalXPos: number;
  private goalYPos: number;
  private isDragging = false;

  aiUpdate() {
    if(this.status.isPlaying) {
      for(let i = 0; i < 4; i++) {
        const player = this.aiPlayers[i];
        const enemy = this.aiEnemies[i];

        let idx = player.pathIdx;
        let first = this.posObject.startPos.first;
        if(player.pathIdx >= 2) {
          first = 160;
          idx = 1;
        } 

        let target = this.posObject[plans[this.status.planIdx]].targets[i][idx];

        let targetX = this.getUIPos(target.x);
        let targetY = this.getUIPos(first + target.y);
        let rate = 1;
        if(this.posObject[plans[this.status.planIdx]].targets[i][0].y == 0 && this.posObject[plans[this.status.planIdx]].targets[i][1].y == 0) {
          targetX = enemy.x + 30;
          targetY = enemy.y;
          rate = 0.35
        }

        let dx = targetX - player.x;
        let dy = targetY - player.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let velocity = 90 * (distance < 1? 0 : 1) * rate;

        if(velocity == 0) {
          player.pathIdx++;
        }

        // Calculate the direction towards the goal
        let angle = Math.atan2(dy, dx);
  
        // Calculate the velocity components
        let vx = Math.cos(angle) * velocity;
        let vy = Math.sin(angle) * velocity;

        player.setAngle(angle * 180 / Math.PI + 90)
        player.setVelocity(vx, vy)

        // AI ENEMEY
        let eVelocity = 40;
        targetX = player.x;
        targetY = player.y - 50;

        if(first == 160 || this.status.isThrowBall || this.posObject[plans[this.status.planIdx]].targets[i][0].y == 0 && this.posObject[plans[this.status.planIdx]].targets[i][1].y == 0) {
          targetX = this.ball.x;
          targetY = this.ball.y;
          // if(player.anims.getName() != "smoke_anim") {
          //   player.play("smoke_anim");
          // }
          eVelocity = 90
        }

        dx = targetX - enemy.x;
        dy = targetY - enemy.y;
        distance = Math.sqrt(dx * dx + dy * dy);
        velocity = eVelocity * (distance < 1? 0 : 1);

        // Calculate the direction towards the goal
        angle = Math.atan2(dy, dx);
  
        // Calculate the velocity components
        vx = Math.cos(angle) * velocity;
        vy = Math.sin(angle) * velocity;

        enemy.setAngle(angle * 180 / Math.PI - 90)
        enemy.setVelocity(vx, vy)

      }
    }
  }

  ballUpdate() {
    if(this.status.isKick) {
      let target = this.ball.target;
      let start = this.ball.start;

      console.log(target, start)
      let dx = target.x - start.x;
      let dy = target.y - start.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      // let velocity = 80 * (distance < 1? 0 : 1);
      // Calculate the direction towards the goal
      // let angle = Math.atan2(dy, dx);

      // Calculate the velocity components
      // let vx = Math.cos(angle) * velocity;
      // let vy = Math.sin(angle) * velocity;

      // this.ball.setVelocity(vx, vy)
      // this.ball.setAngle(angle);

      let dx1 = target.x - this.ball.x;
      let dy1 = target.y - this.ball.y;
      let remainDistance = Math.sqrt(dx1 * dx1 + dy1 * dy1);

      if(remainDistance < 10) {
        this.ball.setVelocity(0, 0);
        this.status.isKick = false;

        this.time.delayedCall(100, () => {
          this.ball.play('ball_idle_anim')
          if(!this.status.isBallPlayer) {
            this.onCatchLogic("incomplete");
          }
        }, [], this);
      }

      this.ball.setDisplaySize(ballR * (- Math.abs(0.5 - remainDistance / distance) + 1.5), ballR * (- Math.abs(0.5 - remainDistance / distance) + 1.5));

    } else {
      if(this.status.isPlaying && this.status.isBallPlayer) {
        if(this.getRealPos(this.ball.y) < this.posObject.lastLine - 50) {
          this.onCatchLogic();
        }
      }
    }
  }

  scoreUpdate() {

    if(this.status.isPlaying && this.status.isThrowBall && this.status.isBallPlayer) {
      const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.posObject.runPos.x, this.posObject.runPos.y);

      this.status["runDistance"] = Math.round(this.getRealPos(distance) / 14);
    }

    this.scoreText.setText(`${this.getTotalScore() + this.scoreNum} PTS`);
  }

  getTotalScore() {
    return (
      this.status["score"].touchDown * scoreSystem.touchdown +
      this.status["score"].firstDown * scoreSystem.firstdown +
      this.status["score"].passStreak * 500 +
      (this.status["score"].runYards + this.status["runDistance"]) * scoreSystem.yard
    );
  }

  onCatchLogic(type = "normal") {
    let x = this.ball.x;
    let y = this.ball.y;

    let first = this.getUIPos(this.posObject.startPos.first);
    let second = this.getUIPos(this.posObject.startPos.second);

    let text = "";

    if(y > second || type == "incomplete") {
      this.status.roundNum++;

      if(this.status.roundNum > 4) {
        this.onGameOver();
        return;
      }

      text = "INCOMPLETE";
      if(type == "sacked") {
        text = y > first? "SACKED!!" : "TACKLED!!";
        if(this.posObject.startPos.first > this.getRealPos(this.ball.y)) {
          this.posObject.startPos.first = this.getRealPos(this.ball.y);
        }
        if(y > first) {
          this.sacked.play();
        } else {
          this.tackle.play();
        }
        this.tackle1.play();
      }
    } else if(y > this.getUIPos(this.posObject.lastLine)) {
      this.status.roundNum = 1;
      text = "1ST DOWN!";
      this.posObject.startPos.first = this.getRealPos(this.ball.y);
      this.posObject.startPos.second = this.posObject.startPos.first - 140 * 3;
      if(this.posObject.startPos.second < this.posObject.lastLine) {
        this.posObject.startPos.second = this.posObject.lastLine
      }

      this.status["score"].firstDown++;
      this.firstdown.play();
      this.tackle1.play();

    } else if(y < this.getUIPos(this.posObject.lastLine - 20)){
      this.status.roundNum = 1;
      text = "TOUCHDOWN!";
      this.touchDownText.setVisible(true);

      this.posObject.startPos.first = 160 + 140 * 10;
      this.posObject.startPos.second = 160 + 140 * 7;
      this.status["score"].touchDown++;
      this.touchdown.play();
      this.touchdown1.play();
    }

    this.roundText.setText(text).setVisible(true);

    this.status.isPlaying = false;

    this.status["score"].runYards += this.status["runDistance"];
    this.status["runDistance"] = 0;

    this.onInitPlayerVelocity();
    console.log("add run yards : " + this.status["runDistance"], "total: ", this.getTotalScore());

    this.time.delayedCall(2000, this.startRound, [], this);

  }

  onInitPlayerVelocity() {
    this.player.setVelocity(0, 0)
    this.aiEnemies.forEach(e => {
      e.setVelocity(0, 0)
    })
    this.aiPlayers.forEach(p => {
      p.setVelocity(0, 0)
    })
  }

  onTackled() {
    this.aiEnemies.forEach(enemy => {
      if(enemy.anims.getName() != "smoke_anim") {
        enemy.play("smoke_anim");
      }
    })
  }

  getTimeFormatString(val, type = "game") {
    let total = 120;
    if(type == "round") {
      total = 10;
    }
    const min = Math.floor((total - val) / 60).toString()?.padStart(2, "0");
    const sec = Math.floor((total - val) % 60).toString()?.padStart(2, "0");

    return `${min} : ${sec}`;
  }

  timeUpdate() {
    const gameSec = Math.ceil((new Date().getTime() - this.status["startGameTime"]) / 1000);

    const roundSec = Math.ceil((new Date().getTime() - this.status["startRoundTime"]) / 1000);

    // if(gameSec > 50 && this.status.isRound) {
    //   this.onGameOver();
    //   return; 
    // }

    if(roundSec > 10 && !this.status.isPlaying && !this.status.isThrowBall && this.status.isRound) {
      console.log("-----", roundSec)
      this.onStartPlan();
    }

    // this.gameTimeText.setText(`TDS : ${this.getTimeFormatString(gameSec)}`)
    this.gameTimeText.setText(`TDS : ${this.status["score"].touchDown}`)
    this.roundTimeText.setText(`${this.getTimeFormatString(roundSec, "round")}`);
  }

  onGameOver() {
    this.gameover.play();
    this.status.isRound = false;
    this.status.isPlaying = false;

    this.gameoverTexts["touchdowns"].setText(`${this.status["score"].touchDown} X ${scoreSystem.touchdown} = ${this.status["score"].touchDown * scoreSystem.touchdown}`);
    this.gameoverTexts["firstdowns"].setText(`${this.status["score"].firstDown} X ${scoreSystem.firstdown} = ${this.status["score"].firstDown * scoreSystem.firstdown}`);
    this.gameoverTexts["runyards"].setText(`${this.status["score"].runYards} X ${scoreSystem.yard} = ${this.status["score"].runYards * scoreSystem.yard}`);
    this.gameoverTexts["gametotal"].setText(`${this.getTotalScore()}`);

    const isEnd = this.loseLife();
    if(isEnd) {
      this.gameOverGroup.setVisible(true);
      this.gameOverExitBtn.setVisible(false);
      this.time.delayedCall(4000, this.loseGame, [], this);
    } else {
      this.time.delayedCall(4000, this.initGame, [], this);
    }
  }

  powerupUpdate(delta) {

    if (this.isDragging == true && this.status.isThrowBall && this.status.isPlaying) {
      power += 3 * (delta / 1000);
      if (power > 15) power = 15;
      this.power_effect.setFrame(Math.round(power));
    }
  }

  onTackleEvent() {
    if(this.status.isSacked || !this.status.isBallPlayer || !this.status.isPlaying) return;
    // this.tackle.play();
    this.status.isSacked = true;
    this.onCatchLogic("sacked");
  }

  update(time, delta) {
    if(this.status["isGamePause"]) return;
    
    this.playerGroup.setXY(this.player.x, this.player.y)
    this.power_effect.setPosition(this.power_effect.x + this.getUIPos(playerR * 0.7), this.power_effect.y - this.getUIPos(playerR * 1.3))

    this.aiUpdate();
    this.ballUpdate();
    this.scoreUpdate();
    this.timeUpdate();
    this.powerupUpdate(delta);

    if(this.physics.overlap(this.player, this.aiEnemies) && this.status.isBallPlayer) {
      tackleTime += (delta / 1000);
      console.log("tackle", tackleTime)
      if(tackleTime > 1) {
        this.onTackleEvent();
      }
    } else {
      tackleTime = 0;
    }

    if(this.status.isBallPlayer) {
      this.ball.setPosition(this.player.x + playerR / 4, this.player.y - playerR / 3.4);
    } 

    if (this.isDragging && this.status.isPlaying) {

      if(this.player.y < this.getUIPos(this.posObject.startPos.first) && !this.status.isThrowBall) {
        this.goalYPos = this.getUIPos(2000);
      }

      const dx = this.goalXPos - this.player.x;
      const dy = this.goalYPos - this.player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate the velocity based on the distance to the target
      const playerSpeed = 300; // Adjust the speed as needed
      const maxDistance = 45; // Adjust the speed as needed
      let velocity = (playerSpeed * distance) / maxDistance;

      velocity = 100 * (distance < 1? 0 : 1) * (1 - 0.4 * (Math.round(power)) / 15);

      // Calculate the direction towards the goal
      const angle = Math.atan2(dy, dx);

      // Calculate the velocity components
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      // Set the player's velocity
      this.player.setVelocity(vx, vy);
      this.player.setAngle(angle / Math.PI * 180 + 90)
    }

    if (this.scored) return;

    // if (this.ball.y >= h - goalH + ballR / 2) this.score(1);
    // else if (this.ball.y <= goalH + ballR / 2) this.score();
  }
}

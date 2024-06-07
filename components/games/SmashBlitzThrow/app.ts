import Phaser, { Scene } from "phaser";

import { BackGroundManager } from "./backGroundManager";
import { TargetFactory } from "./TargetFactory";
import { Ball } from "./ball";
import { ThrowingCenter } from "./ThrowingCenter";
import { BallShooter } from "./BallShooter";
import { BallAndTargetsOverlap } from "./BallAndTargetsOverlap";
import { StretchingArrow } from "./StretchingArrow";
import { GreenArrow } from "./GreenArrow";
import { ExplosionEffect } from "./ExplosionEffect";
import { TargetReplacer } from "./TargetReplacer";
import { CountDownTimer } from "./UI/CountDownTimer";
import { AssetsLoader } from "./AssetsLoader";
import { TimerContainer } from "./UI/TimerContainer";
import { PairNumbersContainer } from "./UI/PairNumbersContainer";
import { BudgetCounter } from "./UI/BudgetCounter";
import { ProgressBox } from "./UI/ProgressBox";
import { BallGravity } from "./BallGravity";
import { LivesHandler } from "./LivesHandler";
import { PowerupHandler } from "./Powerups/PowerupHandler";
import { LoseManager } from "./LoseManager";
import { WinManager } from "./WinManager";
import { TargetHitCounter } from "./UI/TargetHitCounter";
import { ScoreManager } from "./ScoreManager";
import { LevelCompletePopup } from "./UI/LevelCompletePopup";
import { PointPopup } from "./UI/PointPopup";
import { LevelManager } from "./LevelManager";
import { PlayerController } from "./Player/PlayerController";
import { FlameBoost } from "./Powerups/FlameBoost";
import { RocketBoost } from "./Powerups/RocketBoost";
import { loading } from "./Preloader";
import { Tutorial } from "./UI/Tutorial";
import { Audios } from "./Audios";
import { AudioBtn } from "./UI/AudioBtn";
import {
  BALLS,
  BOMB_INDEX,
  GAME_STATES,
  LIFE_COUNT,
  PLAYER_STATES,
  TOTAL_TARGET_COUNT,
  TUTORIAL_DURATION,
} from "./Consts";
import { Global } from "./Global";
import { GameStateCtrl } from "./GameStateCtrl";
import { PauseBtn } from "./UI/PauseBtn";
import { PausePopup } from "./UI/PausePopup";
import { FourNumbersContainer } from "./UI/FourNumbersContainer";
import { PowerupOverlay } from "./Powerups/PowerupOverlay";
import { RocketBoostBtn } from "./Powerups/RocketBoostBtn";
import { FlameBoostBtn } from "./Powerups/FlameBoostBtn";
import { getRandomInt } from "./Helper";
import { Targets } from "./Targets";
import { GameOverPopup } from "./UI/GameOverPopup";

export default class SmashBlitzThrowing extends Phaser.Scene {
  public static instance: SmashBlitzThrowing;
  boostCredits: number = 0;
  powerupBtnFire: any;
  powerupBtnRocket: any;
  scoreHandler: any;
  isFirstFlameBoost: boolean = true;
  isFirstRoketBoost: boolean = true;
  powerupOverlay!: PowerupOverlay;

  public setScoreHandle(handleScore: any) {
    this.scoreHandler = handleScore;
  }

  gameType: string = "smashBlitzThrow";

  levelCompletePopup: any;
  levelManager!: LevelManager;

  prevTargetCounter: number = 0;
  prevScoreCounter: number = 0;
  hitCounterClass!: TargetHitCounter;
  targetHitCounter!: number;
  levelCounter!: PairNumbersContainer;
  widthFactor!: number;
  heightFactor!: number;
  livesCounter!: PairNumbersContainer;
  pointsCounter!: FourNumbersContainer;
  public config = {
    parent: "game",
    scale: {
      mode: Phaser.Scale.FIT,
    },
    type: Phaser.AUTO,
    width: 960,
    height: 512,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    physics: {
      default: "arcade",
      arcade: {
        //  debug: true,
        gravity: { y: 500, x: 0 },
      },
    },
  };

  private params: any;

  constructor(gameType: any, _params: any) {
    super();
    SmashBlitzThrowing.instance = this;

    this.params = _params;
    if (gameType) this.gameType = gameType;

    // test
    //this.params = {}
    //this.params.level = 8;
    //this.params.boostCredits = 7;
    //this.params.lives = 6;
    //this.params.score = 5;
  }

  width: number = 1920 / 2;
  height: number = 1024 / 2;

  init() {}
  preload() {
    loading(this);

    let imageLoader = new AssetsLoader(this);
    imageLoader.load(this.gameType, this.params);
  }
  bg!: Phaser.GameObjects.Sprite;
  group!: Phaser.GameObjects.Group;
  sprite!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  stretchingArrow?: StretchingArrow;
  countDownTimer!: CountDownTimer;
  prevScore: number = 0;
  create() {
    setTimeout(() => {
      this.initialize();
    }, 100);
  }
  initialize() {
    new Audios(this);
    new GameStateCtrl(this);

    this.width = this.renderer.width;
    this.height = this.renderer.width / 1.875;

    this.widthFactor = this.width / 10;
    this.heightFactor = this.height / 10;

    let backgroundSprite = this.params
      ? this.params.backgroundSprite
      : undefined;
    new BackGroundManager(this, backgroundSprite, this.width, this.height); //this.params.backgroundSprite);
   /* let versiontxt = this.make.text({
      x: this.renderer.width,
      y: this.renderer.height,
      origin: 1,
      text: "v1.1",

      style: {
        font: "20px monospace",
      },
    });*/
   // versiontxt.setStroke(`0x000000`, 2);

    let throwingCenterX = this.widthFactor * 1.6;
    let throwingCenterY = this.heightFactor * 7.3;
    new TargetFactory(this, this.width, this.height, 128).init();
    var ball: Phaser.Types.Physics.Arcade.ImageWithDynamicBody = new Ball(
      this
    ).init(throwingCenterX, throwingCenterY, "ball");
    var throwingCenter = new ThrowingCenter(this).init(
      throwingCenterX,
      throwingCenterY,
      "center"
    );
    var ballShooter = new BallShooter(this).init(throwingCenter, ball);

    let playerPosx = throwingCenterX + 40;
    let playerPosy = throwingCenterY + 70;

    let playerController = new PlayerController(this, playerPosx, playerPosy);

    new AudioBtn(this);
    new PauseBtn(this);

    new Tutorial(this, this.widthFactor, this.heightFactor);
    setTimeout(() => {
      this.bypassTutorial();
    }, TUTORIAL_DURATION * 1000);

    new BallAndTargetsOverlap(this).init(ball);
    this.stretchingArrow = new StretchingArrow(this);
    this.stretchingArrow.init(throwingCenter);

    new GreenArrow(this).init(throwingCenter);

    let explosionEffect = new ExplosionEffect(this);

    new TargetReplacer(this);
    this.events.emit("TargetReplacer:setRandomTarget");

    playerController.container._body.on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN,
      (pointer: any) => {
        if (Global.gameState != GAME_STATES.PLAYING) return;
        this.events.emit("Input:pointerdown", pointer);
        // console.log("Input:pointerdown");
        this.bypassTutorial();
      }
    );

    this.input.on(
      Phaser.Input.Events.GAMEOBJECT_POINTER_MOVE,
      (pointer: any) => {
        if (Global.gameState != GAME_STATES.PLAYING) return;
        this.events.emit("Input:pointermove", pointer);
        //ball.enableBody(true, center.x, center.y, true, true);
        if (Global.playerState == PLAYER_STATES.ARM_BACK) {
          ball.disableBody(true, true);
          ball.visible = true;
          ball.alpha = 1;
          ball.setPosition(
            playerController.container.right_hand.x - 10 + playerPosx,
            playerController.container.right_hand.y - 10 + playerPosy
          );
        }
      }
    );
    this.input.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, (pointer: any) => {
      if (Global.gameState != GAME_STATES.PLAYING) return;
      this.events.emit("Input:pointerup", pointer);
    });

    this.countDownTimer = new CountDownTimer(this);
    let timerContainer = new TimerContainer(this);
    timerContainer.setPos(this.widthFactor * 7, this.heightFactor * 8.7);

    this.createCounters();

    let _score = this.params == undefined ? 0 : parseInt(this.params.score);

    let pointPopup = new PointPopup(this);
    pointPopup.setPos(this.width / 2, this.height / 2);

    let gameOverPopup = new GameOverPopup(this);
    gameOverPopup.setPos(this.width / 2, this.height / 2);

    this.events.on("ScoreManager:onChange", (currentScore: number) => {
      this.pointsCounter.setText(currentScore);
      if (currentScore != 0) pointPopup.show(currentScore - this.prevScore);
      this.prevScore = currentScore;
    });
    new ScoreManager(this).setCount(_score);
    this.events.on("LivesHandler:onChange", (currentLifes: number) => {
      this.livesCounter.setText(currentLifes);
    });

    this.events.on("LivesHandler:onLifeLosed", () => {
      this.livesCounter.setText(0);
      //console.log("---gameLose");
    });

    let _lives = this.params ? this.params.lives : LIFE_COUNT;
    new LivesHandler(this, _lives);

    this.boostCredits = this.params
      ? this.params.boostCredits ?? this.params.boostCredits
      : 0;
    let powerupCounter = new BudgetCounter(this);
    powerupCounter.setPos(this.widthFactor * 0.9, this.heightFactor * 3.1);
    powerupCounter.instance.setScale(0.7, 0.7);

    this.events.on("PowerupHandler:onChange", (count: number) => {
      powerupCounter.setText(count.toString());
      this.boostCredits = count;
    });

    new PowerupHandler(this, this.boostCredits);

    let goalCounterContainer = new BudgetCounter(this);
    goalCounterContainer.setPos(this.widthFactor * 0.9, this.heightFactor * 2);
    //goalCounterContainer.setText("00");
    goalCounterContainer.instance.setScale(0.7, 0.7);
    goalCounterContainer.setTexture("goal");
    this.events.on("TargetHitCounter:onGoalCountChange", (count: number) => {
      goalCounterContainer.setText(count.toString());
    });

    this.events.on("TargetHitCounter:onHit", (count: number) => {
      this.targetHitCounter = count;
    });

    this.hitCounterClass = new TargetHitCounter(this);

    new FlameBoost(this);
    new RocketBoost(this);

    new RocketBoostBtn(this, this.widthFactor * 5.5, this.heightFactor * 9);
    new FlameBoostBtn(this, this.widthFactor * 4.4, this.heightFactor * 9);

    let progressBox = new ProgressBox(this);
    progressBox.setPos(this.widthFactor * 2, this.heightFactor * 9.35);
    let ballGravity = new BallGravity(this);

    this.levelCompletePopup = new LevelCompletePopup(
      this,
      this.width,
      this.height
    );
    this.levelCompletePopup.setPos(this.width / 2, this.height / 2);
    this.levelCompletePopup.hide();

    let currentLevel =
      this.params == undefined ? 0 : parseInt(this.params.level ?? 1) - 1;

    this.events.on("GameOver:onComplete", () => {
      this.events.emit("ScoreManager:getTotalScore", (totalScore: number) => {
        if (this.scoreHandler)
          this.scoreHandler(totalScore, currentLevel + 1, this.boostCredits);
      });
    });

    this.events.on("LoseManager:onLose", () => {
      gameOverPopup.show();
    });

    this.events.on("PausePopup:onQuitClick", () => {
      this.events.emit("ScoreManager:getTotalScore", (totalScore: number) => {
        if (this.scoreHandler)
          this.scoreHandler(totalScore, currentLevel + 1, this.boostCredits);
      });
    });

    this.events.on("LevelCompletePopup:onClaimBtnClick", () => {
      this.levelCompletePopup.hide();

      // this.events.emit("LevelManager:getCurrentLevel", (data: any) => {
      //   console.log(data);
      // });
      this.events.emit(
        "LevelManager:getNextLevel",
        (levelNum: number, data: any) => {
          // console.log(data);
          //goalCounterContainer.setText(data[0]);
          this.hitCounterClass.setGoalCount(data[0]);
          currentLevel = levelNum;
          this.levelCounter.setText(levelNum + 1);
          this.countDownTimer.set(data[1]);
          this.countDownTimer.start();

          this.events.emit(
            "ProgressBox:setGreenAreaWidth",
            parseFloat(data[2])
          );
          this.events.emit("ProgressBox:setTimeScale", parseFloat(data[3]));

          this.events.emit("TargetReplacer:setRandomTarget");
        }
      );
    });

    this.levelManager = new LevelManager(this, currentLevel);
    this.events.emit(
      "LevelManager:getCurrentLevel",
      (levelNum: number, data: any) => {
        this.hitCounterClass.setGoalCount(data[0]);
        this.levelCounter.setText(levelNum + 1);
        this.countDownTimer.set(data[1]);
        this.events.emit("ProgressBox:setGreenAreaWidth", parseFloat(data[2]));
        this.events.emit("ProgressBox:setTimeScale", parseFloat(data[3]));
      }
    );

    new LoseManager(this);
    new WinManager(this);
    new PausePopup(this);

    this.powerupOverlay = PowerupOverlay.getInstance(this);
    this.add.container(this.width / 2, this.height / 2, this.powerupOverlay);

    return;
  }

  bypassTutorial() {
    if (Global.gameState == GAME_STATES.TUTURIAL) {
      this.events.emit("Tutorial:hide");
      this.countDownTimer.start();
    }
  }

  update(t: number, dt: number) {
    if (this.stretchingArrow) this.stretchingArrow.update();
    return;
    this.physics.world.collide(this.sprite, this.group);
  }

  createCounters() {
    this.levelCounter = new PairNumbersContainer(
      this,
      this.widthFactor * 6.91,
      this.heightFactor * 2.3,
      1,
      "LEVEL",
      "#72F7F5"
    );
    this.pointsCounter = new FourNumbersContainer(
      this,
      this.widthFactor * 5,
      this.heightFactor * 2.3,
      0,
      "POINTS",
      "#DCFC35",
      1.5
    );
    this.livesCounter = new PairNumbersContainer(
      this,
      this.widthFactor * 3.1,
      this.heightFactor * 2.3,

      1,
      "LIVES",
      "#72F7F5"
    );
  }
}

window.onload = () => {
 /* const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 512,
    scene: SmashBlitzThrowing,
    parent: "game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scale: {
      mode: Phaser.Scale.FIT,
    },
    physics: {
      default: "arcade",
      arcade: {
        // debug: true,
        gravity: { y: 500, x: 0 },
      },
    },
  };

  const game = new Phaser.Game(config);*/
};

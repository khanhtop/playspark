import Phaser, { Scene } from "phaser";

import { BackGroundManager } from "./backGroundManager";
import { Targets } from "./Targets";
import { TargetFactory } from "./TargetFactory";
import { Ball } from "./ball";
import { ThrowingCenter } from "./ThrowingCenter";
import { BallShooter } from "./BallShooter";
import { Observer } from "./Observer";
import { BallAndTargetsOverlap } from "./BallAndTargetsOverlap";
import { StretchingArrow } from "./StretchingArrow";
import { GreenArrow } from "./GreenArrow";
import { ExplosionEffect } from "./ExplosionEffect";
import { TargetReplacer } from "./TargetReplacer";
import { CountDownTimer } from "./CountDownTimer";
import { AssetsLoader } from "./AssetsLoader";
import { TimerContainer } from "./TimerContainer";
import { PairNumbersContainer } from "./PairNumbersContainer";
import { BudgetCounter } from "./BudgetCounter";
import { PowerupBtn } from "./PowerupBtn";
import { ProgressBox } from "./ProgressBox";
import { getPercentage } from "./Helper";
import { BallGravity } from "./BallGravity";
import ComponentService from "./ComponentService";
import { ClickComponent } from "./Components/ClickComponent";
import { LivesHandler } from "./LivesHandler";
import { PowerupHandler } from "./PowerupHandler";
import { LoseManager } from "./LoseManager";
import { WinManager } from "./WinManager";
import { TargetHitCounter } from "./TargetHitCounter";
import { ScoreManager } from "./ScoreManager";
import { LevelCompletePopup } from "./LevelCompletePopup";
import { PointPopup } from "./PointPopup";
import { LevelManager } from "./LevelManager";
import { PlayerController } from "./PlayerController";
import { FlameBoost } from "./FlameBoost";
import { RocketBoost } from "./RocketBoost";
import { loading } from "./Preloader";
import { TutorialMessage } from "./TutorialMessage";
import { Tutorial } from "./Tutorial";
import { Audios } from "./Audios";
import { AudioBtn } from "./AudioBtn";
import { GAME_STATES, LIFE_COUNT, TUTORIAL_DURATION } from "./Consts";
import { Global } from "./Global";
import { GameStateCtrl } from "./GameStateCtrl";
import { PauseBtn } from "./PauseBtn";
import { PausePopup } from "./PausePopup";
import { FourNumbersContainer } from "./FourNumbersContainer";


export default class SmashBlitzThrowing extends Phaser.Scene {
  public static instance: SmashBlitzThrowing;
  boostCredits: number = 0;
  powerupBtnFire: any;
  powerupBtnRocket: any;
  scoreHandler: any;

  public setScoreHandle(handleScore: any) {
    this.scoreHandler = handleScore;
  }

  gameType: string = "smashBlitzThrow";
  private components!: ComponentService;
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
    type: Phaser.AUTO,
    width: 960,
    height: 512,
    parent: "game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    scale: {
      mode: Phaser.Scale.FIT,
    },
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
    // console.log(`----[[[ \n ${gameType} \n ${_params}`);
    this.params = _params;
  }

  width: number = 1920 / 2;
  height: number = 1024 / 2;

  init() {
    this.components = new ComponentService();
    this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.components.destroy();
    });
  }
  preload() {
    loading(this);

    this.gameType = "smashBlitzThrow";
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
    let throwingCenterX = this.widthFactor * 1.6;
    let throwingCenterY = this.heightFactor * 7.3;
    new TargetFactory(this, this.width, this.height, 70).init();
    var ball: Phaser.Types.Physics.Arcade.ImageWithDynamicBody = new Ball(
      this
    ).init(throwingCenterX, throwingCenterY, "ball");
    var throwingCenter = new ThrowingCenter(this).init(
      throwingCenterX,
      throwingCenterY,
      "center"
    );
    var ballShooter = new BallShooter(this).init(throwingCenter, ball);

    let playerController = new PlayerController(
      this,
      throwingCenterX,
      throwingCenterY
    );

    new AudioBtn(this);
    new PauseBtn(this);

    new Tutorial(this, this.widthFactor, this.heightFactor);
    setTimeout(() => {
      this.bypassTutorial();
    }, TUTORIAL_DURATION * 1000);

    this.events.emit("Targets:setTargetTexture", 0, "powerup");
    this.events.emit("Targets:setTargetTexture", 1, "gold_ball");
    this.events.emit("Targets:setTargetTexture", 2, "purple_ball");
    this.events.emit("Targets:setTargetTexture", 3, "bomb");
    this.events.emit("Targets:setTargetTexture", 4, "purple_ball");

    new BallAndTargetsOverlap(this).init(ball);
    this.stretchingArrow = new StretchingArrow(this);
    this.stretchingArrow.init(throwingCenter);

    new GreenArrow(this).init(throwingCenter);

    let explosionEffect = new ExplosionEffect(this);

    new TargetReplacer(this);

    playerController.player_sprite.on(
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

    let _score = this.params ? this.params.score : 0;
    new ScoreManager(this).setCount(_score);
    let pointPopup = new PointPopup(this);
    pointPopup.setPos(this.width / 2, this.height / 2);

    this.events.on("ScoreManager:onChange", (currentScore: number) => {
      this.pointsCounter.setText(currentScore);
      pointPopup.show(currentScore - this.prevScore);
      this.prevScore = currentScore;
    });

    this.events.on("LivesHandler:onChange", (currentLifes: number) => {
      this.livesCounter.setText(currentLifes);
    });

    this.events.on("LivesHandler:onLifeLosed", () => {
      this.livesCounter.setText(0);
      //console.log("---gameLose");
    });
  
    let _lives = this.params ? this.params.lives : LIFE_COUNT;
    new LivesHandler(this,_lives);

    this.boostCredits = 0;
    let powerupCounter = new BudgetCounter(this);
    powerupCounter.setPos(this.widthFactor * 0.9, this.heightFactor * 3.1);
    powerupCounter.instance.setScale(0.7, 0.7);

    this.events.on("PowerupHandler:onChange", (count: number) => {
      //console.log("PowerupHandler:onChange");
      powerupCounter.setText(count.toString());
      this.boostCredits = count;
    });
    new PowerupHandler(this);

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

    this.powerupBtnRocket = new PowerupBtn(
      this,
      this.widthFactor * 5.5,
      this.heightFactor * 9,
      "rocket",
      "2"
    );
    this.initRocketPowerupBtn();

    this.powerupBtnFire = new PowerupBtn(
      this,
      this.widthFactor * 4.4,
      this.heightFactor * 9,
      "fire",
      "3"
    );

    this.initFlamePowerupBtn();

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

    this.events.on("LoseManager:onLose", () => {
      this.events.emit("ScoreManager:getTotalScore", (totalScore: number) => {
        if (this.scoreHandler) this.scoreHandler(totalScore);
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
          this.levelCounter.setText(levelNum + 1);
          this.countDownTimer.set(data[1]);
          this.countDownTimer.start();

          this.events.emit("ProgressBox:setGreenAreaWidth", data[2]);
          this.events.emit("ProgressBox:setTimeScale", data[3]);
        }
      );
    });

    this.levelManager = new LevelManager(this);
    this.events.emit(
      "LevelManager:getCurrentLevel",
      (levelNum: number, data: any) => {
        this.hitCounterClass.setGoalCount(data[0]);
        this.levelCounter.setText(levelNum + 1);
        this.countDownTimer.set(data[1]);
        this.events.emit("ProgressBox:setGreenAreaWidth", data[2]);
        this.events.emit("ProgressBox:setTimeScale", data[3]);
      }
    );

    new LoseManager(this);
    new WinManager(this);
    new PausePopup(this);
    return;

    /* const particles = this.add.particles(0, 0, "red", {
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    const logo = this.physics.add.image(400, 100, "logo");

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    particles.startFollow(logo);*/
  }
  bypassTutorial() {
    if (Global.gameState == GAME_STATES.TUTURIAL) {
      this.events.emit("Tutorial:hide");
      this.countDownTimer.start();
    }
  }
  initRocketPowerupBtn() {
    let cmnt = new ClickComponent();
    cmnt.callBack = () => {
      // console.log("booster flame");
      if (this.boostCredits < 2) return;
      this.boostCredits -= 2;
      this.events.emit("PowerupHandler:setCount", this.boostCredits);
      this.events.emit("RocketBoost:boost");
    };
    this.components.addComponent(this.powerupBtnRocket.clickArea, cmnt);
  }
  initFlamePowerupBtn() {
    let cmnt = new ClickComponent();
    cmnt.callBack = () => {
      // console.log("booster flame");
      if (this.boostCredits < 3) return;
      this.boostCredits -= 3;
      this.events.emit("PowerupHandler:setCount", this.boostCredits);
      this.events.emit("FlameBoost:boost");
    };
    this.components.addComponent(this.powerupBtnFire.clickArea, cmnt);
  }

  update(t: number, dt: number) {
    this.components.update(dt);
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

    autoCenter: Phaser.Scale.CENTER_BOTH,
    scale: {
      mode: Phaser.Scale.FIT,
    },
    physics: {
      default: "arcade",
      arcade: {
        //  debug: true,
        gravity: { y: 500, x: 0 },
      },
    },
  };

  const game = new Phaser.Game(config);*/
};

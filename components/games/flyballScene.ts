import Phaser, { Game } from "phaser";
import { getImageWithSize } from "@/helpers/cloudinary";

let w: number,
  h: number,
  mW: number,
  mH: number,
  scr: number,
  wingR: number,
  ballR: number;

let lastPos = {
  x: 300, y :0, id: 1,
  ballPos : {
    x : 300, y : 0
  }
}

let HIT_STATUS = {
  TOP: false,
  DOWN: false,
  COLLIDER: false
}

let GAME = {
  level: 1,
  ball: 3,
  light: 100,
  coin: 0,
  ring: 0,
  passRing: 0,
  sequence: 0,
}

let STATUS = {
  magnify: false,
  shrink: false,
  power: false
}

let ITEM = {
  magnify: 5,
  shrink: 15,
  power: 25,
  heart: 35
}

let gameType = "football";

export default class FlyBallScene extends Phaser.Scene {
  public static instance: FlyBallScene;
  private params: any;
  tileBg: Phaser.GameObjects.TileSprite;
  additionalSpriteOne: Phaser.GameObjects.Sprite;
  additionalSpriteOne1: Phaser.GameObjects.Sprite;
  additionalSpriteOne2: Phaser.GameObjects.Sprite;
  levelTxt: Phaser.GameObjects.Text;
  ballTxt: Phaser.GameObjects.Text;
  lightTxt: Phaser.GameObjects.Text;
  coinTxt: Phaser.GameObjects.Text;
  scoreTxt: Phaser.GameObjects.Text;
  ball: Phaser.Physics.Arcade.Sprite;
  ballGroup: Phaser.GameObjects.Group;
  hoop: Phaser.Physics.Arcade.StaticGroup;
  wings: Phaser.GameObjects.Sprite[];
  obstacles: any;
  items: any;
  emitter: Phaser.GameObjects.Particles.ParticleEmitter;
  snowEmitter: Phaser.GameObjects.Particles.ParticleEmitter;
  popUpTexts: any;
  leftStatus: any;

  constructor(newGameType: string, newParams: any) {
    super();
    FlyBallScene.instance = this;
    gameType = newGameType;
    this.params = newParams;
    console.log(this.params)
    this.params.backgroundSprite = !!this.params.backgroundSprite? this.params.backgroundSprite : ("/pong/" + gameType + "/background/bg1.jpg");
    this.params.playerSprite = !!this.params.playerSprite? this.params.playerSprite : "/pong/" + gameType + "/ball/ball1.png";
    this.params.objectSprite = !!this.params.objectSprite? this.params.objectSprite : "/pong/" + gameType + "/UI/light.png";
    this.params.sponsorLogo = !!this.params.sponsorLogo? this.params.sponsorLogo : "/pong/" + gameType + "/fence.png";
  }

  preload() {

    w = this.game.canvas.clientWidth;
    h = this.game.canvas.clientHeight;
    ballR = 40;
    wingR = 25;
    scr = h * 0.08;
    mW = w / 2;
    mH = (h - scr) / 2 + scr;

    this.load.image("wing", "/pong/" + gameType + "/wing/Wing.png");
    // this.load.image("bombEffect", "/pong/" + gameType + "/bomb-effect.png");
    this.load.image("levelBoard", "/pong/" + gameType + "/UI/level.png");
    this.load.image("item_heart", "/pong/" + gameType + "/UI/heart.png");
    this.load.image("light", getImageWithSize(this.params.objectSprite, ballR, ballR));
    this.load.image("coin", "/pong/" + gameType + "/UI/coin.png");
    this.load.image("btn_m", "/pong/" + gameType + "/UI/btn_m.png");
    this.load.image("btn_l", "/pong/" + gameType + "/UI/btn_l.png");
    this.load.image("header", "/pong/" + gameType + "/UI/header.png");

    this.load.image("hoop_t", "/pong/" + gameType + "/UI/hoop_t.png");
    this.load.image("hoop_d", "/pong/" + gameType + "/UI/hoop_d.png");
    
    this.load.image("fx", "/pong/" + gameType + "/UI/fx.png");
    this.load.image("snow", "/pong/" + gameType + "/UI/snow.png");

    this.load.image("magnify", "/pong/" + gameType + "/item/magnify.png");
    this.load.image("heart", "/pong/" + gameType + "/item/heart.png");
    this.load.image("power", "/pong/" + gameType + "/item/power.png");
    this.load.image("shrink", "/pong/" + gameType + "/item/shrink.png");

    this.load.image("bg", getImageWithSize(this.params.backgroundSprite, h, 1920) );
    this.load.image("additionalSpriteOne", getImageWithSize(this.params.additionalSpriteOne, h, 1920));
    this.load.image("ball", getImageWithSize(this.params.playerSprite, ballR, ballR));


    this.load.image("ball", "/pong/" + gameType + "/ball.png");
    //this.load.image('bgGls', '/pong' + gameType + 'n/bgGoals.png');
    this.load.image("heart", "/pong/" + gameType + "/heart.png");
    this.load.image("score", "/pong/" + gameType + "/score.png");

    this.load.image("middleAd", "/pong/" + gameType + "/middleAd.png");
    this.load.image("fence", this.params.sponsorLogo);

    // AUDIO
    this.load.audio("bg", "/pong/" + gameType + "/sound/bg.wav");
    this.load.audio("item_coin", "/pong/" + gameType + "/sound/collectcoin.mp3");
    this.load.audio("levelup", "/pong/" + gameType + "/sound/game-level-complete-trial.mp3");
    this.load.audio("item_light", "/pong/" + gameType + "/sound/item-pick-up.mp3");
    this.load.audio("point", "/pong/" + gameType + "/sound/point.wav");
    this.load.audio("swish", "/pong/" + gameType + "/sound/swish.wav");
    this.load.audio("jump", "/pong/" + gameType + "/sound/jump.mp3");
    this.load.audio("die", "/pong/" + gameType + "/sound/die.mp3");




  }

  // 400 800
  private item_coin: Phaser.Sound.BaseSound;
  private item_light: Phaser.Sound.BaseSound;
  private levelup: Phaser.Sound.BaseSound;
  private point: Phaser.Sound.BaseSound;
  private swish: Phaser.Sound.BaseSound;
  private jump: Phaser.Sound.BaseSound;
  private die: Phaser.Sound.BaseSound;

  private logo: any;

  create() {
    this.sound.add("bg").setVolume(0.3).setLoop(true).play();
    this.item_coin = this.sound.add("item_coin").setVolume(0.3);
    this.item_light = this.sound.add("item_light").setVolume(0.3);
    this.levelup = this.sound.add("levelup").setVolume(0.3);
    this.point = this.sound.add("point").setVolume(0.3);
    this.swish = this.sound.add("swish").setVolume(0.3);
    this.jump = this.sound.add("jump").setVolume(0.3);
    this.die = this.sound.add("die");

    this.tileBg = this.add.tileSprite(0,
      0,
      0,
      0,
      'bg'
    ).setSize(1920, h).setOrigin(0, 0).setPosition(0, 0).setScrollFactor(0, 0);

    this.additionalSpriteOne = this.add.sprite(0, 0, "additionalSpriteOne").setOrigin(0).setDisplaySize(1920, h).setPosition(0, 0);
    this.additionalSpriteOne1 = this.add.sprite(0, 0, "additionalSpriteOne").setOrigin(0).setDisplaySize(1920, h).setPosition(this.additionalSpriteOne.x + 1920, 0);
    this.additionalSpriteOne2 = this.add.sprite(0, 0, "additionalSpriteOne").setOrigin(0).setDisplaySize(1920, h).setPosition(this.additionalSpriteOne.x - 1920, 0);

    this.add.image(mW, mH, "middleAd").setDisplaySize(50, 50).setAlpha(0);
    // this.logo = this.add.image(this.additionalSpriteOne.x + 200, this.additionalSpriteOne.y + mH + 110 * h / 663, 'fence').setDisplaySize(110, 30).setOrigin(0.5, 0.5)

    // GAME HEADER
    const topOffset = 60;
    const leftOffset = 20;
    // LEVEL HEADER
    this.add.sprite(60 - leftOffset, topOffset, 'levelBoard').setDisplaySize(70, 70).setOrigin(0.5, 0.5).setScrollFactor(0, 0)
    this.add
    .text(60 - leftOffset, topOffset - 10, "LEVEL", {
      fontFamily: "TitanOne-Regular",
      fontSize: "15px",
      color: "#fff",
    })
    .setScrollFactor(0, 0)
    .setOrigin(0.5, 0.5);
    this.levelTxt = this.add
    .text(60 - leftOffset, topOffset + 10, "2", {
      fontFamily: "TitanOne-Regular",
      fontSize: "20px",
      color: "#fff",
    })
    .setScrollFactor(0, 0)
    .setOrigin(0.5, 0.5);
    const headerW = w * 0.25;
    this.add.sprite(headerW * 0.5 + 80, topOffset, 'header').setOrigin(0.5, 0.5).setScrollFactor(0, 0).setDisplaySize(headerW, 40);
    this.add.sprite(90, topOffset - 5, 'ball' ).setOrigin(0, 0.5).setDisplaySize(25, 25).setScrollFactor(0, 0)
    this.ballTxt = this.add
    .text(120, topOffset - 5, "2", {
      fontFamily: "TitanOne-Regular",
      fontSize: "18px",
      color: "#000",
    }).setOrigin(0, 0.5).setScrollFactor(0, 0)

    this.add.sprite(headerW * 1.5 + 80, topOffset, 'header').setOrigin(0.5, 0.5).setDisplaySize(headerW, 40).setScrollFactor(0, 0);
    this.add.sprite(headerW + 90, topOffset - 5, 'light' ).setOrigin(0, 0.5).setDisplaySize(25, 25).setScrollFactor(0, 0)
    this.lightTxt = this.add
    .text(headerW + 120, topOffset - 5, "2", {
      fontFamily: "TitanOne-Regular",
      fontSize: "18px",
      color: "#000",
    }).setOrigin(0, 0.5).setScrollFactor(0, 0)

    // HEAD COIN MENU
    // this.add.sprite(headerW * 2.5 + 80, topOffset, 'header').setOrigin(0.5, 0.5).setDisplaySize(headerW, 40).setScrollFactor(0, 0);
    // this.add.sprite(headerW * 2 + 90, topOffset - 5, 'coin' ).setOrigin(0, 0.5).setDisplaySize(25, 25).setScrollFactor(0, 0)
    // this.coinTxt = this.add
    // .text(headerW * 2 + 120, topOffset - 5, "2", {
    //   fontFamily: "TitanOne-Regular",
    //   fontSize: "18px",
    //   color: "#000",
    // }).setOrigin(0, 0.5).setScrollFactor(0, 0)

    // END HEAD COIN MENU

    this.add.sprite(w - 70, topOffset + 50, 'score').setOrigin(0.5, 0.5).setDisplaySize(100, 50).setScrollFactor(0, 0);
    this.add.text(w - 70, topOffset + 40, 'SCORE', {
      fontFamily: "TitanOne-Regular",
      fontSize: "18px",
      color: "#fff",
    })
    .setOrigin(0.5, 0.5).setScrollFactor(0, 0);
    this.scoreTxt = this.add.text(w - 70, topOffset + 60, '12', {
      fontFamily: "TitanOne-Regular",
      fontSize: "18px",
      color: "#fff",
    })
    .setOrigin(0.5, 0.5).setScrollFactor(0, 0);

    this.leftStatus = {};
    this.leftStatus["magnify"] = this.add.sprite(5, topOffset + 50, 'magnify').setDisplaySize(30, 30).setOrigin(0, 0.5).setScrollFactor(0, 0).setAlpha(0.3).setVisible(false);
    this.leftStatus["power"] = this.add.sprite(5, topOffset + 100, 'power').setDisplaySize(30, 30).setOrigin(0, 0.5).setScrollFactor(0, 0).setAlpha(0.3).setVisible(false);
    this.leftStatus["shrink"] = this.add.sprite(5, topOffset + 150, 'shrink').setDisplaySize(30, 30).setOrigin(0, 0.5).setScrollFactor(0, 0).setAlpha(0.3).setVisible(false);

    // END HEADER

    // LEFT BOTTOM ITEMS
    const item_dis = 60;
    const item_x = 60
    const item_r = 45
    const shrink = this.add.sprite(item_x, h - item_dis, 'shrink').setDisplaySize(item_r, item_r).setScrollFactor(0, 0).setInteractive().setDepth(100).setOrigin(1, 0.5);
    this.addItemText(shrink.x, shrink.y, ITEM.shrink, "light");
    
    const power = this.add.sprite(item_x, h - item_dis * 2, 'power').setDisplaySize(item_r, item_r).setScrollFactor(0, 0).setInteractive().setDepth(100).setOrigin(1, 0.5);
    this.addItemText(power.x, power.y, ITEM.power, "light");

    const magnify = this.add.sprite(item_x, h - item_dis * 3, 'magnify').setDisplaySize(item_r, item_r).setScrollFactor(0, 0).setInteractive().setDepth(100).setOrigin(1, 0.5);
    this.addItemText(magnify.x, magnify.y, ITEM.magnify, "light");
    
    const heart = this.add.sprite( item_x, h - item_dis * 4, 'heart').setDisplaySize(item_r, item_r).setScrollFactor(0, 0).setInteractive().setDepth(100).setOrigin(1, 0.5);
    this.addItemText(heart.x, heart.y, ITEM.heart, "light");
    shrink.on('pointerup', () => {
      if(STATUS.shrink || GAME.light < ITEM.shrink) return;
      GAME.light -= ITEM.shrink;
      STATUS.shrink = true;

      this.addItemEffect("shrink", 60 * 1000);
      this.setTopHeader()
    })
    power.on('pointerup', () => {
      if(STATUS.power || GAME.light < ITEM.power) return;
      GAME.light -= ITEM.power;
      STATUS.power = true;

      this.addItemEffect("power", 60 * 1000);
      this.setTopHeader()
    })
    magnify.on('pointerup', () => {
      if(STATUS.magnify || GAME.light < ITEM.magnify) return;
      GAME.light -= ITEM.magnify;
      STATUS.magnify = true;

      this.addItemEffect("magnify", 60 * 1000);
      this.setTopHeader()
    })
    heart.on('pointerup', () => {
      if(GAME.light < ITEM.heart) return;
      GAME.light -= ITEM.heart;
      GAME.ball++;
      this.setTopHeader()
    })
    // END LEFT BOTTOM ITEMS

    // POP UP TEXTS
    this.popUpTexts = {};
    this.popUpTexts["ring"] = this.add.text(w / 2, h / 2 - 100, '+12', {
      fontFamily: "TitanOne-Regular",
      fontSize: "45px",
      color: "#000",
    })
    .setOrigin(0.5, 0.5).setScrollFactor(0, 0).setAlpha(0);

    this.popUpTexts["direct_ring"] = this.add.text(w / 2, h / 2 - 150, 'SWISH X 2', {
      fontFamily: "TitanOne-Regular",
      fontSize: "35px",
      color: "#f08827",
    }).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setAlpha(0);

    this.popUpTexts["level"] = this.add.text(w / 2, h / 2 + 100, 'LEVEL 2 UNLOCKED', {
      fontFamily: "TitanOne-Regular",
      fontSize: "35px",
      color: "#fed957",
    }).setOrigin(0.5, 0.5).setScrollFactor(0, 0).setAlpha(0);
    // END POP UP TEXTS
    // GAME


    this.ball = this.physics.add.sprite(0.2 * w, 0.4 * h, 'ball')
    .setDisplaySize(ballR, ballR)
    .setOrigin(0.5, 0.5)
    .setCircle(this.textures.get("ball").getSourceImage().width / 2)
    .setBounce(1, 1)
    .setPushable(true).setDepth(10);
    

    this.emitter = this.add.particles(0, 0, 'fx', {
      tint: 0xdddddd,
      alpha: { start: 0.8, end: 0 },
      scale: { start: 0.15, end: 0.21 },
      speed: {random: [1, 5] },
      accelerationY:  {random: [-10, 20] },
      rotate: { min: -180, max: 180 },
      frequency: 100,
    })
    this.emitter.start(1, 0)
    this.emitter.startFollow(this.ball, 0, 0, true)

    // this.snowEmitter = this.add.particles(150, h / 2, 'snow', {
    //   alpha: { start: 0.8, end: 1 },
    //   scale: { start: 0.05, end: 0.1 },
    //   speed: {random: [50, 70] },
    //   accelerationY:  {random: [-10, 20] },
    //   rotate: { min: -180, max: 180 },
    //   frequency: 20,
    //   maxParticles: 30
    // })
    // this.snowEmitter.stop();

    this.wings = [];
    this.wings.push(
      this.physics.add.sprite(0, 0, 'wing').setOrigin(0.8, 1).setDisplaySize(wingR, wingR).setAngle(30).setDepth(9)
    )
    this.wings.push(
      this.add.sprite(0, 0, 'wing').setOrigin(1.3, 1).setDisplaySize(wingR, wingR).setAngle(30).setDepth(11)
    )

    this.ballGroup = this.add.group();
    this.ballGroup.add(this.wings[0]);
    this.ballGroup.add(this.wings[1]);


    this.additionalSpriteOne.setInteractive();
    this.additionalSpriteOne1.setInteractive();
    this.additionalSpriteOne2.setInteractive();

    this.tileBg.setInteractive()
    this.tileBg.on('pointerdown', () => {
      this.setBallAction();
    })

    this.additionalSpriteOne.on('pointerdown', (pointer) => {
      this.setBallAction();
    });
    this.additionalSpriteOne1.on('pointerdown', (pointer) => {
      this.setBallAction();
    });
    this.additionalSpriteOne2.on('pointerdown', (pointer) => {
      this.setBallAction();
    });

    this.cameras.main.startFollow(this.ball, false, 1, 0, -0.1 * w, -0.1 * h);

    this.initGame();
  }

  setBallAction() {
    this.wings.forEach(wing => {
      wing.setAngle(50);
      this.tweens.add({
        targets: wing,
        duration: 200,
        rotation: 0,
        repeat: 0,
      })
    });

    this.ball.setGravityY(1700);
    this.ball.setVelocityY(-500);
    this.ball.setVelocityX(120);

    this.jump.play();
  }

  initObstacle() {
    lastPos.id++;

    const isLevelUp = lastPos.id % 5 == 0;
    // LEVEL PART OBSTACLE

    let obstacle_dis = 400;
    let obstacle_anlge = 0;
    let width = 200;

    if(GAME.level < 5) {
      obstacle_dis = 200;
      width = 250;
      obstacle_anlge = 0;
    } else if(GAME.level < 10) {
      obstacle_dis = 400;
      width = 200;
      obstacle_anlge = 40;
    } else {
      obstacle_dis = 400;
      width = 180;
      obstacle_anlge = 90;
    }

    // END LEVEL PART OBSTACLE

    if(this.obstacles.length > 0) {
      const lastObj = this.obstacles[this.obstacles.length - 1];
      lastPos.x = lastObj.getChildren()[0].x + width;
    }
    // lastPos.x += width;
    lastPos.y = (0.5 - Math.random()) * obstacle_dis + mH
    const id = lastPos.id;
    const x = lastPos.x, y = lastPos.y;
    const angle = -obstacle_anlge * (0.5 - Math.random());
    const isMove = true;

    const sizeRate = STATUS.magnify? 1.3 : 1;
    const objW = 100 * sizeRate;
    const objH = 60 * sizeRate;
    const radius = objH / 1.8;
    const top = this.add.sprite(x, y, 'hoop_t').setOrigin(0.5, 1).setDisplaySize(objW, objH / 2).setDepth(8).setAngle(angle)
    const down = this.add.sprite(x, y, 'hoop_d').setOrigin(0.5, 0).setDisplaySize(objW, objH / 2).setDepth(12).setAngle(angle)

    if(isLevelUp) {
      top.setTint(0x00ff00)
      down.setTint(0x00ff00)
    }

    const lb = this.physics.add.sprite(x + radius * sizeRate * Math.cos(angle * Math.PI / 180), y + radius * sizeRate * Math.sin(angle * Math.PI / 180), 'ball').setOrigin(0.5, 0.5)
      .setDisplaySize(10, 10)
      .setCircle(this.textures.get("ball").getSourceImage().width / 2)
      .setPushable(false)
      .setVisible(false)
      lb.angle = angle;
      lb.radius = radius;

    
    const rb = this.physics.add.sprite(x - radius * sizeRate * Math.cos(angle * Math.PI / 180), y - radius * sizeRate * Math.sin(angle * Math.PI / 180), 'ball').setOrigin(0.5, 0.5)
      .setDisplaySize(10, 10)
      .setCircle(this.textures.get("ball").getSourceImage().width / 2)
      .setPushable(false)
      .setVisible(false)
      rb.angle = angle;
      rb.radius = radius;

    const tb = this.physics.add.sprite(x + radius * Math.cos(angle * Math.PI / 180 + Math.PI / 2), y + radius * Math.sin(angle * Math.PI / 180 + Math.PI / 2), 'ball').setOrigin(0.5, 0.5)
      .setDisplaySize(30, 30)
      .setCircle(this.textures.get("ball").getSourceImage().width / 2)
      .setPushable(false)
      .setVisible(false)
    
    const db = this.physics.add.sprite(x - radius * Math.cos(angle * Math.PI / 180 + Math.PI / 2), y - radius * Math.sin(angle * Math.PI / 180 + Math.PI / 2), 'ball').setOrigin(0.5, 0.5)
      .setDisplaySize(30, 30)
      .setCircle(this.textures.get("ball").getSourceImage().width / 2)
      .setPushable(false)
      .setVisible(false)

    const last = this.physics.add.sprite(x + objW / 1.5, y, 'ball').setOrigin(0.5, 0.5)
      .setDisplaySize(10, 2 * h)
      .setPushable(false)
      .setVisible(false)
    
    const last_bottom = this.physics.add.sprite(x, h, 'ball').setOrigin(1, 0.5)
      .setDisplaySize(w * 0.9, 60)
      .setPushable(false)
      .setVisible(false)
    const group = this.add.group();
    group.add(top);
    group.add(down);
    group.add(lb);
    group.add(rb);
    group.add(tb);
    group.add(db);
    group.add(last);
    group.add(last_bottom);
    group.id = id;
    // Collider PART

    const col_l = this.physics.add.collider(this.ball, lb, () => { 
      HIT_STATUS.COLLIDER = true;
      GAME.sequence = 0;
      this.emitter.stop()
      this.ball.setAngularVelocity(200 + 450 * (0.5 - Math.random()))

    });
    const col_r = this.physics.add.collider(this.ball, rb, () => {
      HIT_STATUS.COLLIDER = true;
      GAME.sequence = 0;
      this.emitter.stop()
      this.ball.setAngularVelocity(-200 - 450 * (0.5 - Math.random()))
    });

    // LOSE HEART PART
    const col_last = this.physics.add.overlap(this.ball, last, () => {
      if(!HIT_STATUS.DOWN || !HIT_STATUS.TOP) {
        this.physics.world.removeCollider(col_l);
        this.physics.world.removeCollider(col_r);
        this.physics.world.removeCollider(col_last);
        this.physics.world.removeCollider(col_last_b);
        this.physics.world.removeCollider(col_tb);
        this.physics.world.removeCollider(col_db);
        this.removeObstacle(group);
        lastPos.ballPos.x = x;
        lastPos.ballPos.y = y;
        this.loseLife();
      }
      HIT_STATUS.DOWN = false;
      HIT_STATUS.TOP = false;
      HIT_STATUS.COLLIDER = false;
    })

    const col_last_b = this.physics.add.overlap(this.ball, last_bottom, () => {
      if(!HIT_STATUS.DOWN || !HIT_STATUS.TOP) {
        this.physics.world.removeCollider(col_l);
        this.physics.world.removeCollider(col_r);
        this.physics.world.removeCollider(col_last);
        this.physics.world.removeCollider(col_last_b);
        this.physics.world.removeCollider(col_tb);
        this.physics.world.removeCollider(col_db);
        this.removeObstacle(group);
        lastPos.ballPos.x = x;
        lastPos.ballPos.y = y;
        this.loseLife();
      }
      HIT_STATUS.DOWN = false;
      HIT_STATUS.TOP = false;
      HIT_STATUS.COLLIDER = false;
    })

    const col_db = this.physics.add.overlap(this.ball, db, () => {
      console.log("HIT TOP")
      if(!HIT_STATUS.DOWN)
        HIT_STATUS.TOP = true;
    }, null, this)

    // RING SUCCESS....
    const col_tb = this.physics.add.overlap(this.ball, tb, () => {
      console.log("HIT DOWN", HIT_STATUS)
      // if(!HIT_STATUS.TOP) {
      //   HIT_STATUS.DOWN = true;
      // }
      if(!HIT_STATUS.DOWN && HIT_STATUS.TOP) {
        console.log("CHANGE OBSTACLE")
        HIT_STATUS.DOWN = true;
        this.physics.world.removeCollider(col_l);
        this.physics.world.removeCollider(col_r);
        this.physics.world.removeCollider(col_last);
        this.physics.world.removeCollider(col_last_b);
        this.physics.world.removeCollider(col_tb);
        this.physics.world.removeCollider(col_db);
        this.removeObstacle(group);
        
        if(!HIT_STATUS.COLLIDER) {
          GAME.sequence++;
          this.emitter.start(1, 0)
          const part = this.add.particles(x, y, 'snow', {
            alpha: { start: 0.8, end: 1 },
            scale: { start: 0.05, end: 0.1 },
            speed: {random: [50, 70] },
            accelerationY:  {random: [-10, 20] },
            rotate: { min: -180, max: 180 },
            frequency: 20,
            maxParticles: 30,
          })
          this.time.delayedCall(
            1000,
            () => {
              part.stop(true)
            },
            null,
            this
          );
        }

        const addRing = (GAME.sequence < 1? 1 : (GAME.sequence) * 2) * (STATUS.power? 2 : 1)

        GAME.passRing += addRing;
        if(!HIT_STATUS.COLLIDER && GAME.sequence > 0){
          this.addPopupText("direct_ring", addRing)
          this.swish.play();
        } else {
          this.addPopupText("ring", addRing)
          this.point.play()
        }

        if(isLevelUp) {
          GAME.level++;
          this.addPopupText("level", GAME.level);
          this.levelup.play();
        }
        this.setTopHeader();
      }


    }, null, this)



    // ITEM INIT (percent)
    this.items.push(
      this.initItem(x, y)
    )

    // MOVE OBSTACLE...
    if(isMove) {
      // const tw = this.tweens.add({
      //   targets: group.getChildren(),
      //   x : x,
      //   y : y + 100,
      //   duration: 2000,
      //   onComplete: () => {
      //     this.tweens.add({
      //       targets: group.getChildren(),
      //       x : x,
      //       y : y,
      //       duration: 2000,
      //       onComplete: () => {
              
      //       },
      //       callbackScope: this,
      //     })
      //   },
      //   callbackScope: this,
      // })
    }

    return group;
  }

  initItem(x, y) {
    x += (0.5 - Math.random()) * 300;
    y += (0.5 - Math.random()) * 300;
    // const type = (Math.random() < 0.5)? "light" : "coin"
    const type = "light";
    const item = this.physics.add.sprite(x, y, type).setDisplaySize(40, 40)
    const col = this.physics.add.overlap(this.ball, item, () => {
      if(type == "light") {
        this.item_light.play();
        GAME.light += STATUS.power? 2 : 1;
      } else if(type == "coin") {
        this.item_coin.play();
        GAME.coin += STATUS.power? 2 : 1;
      }
      this.setTopHeader()
      this.physics.world.removeCollider(col);
      item.destroy(true);

    }, null, this)
    return item;
  }

  addItemText(x, y, text, type) {
    const itemW = 32;
    this.add.graphics()
    .fillStyle(0x000000, 0.6) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
    .fillRect(x - 15, y + 5, itemW, 15)
    .setScrollFactor(0, 0).setDepth(101)
    this.add.sprite(x - 15, y + 5, type).setOrigin(0, 0).setDisplaySize(15, 15).setScrollFactor(0, 0).setDepth(102);
    this.add.text(x, y + 5, text).setStyle({
      fontFamily: "TitanOne-Regular",
      fontSize: "13px",
      color: "#fff",
    }).setScrollFactor(0, 0).setDepth(102)
  }

  addPopupText(type, val) {
    if(type == "ring") {
      this.popUpTexts[type].setText(`+${val}`)
      this.popUpTexts[type].setScale(0);
      this.tweens.add({
        targets: this.popUpTexts[type],
        scaleX: 1,
        scaleY: 1,
        alpha: 1,
        duration: 800,
        ease: 'Bounce',
      });
    } else if(type == "direct_ring") {
      this.popUpTexts["ring"].setText(`+${val}`)
      this.popUpTexts["ring"].setScale(0);
      this.tweens.add({
        targets: this.popUpTexts["ring"],
        scaleX: 1,
        scaleY: 1,
        alpha: 1,
        duration: 800,
        ease: 'Bounce',
      });

      this.popUpTexts[type].setText(`${GAME.sequence == 1? "PERFECT!" : "COMBO!"}`)
      this.popUpTexts[type].setScale(0);
      this.tweens.add({
        targets: this.popUpTexts[type],
        scaleX: 1,
        scaleY: 1,
        alpha: 1,
        duration: 800,
        ease: 'Bounce',
      });
    } else if(type == "level") {
      this.popUpTexts[type].setText(`LEVEL ${val} UNLOCKED`)
      this.popUpTexts[type].setScale(0);
      this.tweens.add({
        targets: this.popUpTexts[type],
        scaleX: 1,
        scaleY: 1,
        alpha: 1,
        duration: 800,
        ease: 'Bounce',
      });
    }

    this.time.delayedCall(
      1000,
      () => {
        Object.keys(this.popUpTexts).forEach(key => {
          this.popUpTexts[key].setAlpha(0)
        });
      },
      null,
      this
    );
  }

  removeObstacle(obj) {
    const tween = this.tweens.add({
      targets: obj.getChildren(),
      alpha: 0, // Set the desired alpha value
      duration: 150, // Set the duration of the tween in milliseconds
      onComplete: () => {
        console.log("remove")
        const index = this.obstacles.findIndex(item => item.id === obj.id);
        if (index !== -1) {
          const obj1 = this.obstacles.splice(index, 1)[0];
          obj1.clear(true, true)
          obj1.destroy();
        }
    
        this.addObstacle();
          
        HIT_STATUS.DOWN = false;
        HIT_STATUS.TOP = false;
        HIT_STATUS.COLLIDER = false;
    
        GAME.ring++;
      }
      // ease: 'Linear', // Set the easing function
      // repeat: 0, // Set the number of times the tween should repeat (-1 for infinite)
      // yoyo: true // Set whether the tween should reverse back to its original value
    });
    

  }

  private scoreHandler;

  public setScoreHandle(handleScore: any) {
    this.scoreHandler = handleScore;
  }

  public initGame(lives = 3) {
    this.cameras.main.fadeIn(1200);
    GAME.ring = 0;
    GAME.ball = this.params.lives;
    GAME.passRing = this.params.score;
    lastPos.ballPos.x = this.ball.x;
    this.obstacles = [];
    this.items = [];
    
    this.startRound()
  }

  loseGame() {
    this.cameras.main.fadeOut(1000);
    this.scoreHandler(GAME.passRing);

    // game is lost
    //this.initGame();
  }

  loseLife(): void {
    this.die.play();
    GAME.ball--;
    if(GAME.ball <= 0) {
      this.loseGame(); 
      return;
    }
    this.startRound()
  }

  startRound() {
    GAME.level = 1;
    GAME.ring = 1;
    GAME.sequence = 0;
    // GAME.ball = 30;

    lastPos.x = 1 * w;
    lastPos.y = 0.4 * h;
    lastPos.id = 1;
    lastPos.ballPos.x = 0.5 * w;
    lastPos.ballPos.y = 0.4 * h;

    HIT_STATUS.TOP = false;
    HIT_STATUS.DOWN = false;
    HIT_STATUS.COLLIDER = false;
    
    STATUS.magnify = false;
    STATUS.shrink = false;
    STATUS.power = false;

    this.tileBg.tilePositionX = 0;
    this.additionalSpriteOne.setPosition(0, 0)
    this.additionalSpriteOne1.setPosition(this.additionalSpriteOne.x + 1920, 0)
    this.additionalSpriteOne2.setPosition(this.additionalSpriteOne.x - 1920, 0)


    this.obstacles.forEach(obj => {
      obj.clear(true, true);
    });

    this.items.forEach(item => {
      item.destroy(true)
    });

    this.obstacles = [];
    this.items = [];
    
    for(let i = 0; i < 3; i++) {
      this.obstacles.push(
        this.initObstacle()
      ) 
    }

    this.ball.setPosition(lastPos.ballPos.x, 0.4 * h);
    this.ball.setVelocity(0, 0)
    this.ball.setGravityY(0)

    this.setTopHeader();
  }

  addItemEffect(type, during = 4000) {
    if(type == "shrink") {
      this.ball.setCircle(this.textures.get("ball").getSourceImage().width / 2 * 0.7).setDisplaySize(ballR * 0.7, ballR * 0.7)
    }
    if(type == "magnify") {
      this.obstacles.forEach(obstacle => {
        const objArray = obstacle.getChildren();
        const sizeRate = 1.3;
        const x = objArray[0].x;
        const y = objArray[0].y;
        const radius = objArray[2].radius;
        const angle = objArray[2].angle;
        objArray[0].setDisplaySize(100 * sizeRate, 30 * sizeRate);
        objArray[1].setDisplaySize(100 * sizeRate, 30 * sizeRate);
        objArray[2].setPosition(x + radius * sizeRate * Math.cos(angle * Math.PI / 180), y + radius * sizeRate * Math.sin(angle * Math.PI / 180))
        objArray[3].setPosition(x - radius * sizeRate * Math.cos(angle * Math.PI / 180), y - radius * sizeRate * Math.sin(angle * Math.PI / 180));
      });
    }

    if(!!this.leftStatus[type]) {
      this.leftStatus[type].setAlpha(1)
    }

    this.time.delayedCall(during, () => {
      this.initItemEffect(type);
    }, [], this);
  }

  initItemEffect(type) {
    if(type == "shrink") {
      this.ball.setCircle(this.textures.get("ball").getSourceImage().width / 2).setDisplaySize(ballR, ballR)
      STATUS.shrink = false;
    }
    if(type == "magnify") {
      this.obstacles.forEach(obstacle => {
        const objArray = obstacle.getChildren();
        const sizeRate = 1;
        const x = objArray[0].x;
        const y = objArray[0].y;
        const radius = objArray[2].radius;
        const angle = objArray[2].angle;
        objArray[0].setDisplaySize(100 * sizeRate, 30 * sizeRate);
        objArray[1].setDisplaySize(100 * sizeRate, 30 * sizeRate);
        objArray[2].setPosition(x + radius * sizeRate * Math.cos(angle * Math.PI / 180), y + radius * sizeRate * Math.sin(angle * Math.PI / 180))
        objArray[3].setPosition(x - radius * sizeRate * Math.cos(angle * Math.PI / 180), y - radius * sizeRate * Math.sin(angle * Math.PI / 180));
      });

      STATUS.magnify = false;
    }

    if(type == "power") {
      STATUS.power = false;
    }

    if(!!this.leftStatus[type]) {
      this.leftStatus[type].setAlpha(0.3)
    }
  }

  addObstacle() {
    if(this.obstacles.length > 10) return;
    this.obstacles.push(
      this.initObstacle()
    )
  }

  setTopHeader() {
    this.levelTxt.setText(GAME.level.toString());
    this.ballTxt.setText(GAME.ball.toString());
    this.lightTxt.setText(GAME.light.toString());
    // this.coinTxt.setText(GAME.coin.toString());
    this.scoreTxt.setText(GAME.passRing.toString());
  }

  setBackgroundPos() {

    if(this.ball.x > this.additionalSpriteOne.x + 900) {

      this.additionalSpriteOne1.setPosition(this.additionalSpriteOne.x, 0);
      this.additionalSpriteOne.setPosition(this.additionalSpriteOne.x + 1920, 0);
      this.additionalSpriteOne2.setPosition(this.additionalSpriteOne.x + 2 * 1920, 0);

      // this.logo.setPosition(this.additionalSpriteOne.x + 200, this.additionalSpriteOne.y + mH + 110 * h / 663);
    }

    this.tileBg.tilePositionX += this.ball.body.velocity.x * 0.002;

  }

  checkObstacle() {
    const x = this.obstacles[0].x
  }

  private lastangle = 0;
  update(time, delta) {
    const deltaangle = this.ball.angle - this.lastangle;
    this.ballGroup.setXY(this.ball.x, this.ball.y);
    this.ballGroup.angle(deltaangle)
    this.setBackgroundPos()

    this.lastangle = this.ball.angle;

  }

}

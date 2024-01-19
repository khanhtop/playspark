import Phaser from "phaser";

let w: number,
  h: number,
  mW: number,
  mH: number,
  scr: number,
  wingR: number,
  ballR: number;

let startPos = {
  x: 0, y :0
}

let HIT_STATUS = {
  TOP: false,
  DOWN: false
}

let gameType = "football";

export default class FlyBallScene extends Phaser.Scene {
  public static instance: FlyBallScene;
  private params: any;
  bg: Phaser.Physics.Arcade.Sprite;
  bg1: Phaser.GameObjects.Sprite;
  bg2: Phaser.GameObjects.Sprite;
  levelTxt: any;
  ballTxt: any;
  lightTxt: any;
  coinTxt: any;
  ball: Phaser.Physics.Arcade.Sprite;
  ballGroup: Phaser.GameObjects.Group;
  hoop: Phaser.Physics.Arcade.StaticGroup;
  wings: Phaser.GameObjects.Sprite[];
  obstacles: any;
  ballSpeed: any;

  constructor(newGameType: string, newParams: any) {
    super();
    FlyBallScene.instance = this;
    gameType = newGameType;
    this.params = newParams;
  }

  preload() {

    this.load.image("wing", "/pong/" + gameType + "/wing/Wing.png");
    // this.load.image("bombEffect", "/pong/" + gameType + "/bomb-effect.png");
    this.load.image("levelBoard", "/pong/" + gameType + "/UI/level.png");
    this.load.image("item_heart", "/pong/" + gameType + "/UI/heart.png");
    this.load.image("light", "/pong/" + gameType + "/UI/light.png");
    this.load.image("coin", "/pong/" + gameType + "/UI/coin.png");
    this.load.image("btn_m", "/pong/" + gameType + "/UI/btn_m.png");
    this.load.image("btn_l", "/pong/" + gameType + "/UI/btn_l.png");
    this.load.image("header", "/pong/" + gameType + "/UI/header.png");

    this.load.image("hoop_t", "/pong/" + gameType + "/UI/hoop_t.png");
    this.load.image("hoop_d", "/pong/" + gameType + "/UI/hoop_d.png");

    this.load.image("bg", "/pong/" + gameType + "/background/bg1.jpg");

    this.load.image("ball", "/pong/" + gameType + "/ball/ball1.png");


    this.load.image("ball", "/pong/" + gameType + "/ball.png");
    this.load.image("peck", "/pong/" + gameType + "/player-static-catch.png");
    //this.load.image('bgGls', '/pong' + gameType + 'n/bgGoals.png');
    this.load.image("heart", "/pong/" + gameType + "/heart.png");
    this.load.image("score", "/pong/" + gameType + "/score.png");

    this.load.image("middleAd", "/pong/" + gameType + "/middleAd.png");



    w = this.game.canvas.clientWidth;
    h = this.game.canvas.clientHeight;
    ballR = 40;
    wingR = 25;
    scr = h * 0.08;
    mW = w / 2;
    mH = (h - scr) / 2 + scr;
    this.ballSpeed = 0;
  }

  // 400 800

  create() {

    this.physics.config.debug = true;

    this.bg = this.physics.add.sprite(0, 0, "bg").setOrigin(0).setDisplaySize(1920, h).setPosition(100, 0);
    this.bg1 = this.add.sprite(0, 0, "bg").setOrigin(0).setDisplaySize(1920, h).setPosition(this.bg.x + 1920, 0).setFlipX(true);
    this.bg2 = this.add.sprite(0, 0, "bg").setOrigin(0).setDisplaySize(1920, h).setPosition(this.bg.x - 1920, 0).setFlipX(true);

    this.add.image(mW, mH, "middleAd").setDisplaySize(50, 50).setAlpha(0);

    // GAME HEADER
    const topOffset = 60;
    const leftOffset = 20;
    // LEVEL HEADER
    this.add.sprite(60 - leftOffset, topOffset, 'levelBoard').setDisplaySize(70, 70).setOrigin(0.5, 0.5)
    this.add
    .text(60 - leftOffset, topOffset - 10, "LEVEL", {
      fontFamily: "TitanOne-Regular",
      fontSize: "15px",
      color: "#fff",
    })
    .setOrigin(0.5, 0.5);
    this.levelTxt = this.add
    .text(60 - leftOffset, topOffset + 10, "2", {
      fontFamily: "TitanOne-Regular",
      fontSize: "20px",
      color: "#fff",
    })
    .setOrigin(0.5, 0.5);
    const headerW = w * 0.25;
    this.add.sprite(headerW * 0.5 + 80, topOffset, 'header').setOrigin(0.5, 0.5).setDisplaySize(headerW, 40);
    this.add.sprite(90, topOffset - 5, 'ball' ).setOrigin(0, 0.5).setDisplaySize(25, 25)
    this.ballTxt = this.add
    .text(120, topOffset - 5, "2", {
      fontFamily: "TitanOne-Regular",
      fontSize: "18px",
      color: "#000",
    }).setOrigin(0, 0.5)

    this.add.sprite(headerW * 1.5 + 80, topOffset, 'header').setOrigin(0.5, 0.5).setDisplaySize(headerW, 40);
    this.add.sprite(headerW + 90, topOffset - 5, 'light' ).setOrigin(0, 0.5).setDisplaySize(25, 25)
    this.ballTxt = this.add
    .text(headerW + 120, topOffset - 5, "2", {
      fontFamily: "TitanOne-Regular",
      fontSize: "18px",
      color: "#000",
    }).setOrigin(0, 0.5)

    this.add.sprite(headerW * 2.5 + 80, topOffset, 'header').setOrigin(0.5, 0.5).setDisplaySize(headerW, 40);
    this.add.sprite(headerW * 2 + 90, topOffset - 5, 'coin' ).setOrigin(0, 0.5).setDisplaySize(25, 25)
    this.ballTxt = this.add
    .text(headerW * 2 + 120, topOffset - 5, "2", {
      fontFamily: "TitanOne-Regular",
      fontSize: "18px",
      color: "#000",
    }).setOrigin(0, 0.5)

    // END HEADER

    // GAME

    this.ball = this.physics.add.sprite(0.2 * w, 0.4 * h, 'ball')
    .setDisplaySize(ballR, ballR)
    .setOrigin(0.5, 0.5)
    .setCircle(this.textures.get("ball").getSourceImage().width / 2)
    .setPushable(true).setDepth(10);

    this.wings = [];
    this.wings.push(
      this.add.sprite(0, 0, 'wing').setOrigin(0.8, 1).setDisplaySize(wingR, wingR).setAngle(30).setDepth(9)
    )
    this.wings.push(
      this.add.sprite(0, 0, 'wing').setOrigin(1.3, 1).setDisplaySize(wingR, wingR).setAngle(30).setDepth(11)
    )

    this.ballGroup = this.add.group();
    // this.ballGroup.add(this.ball);
    this.ballGroup.add(this.wings[0]);
    this.ballGroup.add(this.wings[1]);

    this.obstacles = [];

    this.obstacles.push(
      this.initObstacle()
    ) 


    this.bg.setInteractive();

    // Event listener for pointer down event
    this.bg.on('pointerdown', (pointer) => {
      this.setBallAction();
      this.setBackgroundAction()

    });

    // Event listener for pointer up event
    this.bg.on('pointerup', (pointer) => {

      const endX = pointer.x;
      const endY = pointer.y;
      console.log("booster up------",endX, "  ", endY)

    });


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

    this.ball.setGravityY(700);
    this.ball.setVelocityY(-300)
  }

  setBackgroundAction() {
    this.bg.setVelocityX(-100);
    this.obstacles.forEach(obstacle => {
      obstacle.getChildren().forEach(item => {
        item.setVelocityX(-100)
      })
    })
  }

  initObstacle() {
    const id = 3;
    const x = 180, y = 300;
    const angle = -30;
    const isMove = false;

    const objW = 100;
    const objH = 60;
    const radius = objH / 1.8;

    const top = this.physics.add.sprite(x, y, 'hoop_t').setOrigin(0.5, 1).setDisplaySize(objW, objH / 2).setDepth(8).setAngle(angle)
    const down = this.physics.add.sprite(x, y, 'hoop_d').setOrigin(0.5, 0).setDisplaySize(objW, objH / 2).setDepth(12).setAngle(angle)

    const lb = this.physics.add.sprite(x + radius * Math.cos(angle * Math.PI / 180), y + radius * Math.sin(angle * Math.PI / 180), 'ball').setOrigin(0.5, 0.5)
      .setDisplaySize(10, 10)
      .setCircle(this.textures.get("ball").getSourceImage().width / 2)
      .setPushable(false)
    
    const rb = this.physics.add.sprite(x - radius * Math.cos(angle * Math.PI / 180), y - radius * Math.sin(angle * Math.PI / 180), 'ball').setOrigin(0.5, 0.5)
      .setDisplaySize(10, 10)
      .setCircle(this.textures.get("ball").getSourceImage().width / 2)
      .setPushable(false)

    const tb = this.physics.add.sprite(x + radius * Math.cos(angle * Math.PI / 180 + Math.PI / 2), y + radius * Math.sin(angle * Math.PI / 180 + Math.PI / 2), 'ball').setOrigin(0.5, 0.5)
      .setDisplaySize(10, 10)
      .setCircle(this.textures.get("ball").getSourceImage().width / 2)
      .setPushable(false)
    
    const db = this.physics.add.sprite(x - radius * Math.cos(angle * Math.PI / 180 + Math.PI / 2), y - radius * Math.sin(angle * Math.PI / 180 + Math.PI / 2), 'ball').setOrigin(0.5, 0.5)
      .setDisplaySize(10, 10)
      .setCircle(this.textures.get("ball").getSourceImage().width / 2)
      .setPushable(false)



    const group = this.add.group();
    group.add(top);
    group.add(down);
    group.add(lb);
    group.add(rb);
    group.add(tb);
    group.add(db);
    group.id = id;
    // Collider PART

    const reflect = 15
    this.physics.add.collider(this.ball, lb, () => {
      this.bg.setVelocityX(reflect);
      this.obstacles.forEach(obstacle => {
        obstacle.getChildren().forEach(item => {
          item.setVelocityX(reflect)
        })
      })
    }, null, this)


    this.physics.add.collider(this.ball, rb, () => {
      this.bg.setVelocityX(reflect);
      this.obstacles.forEach(obstacle => {
        obstacle.getChildren().forEach(item => {
          item.setVelocityX(reflect)
        })
      })
    }, null, this)

    this.physics.add.overlap(this.ball, db, () => {
      console.log("HIT TOP")
      if(!HIT_STATUS.DOWN)
        HIT_STATUS.TOP = true;
    }, null, this)

    this.physics.add.overlap(this.ball, tb, () => {
      console.log("HIT DOWN", HIT_STATUS)

      if(!HIT_STATUS.DOWN && HIT_STATUS.TOP) {
        console.log("CHANGE OBSTACLE")
        HIT_STATUS.DOWN = true;
        this.removeObstacle(group);
      }

    }, null, this)

    return group;
  }

  removeObstacle(obj) {
    const tween = this.tweens.add({
      targets: obj.getChildren(),
      alpha: 0, // Set the desired alpha value
      duration: 1000, // Set the duration of the tween in milliseconds
      onComplete: () => {
          console.log("remove")

          const index = this.obstacles.findIndex(item => item.id === obj.id);
          if (index !== -1) {
            const obj1 = this.obstacles.splice(index, 1)[0];
            obj1.getChildren().forEach(element => {
              element.destroy()
            });
            obj1.destroy();

          }

      }
      // ease: 'Linear', // Set the easing function
      // repeat: 0, // Set the number of times the tween should repeat (-1 for infinite)
      // yoyo: true // Set whether the tween should reverse back to its original value
    });
    
    // Start the tween
    tween.play();
  }

  private scoreNum = 0;
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
    this.scoreHandler(this.scoreNum);

    // game is lost
    //this.initGame();
  }

  loseLife(): boolean {
    return true
  }

  startRound() {

  }

  setBackgroundPos() {

    if(this.bg.x < - 1918) {
      this.bg.setPosition(0, 0).setFlipX(true);
      this.bg1.setFlipX(true);
      this.bg2.setFlipX(true);
    } else {
      this.bg1.setPosition(this.bg.x - 1918, 0);
      this.bg2.setPosition(this.bg.x + 1918, 0);
    }

  }

  update(time, delta) {
    this.ballGroup.setXY(this.ball.x, this.ball.y)
    this.setBackgroundPos()
  }

}

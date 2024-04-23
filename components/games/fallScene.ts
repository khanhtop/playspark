import Phaser from "phaser";

let w: number,
  h: number,
  mW: number,
  mH: number,
  ballR: number,
  playerR: number,
  playerW: number,
  playerH: number,
  playerColliderR: number,
  isStatic: boolean,
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
  heartR: number,
  distance: number,
  speed: number,
  deltaSpeed: number,
  deltaBomb: number,
  boosterNum: number,
  boosterBat: number,
  throwSpeed: number,
  heartNum: number,
  comboNum: number,
  deltaDistance: number;

let gameType = "football";

export default class FallScene extends Phaser.Scene {
  public static instance: FallScene;
  private ball!: Phaser.Physics.Arcade.Image;
  private player!: Phaser.Physics.Arcade.Sprite;
  private params: any;
  private ai!: Phaser.Physics.Arcade.Image;
  private lastBall!: Phaser.Physics.Arcade.Image;
  load: any;
  game: any;
  sound: any;
  physics: any;
  add: any;
  fallBall: any;
  textures: any;
  input: any;
  tweens: any;
  cameras: any;
  bombSprite: any;
  bg: any;
  boosterGroup: any;
  lifeNumText: any;
  lifeup: any;
  booster: any;
  bomb: any;
  powerup: any;
  staticBonusScreen: any;
  timer: NodeJS.Timeout;

  constructor(newGameType: string, newParams: any) {
    super();
    FallScene.instance = this;
    gameType = newGameType;
    this.params = newParams;
  }

  preload() {

    this.load.image("bomb", "/pong/" + gameType + "/bomb.png");
    // this.load.image("bombEffect", "/pong/" + gameType + "/bomb-effect.png");
    this.load.image("boosterBall", "/pong/" + gameType + "/booster-ball.png");
    this.load.image("boosterBat", "/pong/" + gameType + "/booster-bat.png");
    this.load.image("boosterBatNum", "/pong/" + gameType + "/booster-bat.png");
    this.load.spritesheet('bombEffect', "/pong/" + gameType + "/bomb-effect.png", { frameWidth: 200, frameHeight: 200 });
    this.load.spritesheet('playerAnim', "/pong/" + gameType + "/player-animation.png", { frameWidth: 180, frameHeight: 300 });

    this.load.image("ball", "/pong/" + gameType + "/ball.png");
    this.load.image("peck", "/pong/" + gameType + "/player-static-catch.png");
    this.load.image("bg", "/pong/" + gameType + "/bg.png");
    //this.load.image('bgGls', '/pong' + gameType + 'n/bgGoals.png');
    this.load.image("heart", "/pong/" + gameType + "/heart.png");
    this.load.image("score", "/pong/" + gameType + "/score.png");

    this.load.image("middleAd", "/pong/" + gameType + "/middleAd.png");

    this.load.audio("bg", this.params.backgroundMusic ?? ("/pong/" + gameType + "/sfx/bgNoise.mp3"));
    this.load.audio("whistle", "/pong/" + gameType + "/sfx/startWhistle.mp3");
    this.load.audio("ballHit", "/pong/" + gameType + "/sfx/ballHit.mp3");
    this.load.audio("goal", "/pong/" + gameType + "/sfx/goalScored.mp3");
    this.load.audio("lost", "/pong/" + gameType + "/sfx/goalConceded.mp3");
    this.load.audio("final", "/pong/" + gameType + "/sfx/finalWhistle.mp3");
    this.load.audio("loselife", "/pong/" + gameType + "/sfx/loseLife.mp3");
    this.load.audio("lifeup", "/pong/" + gameType + "/sfx/lifeup.mp3");
    this.load.audio("booster", "/pong/" + gameType + "/sfx/booster.mp3");
    this.load.audio("bomb", "/pong/" + gameType + "/sfx/bomb.mp3");
    this.load.audio("powerup", "/pong/" + gameType + "/sfx/powerup.mp3");

    w = this.game.canvas.clientWidth;
    h = this.game.canvas.clientHeight;
    ballR = w * 0.1;
    playerR = w * 0.3;
    playerW = w * 0.3 * 0.6;
    playerH = w * 0.3
    playerColliderR = playerR / 2;
    scr = h * 0.08;
    mW = w / 2;
    mH = (h - scr) / 2 + scr;
    goalH = h * 0.1;
    sideW = w * 0.01;
    boundW = w - 2 * sideW;
    boundH = h - scr - 2 * goalH;
    ballVY = h * 0.5;
    ballVX = w * 0.75;
    collW = w * 0.2;
    scrW = w * 0.4;
    scrH = w * 0.175 / 1.614;
    heartR = w * 0.0625;
    distance = 500;
    speed = 200;
    deltaSpeed = 15;
    deltaDistance = 15;
    deltaBomb = 0.1;
    boosterNum = 0;
    boosterBat = 0;
    throwSpeed = 500;
    heartNum = this.params.lives;
    comboNum = 0;
    isStatic = false;
  }

  // 400 800

  private gr: Phaser.Physics.Arcade.StaticGroup;

  private whistle: any;
  private ballHit: any;
  private final: any;
  private goal: any;
  private lost: any;
  private lose: any;
  private fallBallList: any;
  private currentAnim: any;

  create() {
    this.sound.add("bg").setVolume(0.3).setLoop(true).play();
    this.whistle = this.sound.add("whistle");
    this.ballHit = this.sound.add("ballHit");
    this.final = this.sound.add("final");
    this.goal = this.sound.add("goal");
    this.lost = this.sound.add("lost");
    this.lose = this.sound.add("loselife");
    this.lifeup = this.sound.add("lifeup");
    this.booster = this.sound.add("booster");
    this.bomb = this.sound.add("bomb").setVolume(1.3);
    this.powerup = this.sound.add("powerup");

    this.physics.world.setBounds(
      sideW,
      scr + goalH,
      boundW,
      boundH,
      true,
      true,
      false,
      false
    );
    this.bg = this.add.image(0, 0, "bg").setOrigin(0).setDisplaySize(w, h);
    this.add.image(mW, mH, "middleAd").setDisplaySize(50, 50).setAlpha(0);
    this.add.graphics()
    .fillStyle(0x000000, 0.5) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
    .fillRect(0, 0, this.cameras.main.width, 75)

    this.fallBallList = [];

    this.add.image(mW, 37, "score").setDisplaySize(scrW, scrH);

    this.boosterGroup = this.add.group();


    this.bg.setInteractive();

    // Variables to track the flick gesture
    let startX;
    let startY;

    // Event listener for pointer down event
    this.bg.on('pointerdown', (pointer) => {
      console.log("booster click------", startX, "  ", startY)
      startX = pointer.x;
      startY = pointer.y;
    });

    // Event listener for pointer up event
    this.bg.on('pointerup', (pointer) => {

      const endX = pointer.x;
      const endY = pointer.y;
      console.log("booster up------",endX, "  ", endY)

      // Calculate the distance and angle of the flick gesture
      const distanceX = endX - startX;
      const distanceY = endY - startY;
      const angle = Phaser.Math.Angle.Between(startX, startY, endX, endY);

      console.log("booster up------",distanceY, "  ", distanceX)

      // Check if the flick gesture is upwards
      if (distanceY < 0 ) {
        // Throw the bat upwards
        // this.throwBatUp(angle);
      }
    });

    const frameNames = this.anims.generateFrameNumbers('bombEffect', { start: 0, end: 7 });
    this.anims.create({
      key: 'bombAnimation',
      frames: frameNames,
      frameRate: 10,
      repeat: 0
    });

    // Player Anim init
    const playerIdle = this.anims.generateFrameNumbers('playerAnim', { start: 0, end: 0 });
    this.anims.create({
      key: 'playerIdle',
      frames: playerIdle,
      frameRate: 10,
      repeat: -1
    });

    const playerLeft = this.anims.generateFrameNumbers('playerAnim', { start: 2, end: 3 });
    this.anims.create({
      key: 'playerLeft',
      frames: playerLeft,
      frameRate: 7,
      repeat: -1
    });

    const playerRight = this.anims.generateFrameNumbers('playerAnim', { start: 4, end: 5 });
    this.anims.create({
      key: 'playerRight',
      frames: playerRight,
      frameRate: 7,
      repeat: -1
    });

    const playerStatic = this.anims.generateFrameNumbers('playerAnim', { start: 1, end: 1 });
    this.anims.create({
      key: 'playerStatic',
      frames: playerStatic,
      frameRate: 10,
      repeat: 3
    });

    const playerThrow = this.anims.generateFrameNumbers('playerAnim', { start: 6, end: 7 });
    this.anims.create({
      key: 'playerThrow',
      frames: playerThrow,
      frameRate: 10,
      repeat: 0
    });

    this.currentAnim = 'playerIdle';
    // End Player Anim

    this.player = this.physics.add
      .sprite(mW, h - goalH - playerH / 2, "playerAnim")
      .setDisplaySize(playerW, playerH)
      .setCollideWorldBounds(true)
      .setPushable(false);

    this.player.body.setSize(playerColliderR, playerColliderR, true)

    this.bombSprite = this.add.sprite(-200, 200, 'bombEffect').setDisplaySize(140, 140);

    this.gr = this.physics.add.staticGroup();

    (this.gr.create(mW, mH) as Phaser.Physics.Arcade.Image)
      .setSize(collW, goalH)
      .setOrigin(0)
      .setPosition(sideW, scr)
      .setVisible(false);
    (this.gr.create(mW, mH) as Phaser.Physics.Arcade.Image)
      .setSize(collW, goalH)
      .setOrigin(0)
      .setPosition(w - sideW - collW, scr)
      .setVisible(false);
    (this.gr.create(mW, mH) as Phaser.Physics.Arcade.Image)
      .setSize(collW, goalH)
      .setOrigin(0)
      .setPosition(sideW, h - goalH)
      .setVisible(false);
    (this.gr.create(mW, mH) as Phaser.Physics.Arcade.Image)
      .setSize(collW, goalH)
      .setOrigin(0)
      .setPosition(w - sideW - collW, h - goalH)
      .setVisible(false);

    this.gr.refresh();

    this.player.setInteractive();
    this.input.setDraggable(this.player);

    this.player.on(
      "pointerdown",
      function (pointer) {
        this.player.play('playerStatic')

        // Update the goal position when the mouse button is pressed
        this.goalXPos = Phaser.Math.Clamp(
          pointer.x,
          sideW ,
          w - sideW
        );
        this.goalYPos = Phaser.Math.Clamp(
          pointer.y,
          mH + playerR / 2,
          h - goalH - playerR / 2
        );
        this.isDragging = true;
      },
      this
    );

    this.player.on(
      "drag",
      function (pointer, dragX, dragY) {
        // Update the goal position when the mouse is moving
        this.goalXPos = Phaser.Math.Clamp(
          dragX,
          sideW ,
          w - sideW
        );
        this.goalYPos = Phaser.Math.Clamp(
          dragY,
          mH + playerR / 2,
          h - goalH - playerR / 2
        );
      },
      this
    );

    this.player.on(
      "pointerup",
      function () {
        // Stop dragging and stop the player
        this.isDragging = false;

        this.currentAnim = 'playerIdle'
        this.player.play('playerIdle')
        this.player.setVelocity(0, 0);

        this.throwBatUp(-Math.PI / 2)
      },
      this
    );

    this.player.on('animationcomplete', function (animation, frame) {
      if (animation.key === 'playerThrow') {
        // Play the second animation after the first animation has finished
        this.play('playerStatic');
      }
    });

    // this.add.image(w - 90, 30, "score").setDisplaySize(80, scrH).setOrigin(0, 0.5);
    this.lifeNumText = this.add
    .text(w - 70, 30, heartNum, {
      fontFamily: "enhanced_led_board-7",
      fontSize: "22px",
      color: "#ffffff",
    })
    .setOrigin(0.5, 0.5);

    // this.add.image(10, 30, "score").setDisplaySize(80, scrH).setOrigin(0, 0.5);
    this.add.image(30, 30, "boosterBatNum").setDisplaySize(30, 30);
    this.boostNumText = this.add
    .text(70, 30, "0", {
      fontFamily: "enhanced_led_board-7",
      fontSize: "22px",
      color: "#ffffff",
    })
    .setOrigin(0.5, 0.5);

    this.scoreText = this.add
      .text(mW + 2, 36, "0000", {
        fontFamily: "enhanced_led_board-7",
        fontSize: "26px",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

    this.goalTxt = this.add
      .text(mW, mH - 122, "GOAL!", {
        fontFamily: "TitanOne-Regular",
        fontSize: "40px",
        color: "#345e8e",
        stroke: "#ffffff",
        strokeThickness: 10,
      })
      .setOrigin(0.5, 0.5);

    this.addedScrTxt = this.add
      .text(mW, 126, "+100", {
        fontFamily: "TitanOne-Regular",
        fontSize: "40px",
        color: "#ffffff",
        stroke: "#345e8e",
        strokeThickness: 10,
      })
      .setOrigin(0.5, 0.5);

    this.staticBonusScreen = this.add.group();

    const offsetYY = -80;
    // Inside a scene or game object
    this.staticBonusScreen.add(
      this.add.graphics()
      .fillStyle(0x000000, 0.5) // 0x000000 represents black, and 0.5 represents the transparency (0.0 to 1.0)
      .fillRect(0, 0, this.cameras.main.width, this.cameras.main.height)
    );

    this.staticBonusScreen.add(
      this.add.text(mW, mH - 120 + offsetYY, "Booster Unlocked!", {
        fontFamily: "TitanOne-Regular",
        fontSize: "25px",
        color: "#ffffff",
        stroke: "#345e8e",
      }).setOrigin(0.5, 0.5)
    )

    this.staticBonusScreen.add(
      this.add.sprite(mW - 60, mH + offsetYY, 'boosterBall')
      .setDisplaySize(80, 80)
    )

    this.staticBonusScreen.add(
      this.add.text(mW, mH + offsetYY, "+", {
        fontFamily: "TitanOne-Regular",
        fontSize: "45px",
        color: "#ffffff",
        stroke: "#345e8e",
      }).setOrigin(0.5, 0.5)
    )

    this.staticBonusScreen.add(
      this.add.sprite(mW + 60, mH + offsetYY,'boosterBat')
      .setDisplaySize(80, 80)
    )

    this.staticBonusScreen.add(
      this.add.text(mW, mH + 110 + offsetYY, "Tap your player to\n launch items at the\n bombs to make them\n explode.", {
        fontFamily: "TitanOne-Regular",
        fontSize: "20px",
        color: "#ffffff",
        stroke: "#345e8e",
        align: "center"
      }).setOrigin(0.5, 0.5)
    )

    this.staticBonusScreen.setVisible(false);

    this.cameras.main.postFX.addVignette(0.5, 0.5, 0.975);
    this.cameras.main.postFX
      .addColorMatrix()
      .contrast(1.25)
      .polaroid()
      .brightness(0.9);
    this.player.preFX.addShadow();

    this.initGame();
  }

  private ballDir: number = 1;
  private hearts = [];
  private scoreNum = 0;
  private scoreText: Phaser.GameObjects.Text;
  private boostNumText: Phaser.GameObjects.Text;
  private goalTxt: Phaser.GameObjects.Text;
  private addedScrTxt: Phaser.GameObjects.Text;

  private scoreHandler;

  public setScoreHandle(handleScore: any) {
    this.scoreHandler = handleScore;
  }

  public initGame(lives = 3) {
    this.cameras.main.fadeIn(1200);

    this.goalTxt.setVisible(false);
    this.addedScrTxt.setVisible(false);

    this.goalXPos = mW;
    this.goalYPos = h - goalH - playerR / 2;

    heartNum = this.params.lives;
    this.scoreNum = this.params.score;
    boosterNum = this.params.light ?? 1;
    this.scoreText.text = this.params.score.toString()?.padStart(4, "0");
    this.hearts.forEach((h) => h.destroy);
    this.hearts.length = 0;
    for (let i = 0; i < 1; i++) {
      const heart = this.add
        .image(w - 30 - i * 40, 30, "heart")
        .setDisplaySize(heartR, heartR);
      this.hearts.push(heart);
    }

    this.touches = 0;
    this.scored = false;
    this.isDragging = false;

    this.initFallBall();

    setTimeout(() => this.startRound(), 2500);
  }

  loseGame() {
    this.cameras.main.fadeOut(1000);
    this.lose.play();

    this.scoreHandler(this.scoreNum, null, boosterNum);

    this.player.setVisible(false);
    this.bombSprite.setDisplaySize(150, 150);
    this.playBombEffect(this.player.x, this.player.y)

    // game is lost
    //this.initGame();
  }

  loseLife(): boolean {
    if (heartNum > 0) {
      heartNum--;
      this.lifeNumText.setText(heartNum);
      // Handle life loss logic here
      comboNum = 0;
      if (heartNum === 0) {
        // Game lost
        this.loseGame();
        return true;
      }
      return false;
    }

    // if (this.hearts.length > 0) {
    //   this.hearts.pop().destroy();
    //   // Handle life loss logic here

    //   if (this.hearts.length === 0) {
    //     // Game lost
    //     this.loseGame();
    //     return true;
    //   }
    //   return false;
    // }
  }

  startRound() {
    this.player.setPosition(mW, h - goalH - playerR / 2);
    this.lastBall = null;
    this.fallBallList.forEach((fb, i) => {
      fb.setPosition(0, i * distance);
      fb.setVelocity(0, speed)
    });


    const dirX = Math.random() > 0.5 ? 1 : -1;
    this.whistle.play();
    this.scored = false;
    this.player.setVelocity(0, 0);
    this.goalXPos = this.player.x;
    this.goalYPos = this.player.y;
    this.isDragging = false;
    this.touches = 0;

    this.goalTxt.setVisible(false);
    this.addedScrTxt.setVisible(false);
  }

  score1(which: number) {
    this.scored = true;

    //this.cameras.main.fadeIn(1000);


    let lost = false;
    if (which == 1) {
      lost = this.loseLife();
      // this.lost.play();
      //this.cameras.main.flash(50);
      this.cameras.main.shake(30, 0.01);
    } else if (which == 0 || which == 2) {
      this.goalTxt.setScale(0)
      .setAlpha(0)
      this.addedScrTxt.setScale(0)
      .setAlpha(0)

      this.tweens.add({
        targets: this.goalTxt,
        scaleX: 1, // Scale to 1 (original size)
        scaleY: 1,
        alpha: 1, // Fade in to full opacity
        duration: 600, // Duration of the animation in milliseconds
        ease: 'Bounce', // Easing function for a bouncing effect
      });
      this.tweens.add({
        targets: this.addedScrTxt,
        scaleX: 1, // Scale to 1 (original size)
        scaleY: 1,
        alpha: 1, // Fade in to full opacity
        duration: 600, // Duration of the animation in milliseconds
        ease: 'Bounce', // Easing function for a bouncing effect
      });

      let combo = which === 2 ? 1 : comboNum;
      let score = which === 2 ? 10 : combo * 100;
      this.scoreNum += score;
      // this.goal.play();
      this.scoreText.text = this.scoreNum.toString().padStart(4, "0");
      this.goalTxt.text = combo == 1 ? "" : (combo + " x Combo");
      this.addedScrTxt.text = "+" + score;

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

    clearTimeout(this.timer);
    this.timer =  setTimeout(() => {
      this.goalTxt.setVisible(false);
      this.addedScrTxt.setVisible(false);
    }, 1000);

  }

  initFallBall() {
    for(let i = 0; i < 10; i ++) {
      this.fallBallList.push(this.addFallBall('ball'));
    }
  }

  addFallBall(type = 'ball') {
    let bball = this.physics.add
    .image(mW, mH, "ball")
    .setAlpha(0.85)
    .setDisplaySize(ballR, ballR)
    .setCircle(this.textures.get("ball").getSourceImage().width / 2)
    .setCollideWorldBounds(true)
    .setBounce(1, 1);

    this.tweens.add({
      targets: bball,
      duration: 50000,
      rotation: 360,
      repeat: -1,
    })

    // this.physics.add.overlap(
    //   this.player,
    //   bball,
    //   (p, bb) => {
    //     console.log("-------type : ", bb.type);

    //     if(bb.type == "ball") {
    //       // this.player.play('playerStatic')
    //       this.ballHit.play();
    //       comboNum++;
    //       if(comboNum % 10 == 0) {
    //         this.lifeup.play();
    //         heartNum++;
    //         this.lifeNumText.setText(heartNum);
    //       }
    //       this.score1(0);
    //     } else if(bb.type == "bomb") {
    //       this.bomb.play();
    //       this.playBombEffect(bb.x, bb.y)
    //       this.score1(1);
    //     } else if(bb.type == "boosterBall") {
    //       console.log('boosterBall hit')
    //       this.setBooster();
    //     }

    //     this.randomBallPos(bb)

    //     // if (!this.ballHit.isPlaying) this.ballHit.play();
    //   },
    //   null,
    //   this
    // );

    this.physics.add.overlap(
      this.boosterGroup,
      bball,
      (booster, bb) => {
        console.log("booster - colider", bb.type);

        if(bb.type == 'bomb') {
          this.bomb.play();
          this.playBombEffect(bball.x, bball.y)
          this.randomBallPos(bball)
          this.boosterGroup.remove(booster);
          booster.destroy();
          this.score1(2);
        }

        if (!this.ballHit.isPlaying) this.ballHit.play();
      },
      null,
      this
    );

    bball.type = type;
    return bball;
  }

  randomBallPos(bb) {
    let y = this.lastBall == null? 0 : this.lastBall.y;

    bb.setPosition( w / 2 + (0.5 - Math.random()) * w, y - distance);
    // bb.setPosition( 0, y - distance);
    distance -= deltaDistance;
    speed += deltaSpeed;

    if(this.scoreNum < 6000) {
      deltaBomb = 0.1;

    } else if(this.scoreNum < 10000) {
      deltaBomb = ballR * 0.2;
    } else if(this.scoreNum < 15000) {
      deltaBomb = ballR * 0.5;
    } else {
      deltaBomb = ballR * 1.3;
    }


    distance = Math.max(100, distance);
    speed = Math.min(500, speed);

    bb.setDisplaySize(ballR, ballR)

    let rate = Math.random();
    if(rate < 0.55) {
      bb.setTexture('bomb');
      bb.type = 'bomb';
      bb.setDisplaySize(Math.min(ballR + deltaBomb, ballR * 2.3), Math.min(ballR + deltaBomb, ballR * 2.3))
    } else if(rate < 0.8 && rate >= 0.55) {
      bb.setTexture('ball');
      bb.type = 'ball';
    } else {
      bb.setTexture('boosterBall');
      bb.type = 'boosterBall';
    }

    this.lastBall = bb;
    bb.setVelocity(0, speed)

  }

  setBooster() {
    boosterNum++;
    this.booster.play();
    if(boosterNum > 2) {
      this.powerup.play();
      boosterNum = 0;
      boosterBat += 10;
      this.boostNumText.setText(boosterBat.toString());

      if(!isStatic) {
        isStatic = true;
        this.staticBonusScreen.setVisible(true);

        this.fallBallList.forEach(fb => {
          fb.setVelocity(0, 0);
        });

        setTimeout(() => {
          if(this.staticBonusScreen != null) {
            this.staticBonusScreen.setVisible(false);
            this.fallBallList.forEach(fb => {
              fb.setVelocity(0, speed);
            });
          }
        }, 3000);
      }

    }
  }

  playBombEffect(x, y) {
    this.bombSprite.setPosition(x, y);
    this.bombSprite.play('bombAnimation')
  }

  throwBatUp(angle) {
    if(boosterBat > 0) {
      this.currentAnim = 'playerThrow'
      this.player.play('playerThrow');

      boosterBat--;
      this.boostNumText.setText(boosterBat.toString());
    } else {
      return;
    }
    const booster = this.physics.add
    .image(100, mH, "boosterBat")
    .setAlpha(0.85)
    .setDisplaySize(ballR, ballR)
    .setCollideWorldBounds(true)
    .setPosition(this.player.x, this.player.y)
    .setBounce(1, 1);

    this.tweens.add({
      targets: booster,
      duration: 30000,
      rotation: 360,
      repeat: -1,
    })

    booster.setVelocity(Math.cos(angle) * throwSpeed, Math.sin(angle) * throwSpeed);
    
    this.boosterGroup.add(booster)

    // setTimeout(() => {
    //   if(this.boosterGroup.contains(booster)) {
    //     this.boosterGroup.remove(booster);
    //     booster.destroy();
    //   }
    // }, 2000);
  }

  private touches = 0;
  private scored = false;
  private goalXPos: number;
  private goalYPos: number;
  private isDragging = false;

  update(time, delta) {
    // this.aiUpdate(time, delta);

    if (this.isDragging) {
      this.goalXPos = Phaser.Math.Clamp(
        this.goalXPos,
        sideW ,
        w - sideW 
      );
      this.goalYPos = Phaser.Math.Clamp(
        this.goalYPos,
        mH ,
        h - goalH
      );

      const dx = this.goalXPos - this.player.x;
      const dy = this.goalYPos - this.player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Calculate the velocity based on the distance to the target
      const playerSpeed = 1050; // Adjust the speed as needed
      const maxDistance = 45; // Adjust the speed as needed
      const velocity = (playerSpeed * distance) / maxDistance;

      // Calculate the direction towards the goal
      const angle = Math.atan2(dy, dx);

      // Calculate the velocity components
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;
      // console.log(dx, dy)
      // Set the player's velocity
      if(dx < -8) {
        if(this.currentAnim != 'playerLeft') {
          this.currentAnim = 'playerLeft';
          this.player.play('playerLeft')
        }
      } else if(dx > 8) {
        if(this.currentAnim != 'playerRight') {
          this.currentAnim = 'playerRight';
          this.player.play('playerRight')
        }
      }
      this.player.setVelocity(vx, 0);
    }

    if(this.staticBonusScreen.visible) return;

    this.fallBallList.forEach(fb => {
      if(fb.y >= h - goalH + ballR / 2) {
        if(fb.type == 'ball') {
          comboNum = 0;
        }
        this.randomBallPos(fb);
      }

      if(this.check_collider(fb, this.player)){
        console.log("hit ball & player")
        console.log("-------type : ", fb.type);

        if(fb.type == "ball") {
          // this.player.play('playerStatic')
          this.ballHit.play();
          comboNum++;
          if(comboNum % 10 == 0) {
            this.lifeup.play();
            heartNum++;
            this.lifeNumText.setText(heartNum);
          }
          this.score1(0);
        } else if(fb.type == "bomb") {
          this.bomb.play();
          this.playBombEffect(fb.x, fb.y)
          this.score1(1);
        } else if(fb.type == "boosterBall") {
          console.log('boosterBall hit')
          this.setBooster();
        }

        this.randomBallPos(fb)
    
      }

      this.check_collider(fb, this.setBooster)

    });

    const items = this.boosterGroup.getChildren();

    items.forEach(item => {
      if(item.y >= h - goalH + ballR / 2) {
          this.boosterGroup.remove(item);
          item.remove();
      }
    })

    if (this.scored) return;
  }

  check_collider(obj1, obj2) {
    const distance = Phaser.Math.Distance.Between(obj1.x + obj1.displayWidth / 2, obj1.y + obj1.displayHeight / 2, obj2.x + obj2.displayWidth / 2, obj2.y + obj2.displayHeight / 2);
    // console.log("distance: ", distance, obj1.displayWidth + obj2.displayWidth)
    return distance < (obj1.displayWidth + obj2.displayWidth) / 2
  }
}

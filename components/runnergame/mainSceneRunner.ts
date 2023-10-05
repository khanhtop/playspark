import Phaser from "phaser";

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
  heartR: number;

let gameType = "runner";
let timerEvent;
let playerClicked = false;
let firstLoad;
let gameOver = false;
let score = 0;

export default class MainSceneRunner extends Phaser.Scene {
  public static instance: MainSceneRunner;
  private ball!: Phaser.Physics.Arcade.Image;
  private player!: Phaser.Physics.Arcade.Image;
  private ai!: Phaser.Physics.Arcade.Image;

  constructor(newGameType: string) {

    super();
    MainSceneRunner.instance = this;
    gameType = newGameType;

  }
  preload() {
    console.log("runner game gameType", gameType);
    this.load.image('cover', "/" + gameType + "/images/cover.jpg");
    this.load.image('barFill', "/" + gameType + "/images/bar-fill.png");
    this.load.image('barFrame', "/" + gameType + "/images/bar-frame.png");
  }
  create() {
    w = this.game.canvas.clientWidth;
    h = this.game.canvas.clientHeight;
    this.cover = this.add.image(0, 0, 'cover').setOrigin(0, 0);
    this.cover.setDisplaySize(w, h);

    this.loadingText = this.add.text(w / 2, h / 2 + 20, 'Loading...', { fontFamily: 'Arial', fontSize: 24, color: '#ffffff' });
    this.loadingText.setOrigin(0.5);


    this.barFrame = this.add.image(w / 2, h / 2 + 80, 'barFrame');
    this.barFill = this.add.image(0, 0, 'barFill').setOrigin(0, 0);
    this.barFill.setPosition(w / 2 - this.barFill.displayWidth / 2, h / 2 - this.barFill.displayHeight / 2 + 80);

    this.barFill.scaleX = 0;
    this.loadAssets();
  }
  loadAssets() {
    this.load.once("complete", this.loadComplete, this);
    this.load.on("progress", this.loadProgress, this);
    this.load.image('btnShop', "/" + gameType + "/images/btn-shop.png");
    this.load.image('shop', "/" + gameType + "/images/shop.png");
    this.load.image('buttonSelect', "/" + gameType + "/images/button-select.png");
	this.load.image('buttonRetry', "/" + gameType + "/images/button-retry.png");
    this.load.image('grassRegular', "/" + gameType + "/images/grass-regular.png");
    this.load.image('grassWinter', "/" + gameType + "/images/grass-winter.png");
    this.load.image('grassRain', "/" + gameType + "/images/grass-rain.png");
    this.load.image("title", "/" + gameType + "/images/title.png");
    this.load.image("middleAd", "/" + gameType + "/images/middleAd.png");
	this.load.image("tackled", "/" + gameType + "/images/tackled.png");

    this.load.spritesheet(
      "playerOne", "/" + gameType + "/images/player-one.png",
      { frameWidth: 84, frameHeight: 90 }
    );
	this.load.spritesheet(
      "rayLewis", "/" + gameType + "/images/ray-lewis.png",
      { frameWidth: 84, frameHeight: 90 }
    );
	this.load.spritesheet(
      "michaelStrahat", "/" + gameType + "/images/michael-strahat.png",
      { frameWidth: 84, frameHeight: 90 }
    );
	this.load.spritesheet(
      "johnElway", "/" + gameType + "/images/john-elway.png",
      { frameWidth: 84, frameHeight: 90 }
    );
	this.load.spritesheet(
      "jeromeBettis", "/" + gameType + "/images/jerome-bettis.png",
      { frameWidth: 84, frameHeight: 90 }
    );
    this.load.spritesheet(
      "enemyOne", "/" + gameType + "/images/enemy-one.png",
      { frameWidth: 84, frameHeight: 90 }
    );
    this.load.spritesheet(
      "buttonArrow", "/" + gameType + "/images/button-arrow.png",
      { frameWidth: 96, frameHeight: 78 }
    );
	this.load.spritesheet(
      "smoke", "/" + gameType + "/images/smoke.png",
      { frameWidth: 156, frameHeight: 105 }
    );


    this.load.audio("bg", "/" + gameType + "/sfx/bgNoise.mp3");
    this.load.audio("clap", "/" + gameType + "/sfx/clap.mp3");
    this.load.audio("collide", "/" + gameType + "/sfx/collide.mp3");
    this.load.audio("kittyOpening", "/" + gameType + "/sfx/kittyopening.mp3");
    this.load.audio("opening", "/" + gameType + "/sfx/opening.mp3");
    this.load.audio("slowmo", "/" + gameType + "/sfx/slowmo.mp3");
    this.load.audio("swing", "/" + gameType + "/sfx/swing.mp3");

    this.load.start();
  }
  loadProgress(percents) {
    this.barFill.scaleX = percents;
  }
  loadComplete() {
    this.initGame1();
  }

  initGame1() {
    if (!this.anims.exists("playerOneAnim")) {
		firstLoad = true;
      this.anims.create({
        key: "playerOneAnim",
        frames: this.anims.generateFrameNumbers("playerOne", {}),
        frameRate: 24,
        repeat: -1
      });
	  this.anims.create({
        key: "rayLewisAnim",
        frames: this.anims.generateFrameNumbers("rayLewis", {}),
        frameRate: 24,
        repeat: -1
      });
	  this.anims.create({
        key: "michaelStrahatAnim",
        frames: this.anims.generateFrameNumbers("michaelStrahat", {}),
        frameRate: 24,
        repeat: -1
      });
	  this.anims.create({
        key: "johnElwayAnim",
        frames: this.anims.generateFrameNumbers("johnElway", {}),
        frameRate: 24,
        repeat: -1
      });
	  this.anims.create({
        key: "jeromeBettisAnim",
        frames: this.anims.generateFrameNumbers("jeromeBettis", {}),
        frameRate: 24,
        repeat: -1
      });
      this.anims.create({
        key: "enemyOneAnim",
        frames: this.anims.generateFrameNumbers("enemyOne", {}),
        frameRate: 24,
        repeat: -1
      });
	  this.anims.create({
        key: "smokeAnim",
        frames: this.anims.generateFrameNumbers("smoke", {}),
        frameRate: 24,
        repeat: -1
      });
      this.anims.create({
        key: "buttonArrowPos",
        frames: this.anims.generateFrameNumbers("buttonArrow", {}),
        frameRate: 24
      });
    }

    this.cover.destroy();
    this.cover = null;
    this.barFrame.destroy();
    this.barFrame = null;
    this.barFill.destroy();
    this.barFill = null;
    this.loadingText.destroy();
    this.loadingText = null;

    this.sound.add("bg").setLoop(true).play();
    this.kittyOpening = this.sound.add("kittyOpening");
    this.swing = this.sound.add("swing");
    this.clap = this.sound.add("clap");
	this.collide = this.sound.add("collide");

    const backgroundTexture = this.textures.get('grassRegular')!;
    const tileSpriteHeight = (backgroundTexture.source[0].height / backgroundTexture.source[0].width) * w;
    this.grassRegular = this.add.image(0, 0, 'grassRegular').setOrigin(0, 0.5);
    this.grassRegular.setDisplaySize(w, tileSpriteHeight);
    this.grassWinter = this.add.image(0, -1 * this.grassRegular.displayHeight, 'grassWinter').setOrigin(0, 0.5);
    this.grassWinter.setDisplaySize(w, tileSpriteHeight);
    this.grassRain = this.add.image(0, this.grassWinter.y - 1 * this.grassRegular.displayHeight / 2, 'grassRain').setOrigin(0, 0.5);
    this.grassRain.setDisplaySize(w, tileSpriteHeight);

    this.title = this.add.image(w / 2, -80, 'title').setOrigin(0.5);
    this.title.setScale(0.7);
    this.moveTitle(80);

    this.instText = this.add.text(w / 2, h / 2 - 20, 'Hold player\nto start', { fontFamily: 'Arial', fontSize: 34, color: '#ffffff', align: 'center' });
    this.instText.setOrigin(0.5);
	
	this.smoke = this.physics.add.sprite(0, 0, "smoke");

    this.player = this.physics.add.sprite(w / 2, h / 2 + 160, "playerOne");
    this.player.play("playerOneAnim");

    this.player.setInteractive({ useHandCursor: true });
    this.player.on('pointerdown', this.onPointerDown, this);
    this.player.on('pointerup', this.onPointerUp, this);

    this.player.setCollideWorldBounds(true);

    this.input.on('pointermove', (pointer) => {

      if (pointer.worldX < this.player.x) {
        this.player.angle = -15;
      } else {
        this.player.angle = 15;
      }
    });

    this.btnShop = this.add.image(w / 2, h + 40, 'btnShop').setOrigin(0.5);
    this.btnShop.setInteractive({ useHandCursor: true });
    this.btnShop.setScale(0.8);
    this.btnShop.on('pointerdown', this.onShop, this);
    this.moveShopBtn(h - 50);



    this.enemies = this.physics.add.group(); 

    this.input.on('pointerdown', this.playKitty, this);
	
	this.tackledContainer = this.make.container();
	this.tackled = this.add.image(w / 2, 20, 'tackled').setOrigin(0.5, 0);
	
	this.buttonRetry = this.add.image(w / 2, 185, 'buttonRetry').setOrigin(0.5);
    this.buttonRetry.setScale(0.7);
    this.buttonRetry.setInteractive({ useHandCursor: true });
    this.buttonRetry.on('pointerdown', this.onRetry, this);
	
	this.buttonRetryText = this.add.text(this.buttonRetry.x, this.buttonRetry.y, "Retry", { fontFamily: 'Arial', fontSize: 24, color: '#ffffff', align: 'center' });
    this.buttonRetryText.setOrigin(0.5);
	
	this.scoreText = this.add.text(w / 2, 280, score, { fontFamily: 'Arial', fontSize: 44, color: '#ffffff', align: 'center' });
    this.scoreText.setOrigin(0.5);
	
	this.tackledContainer.add([this.tackled, this.buttonRetry, this.buttonRetryText, this.scoreText]);
	this.tackledContainer.setVisible(false);
	
    this.shopContainer = this.make.container();
    this.shop = this.add.image(w / 2, 20, 'shop').setOrigin(0.5, 0);
    this.buttonSelect = this.add.image(w / 2, h - 50, 'buttonSelect').setOrigin(0.5);
    this.buttonSelect.setScale(0.7);
    this.buttonSelect.setInteractive({ useHandCursor: true });
    this.buttonSelect.on('pointerdown', this.onSelect, this);
    this.leftArrow = this.physics.add.sprite(w / 2 - 120, h - 50, "buttonArrow");
    this.leftArrow.setFrame(0);
    this.leftArrow.setScale(0.7);
    this.leftArrow.setInteractive({ useHandCursor: true });
    this.leftArrow.on('pointerdown', this.onLeft, this);
    this.rightArrow = this.physics.add.sprite(w / 2 + 120, h - 50, "buttonArrow");
    this.rightArrow.setFrame(1);
    this.rightArrow.setScale(0.7);
    this.rightArrow.setInteractive({ useHandCursor: true });
    this.rightArrow.on('pointerdown', this.onRight, this);
	
	this.touchDowns = 4;
	this.record = 1;
	this.shopData = [{actor:"Rookie", msg:"Available",y:0, available:true}, {actor:"Jeremy Bettings", msg:"25 touchdowns\nor\n5 highscore to unlock", y:-14, available:false}, {actor:"Big Ben", msg:"50 touchdowns\nor\n10 highscore to unlock",y:-14, available:false}, {actor:"Mikael Stronghat", msg:"75 touchdowns\nor\n15 highscore to unlock",y:-14, available:false}, {actor:"Bay Newest", msg:"150 touchdowns\nor\n25 highscore to unlock",y:-14, available:false}];
	
	this.currShopIndex = 0;
	
	this.touchDownText = this.add.text(w / 2 - 80, h / 2 - 72, this.touchDowns, { fontFamily: 'Arial', fontSize: 34, color: '#ffffff', align: 'center' });
    this.touchDownText.setOrigin(0.5);
	
	this.recordText = this.add.text(w / 2 + 80, h / 2 - 72, this.record, { fontFamily: 'Arial', fontSize: 34, color: '#ffffff', align: 'center' });
    this.recordText.setOrigin(0.5);
	
	this.playerNameText = this.add.text(w / 2, h / 2 - 17, this.shopData[this.currShopIndex].actor, { fontFamily: 'Arial', fontSize: 24, color: '#FCF28D', align: 'center' });
    this.playerNameText.setOrigin(0.5);
	
	this.playerDescText = this.add.text(w / 2, h / 2, this.shopData[this.currShopIndex].msg, { fontFamily: 'Arial', fontSize: 18, color: '#ffffff', align: 'center' , lineSpacing: -7});
    this.playerDescText.setOrigin(0.5, 0);
	
	
    this.shopContainer.add([this.shop, this.buttonSelect, this.leftArrow, this.rightArrow, this.touchDownText, this.recordText, this.playerNameText, this.playerDescText]);
	this.updateShopDisplay();
    this.shopContainer.setVisible(false);
	

  }
  playKitty() {
	if(firstLoad){
		firstLoad = false;
		this.kittyOpening.play();
	}    
    this.input.off('pointerdown', this.playKitty, this);
  }
  onSelect() {
    this.instText.setVisible(true);
    this.clap.play();
    this.moveTitle(80);
    this.moveShopBtn(h - 50);
    this.shopContainer.setVisible(false);
  }
  onLeft() {
    this.swing.play();	
	this.currShopIndex = (this.currShopIndex - 1 + this.shopData.length) % this.shopData.length;
	this.updateShopDisplay();
  }
  onRight() {
    this.swing.play();	
	this.currShopIndex = (this.currShopIndex + 1) % this.shopData.length;
	this.updateShopDisplay();
  }
  updateShopDisplay(){
	  let currdata = this.shopData[this.currShopIndex];
	  let actor = this.shopData[this.currShopIndex].actor
	  this.touchDownText.text = this.touchDowns;
	  this.recordText.text = this.record;
	  this.playerNameText.text = actor;
	  this.playerDescText.text = this.shopData[this.currShopIndex].msg;
	  this.playerDescText.y = h / 2 + 13 + this.shopData[this.currShopIndex].y;
	  this.buttonSelect.setVisible(currdata.available);
	  switch(actor){
		  case "Rookie":
		   this.player.setTexture('playerOne');
		   this.player.anims.play('playerOneAnim', true);
		  break;
		  case "Big Ben":
		   this.player.setTexture('rayLewis');
		   this.player.anims.play('rayLewisAnim', true);
		  break;
		  case "Mikael Stronghat":
		   this.player.setTexture('michaelStrahat');
		   this.player.anims.play('michaelStrahatAnim', true);
		  break;
		  case "Bay Newest":
		   this.player.setTexture('johnElway');
		   this.player.anims.play('johnElwayAnim', true);
		  break;
		  case "Jeremy Bettings":
		   this.player.setTexture('jeromeBettis');
		   this.player.anims.play('jeromeBettisAnim', true);
		  break;
		  
	  }
	  
  }
  
  onShop() {
    this.swing.play();
    this.moveTitle(-80);
    this.moveShopBtn(h + 80);
    this.shopContainer.setVisible(true);
    this.instText.setVisible(false);
    console.log("onshop");
  }
  moveTitle(yPos) {
    this.tweens.add({
      targets: this.title,
      duration: 2000,
      ease: 'Back.Out',
      y: yPos
    });
  }
  moveShopBtn(yPos) {
    this.tweens.add({
      targets: this.btnShop,
      duration: 2000,
      ease: 'Back.Out',
      y: yPos
    });
  }
  onPointerDown() {
    playerClicked = true;
    this.moveShopBtn(h + 80);
    this.moveTitle(-80);
    this.instText.setVisible(false);
    timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.spawnEnemy,
      callbackScope: this,
      loop: true,
    });
  }
  onPointerUp() {
    playerClicked = false;
    if (timerEvent) {
      timerEvent.destroy();
    }
  }
  spawnEnemy() {
    const x = Phaser.Math.Between(0, w);
    const enemy = this.enemies.create(x, -50, 'enemyOne');
    enemy.play("enemyOneAnim");
    enemy.setVelocityY(100);
  }
  onRetry(){
	  gameOver = false;
	  this.scene.restart();
	  this.player.setPosition(w / 2, h / 2 + 160);
  }
  onCollision() {
	gameOver = true;
	if (timerEvent) {
      timerEvent.destroy();
    }
	this.enemies.clear(true, true);
    this.game.sound.stopAll();
	this.collide.play();
	this.smoke.setVisible(true);
	this.smoke.play("smokeAnim");
	this.smoke.setPosition(this.player.x, this.player.y);
	this.player.setVisible(false);
	this.tackledContainer.setVisible(true);
    //this.scene.restart();
  }
  update(time, delta) {
	  if(gameOver){
		 return; 
	  }
    let speed = 5;
    let maxOffsetY = 2 * h + 100;

    if (this.grassRegular) {
      let imageHeight = this.grassRegular.displayHeight;
      this.grassRegular.y += speed;
      this.grassWinter.y += speed;
      this.grassRain.y += speed;

      if (this.grassRegular.y > maxOffsetY) {
        this.grassRegular.y = this.grassRain.y - imageHeight;
      }
      if (this.grassWinter.y > maxOffsetY) {
        this.grassWinter.y = this.grassRegular.y - imageHeight;
      }
      if (this.grassRain.y > maxOffsetY) {
        this.grassRain.y = this.grassWinter.y - imageHeight;
      }
    }
    if (this.player) {
      const pointer = this.input.activePointer;
      if (pointer.isDown) {
        if (playerClicked) {
          this.player.x = pointer.x;
          this.player.y = pointer.y;
        }
      } else {
        this.player.angle = 0;
      }

      const cursors = this.input.keyboard.createCursorKeys();

      if (cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.angle = -15;
      } else if (cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.angle = 15;
      } else if (!pointer.isDown) {
        this.player.setVelocityX(0);
        this.player.angle = 0;
      }

      this.physics.world.collide(
        this.player,
        this.enemies,
        this.onCollision,
        null,
        this
      );


    }


  }
  preload1() {



    /*this.load.image('player', "/" + gameType + "/images/player.png");
      this.load.image('enemy', "/" + gameType + "/images/enemy.png");
      this.load.image('bg', "/" + gameType + "/images/bg.png");
    this.load.image("middleAd", "/" + gameType + "/images/middleAd.png");
  	
    this.load.audio("bg", "/" + gameType + "/sfx/bgNoise.mp3");
    this.load.audio("bg", "/" + gameType + "/sfx/clap.mp3");
    this.load.audio("bg", "/" + gameType + "/sfx/collide.mp3");
    this.load.audio("bg", "/" + gameType + "/sfx/kittyopening.mp3");
    this.load.audio("bg", "/" + gameType + "/sfx/opening.mp3");
    this.load.audio("bg", "/" + gameType + "/sfx/slowmo.mp3");
    this.load.audio("bg", "/" + gameType + "/sfx/swing.mp3");*/

    /*this.load.image("ball", "/pong/" + gameType + "/ball.png");
    this.load.image("peck", "/pong/" + gameType + "/peck.png");
    this.load.image("bg", "/pong/" + gameType + "/bg.png");
    //this.load.image('bgGls', '/pong' + gameType + 'n/bgGoals.png');
    this.load.image("heart", "/pong/" + gameType + "/heart.png");
    this.load.image("score", "/pong/" + gameType + "/score.png");

    this.load.image("middleAd", "/pong/" + gameType + "/middleAd.png");

    this.load.audio("bg", "/pong/" + gameType + "/sfx/bgNoise.mp3");
    this.load.audio("whistle", "/pong/" + gameType + "/sfx/startWhistle.mp3");
    this.load.audio("ballHit", "/pong/" + gameType + "/sfx/ballHit.mp3");
    this.load.audio("goal", "/pong/" + gameType + "/sfx/goalScored.mp3");
    this.load.audio("lost", "/pong/" + gameType + "/sfx/goalConceded.mp3");
    this.load.audio("final", "/pong/" + gameType + "/sfx/finalWhistle.mp3");*/

    w = this.game.canvas.clientWidth;
    h = this.game.canvas.clientHeight;
    ballR = w * 0.1;
    playerR = w * 0.175;
    aiR = w * 0.175;
    scr = h * 0.08;
    mW = w / 2;
    mH = (h - scr) / 2 + scr;
    goalH = h * 0.1;
    sideW = w * 0.08;
    boundW = w - 2 * sideW;
    boundH = h - scr - 2 * goalH;
    ballVY = h * 0.5;
    ballVX = w * 0.75;
    collW = w * 0.2;
    scrW = w * 0.175;
    scrH = scrW / 1.614;
    heartR = w * 0.0625;
  }

  // 400 800

  private gr: Phaser.Physics.Arcade.StaticGroup;

  private whistle: any;
  private ballHit: any;
  private final: any;
  private goal: any;
  private lost: any;

  create1() {
    this.sound.add("bg").setLoop(true).play();
    this.bg = this.add.tileSprite(0, 0, w, h, 'bg');
    this.bg.setOrigin(0, 0);
    /*this.whistle = this.sound.add("whistle");
    this.ballHit = this.sound.add("ballHit");
    this.final = this.sound.add("final");
    this.goal = this.sound.add("goal");
    this.lost = this.sound.add("lost");

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
    this.add.image(0, 0, "bg").setOrigin(0).setDisplaySize(w, h);
    this.add.image(mW, mH, "middleAd").setDisplaySize(50, 50).setAlpha(0.7);
    //this.add.image(0, 0, 'bg').setOrigin(0).setDisplaySize(w, h);

    this.add.image(mW, 37, "score").setDisplaySize(scrW, scrH);
    this.ball = this.physics.add
      .image(mW, mH, "ball")
      .setAlpha(0.85)
      .setDisplaySize(ballR, ballR)
      .setCircle(this.textures.get("ball").getSourceImage().width / 2)
      .setCollideWorldBounds(true)
      .setBounce(1, 1);
    this.player = this.physics.add
      .image(mW, h - goalH - playerR / 2, "peck")
      .setTint(0x0000ff)
      .setAlpha(0.75)
      .setDisplaySize(playerR, playerR)
      .setCircle(this.textures.get("peck").getSourceImage().width / 2)
      .setCollideWorldBounds(true)
      .setPushable(false);
    this.ai = this.physics.add
      .image(mW, scr + goalH + playerR / 2, "peck")
      .setTint(0xff0000)
      .setAlpha(0.75)
      .setDisplaySize(playerR, playerR)
      .setCircle(this.textures.get("peck").getSourceImage().width / 2)
      .setCollideWorldBounds(true)
      .setPushable(false);

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

    //this.physics.add.collider(this.player, gr);
    //this.physics.add.collider(this.ai, gr);

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
          sideW + playerR / 2,
          w - sideW - playerR / 2
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
        this.player.setVelocity(0, 0);
      },
      this
    );

    this.scoreText = this.add
      .text(mW + 2, 36, "0000", {
        fontFamily: "enhanced_led_board-7",
        fontSize: "26px",
        color: "#ffffff",
      })
      .setOrigin(0.5, 0.5);

    this.goalTxt = this.add
      .text(mW, mH - 52, "GOAL!", {
        fontFamily: "TitanOne-Regular",
        fontSize: "76px",
        color: "#345e8e",
        stroke: "#ffffff",
        strokeThickness: 10,
      })
      .setOrigin(0.5, 0.5);

    this.addedScrTxt = this.add
      .text(mW, mH + 26, "+100", {
        fontFamily: "TitanOne-Regular",
        fontSize: "76px",
        color: "#ffffff",
        stroke: "#345e8e",
        strokeThickness: 10,
      })
      .setOrigin(0.5, 0.5);

    this.tweens.add({
      targets: this.ball,
      duration: 50000,
      rotation: 360,
      repeat: -1,
    });*/

    /*
        const ballFx = this.ball.postFX.addBloom(0xffffff, 0, 0, 0, 1);

        const ballFXTween = this.tweens.add({
            targets: ballFx,
            blurStrength: 5,
            yoyo: true,
            duration: 200,
            paused: true,
            onComplete: () => {
                ballFXTween.restart();
                ballFXTween.pause();
            }
        });
        */

    /*this.physics.add.collider(
      this.player,
      this.ball,
      () => {
        this.touches++;
        if (!this.ballHit.isPlaying) this.ballHit.play();
      },
      null,
      this
    );
    this.physics.add.collider(
      this.ai,
      this.ball,
      () => {
        if (!this.ballHit.isPlaying) this.ballHit.play();
      },
      null,
      this
    );
    this.physics.add.collider(this.ball, this.gr, () => {
      if (!this.ballHit.isPlaying) this.ballHit.play();
    });

    //this.cameras.main.postFX.addBloom(0xffffff, 1, 1, 10, 0.5);
    //this.cameras.main.postFX.addBokeh(0.1, 0.5, 0.05);
    //this.cameras.main.postFX.addTiltShift(0.5, 0.25, 0.0015, 0.05, 0.05, 1);
    this.cameras.main.postFX.addVignette(0.5, 0.5, 0.975);
    this.cameras.main.postFX
      .addColorMatrix()
      .contrast(1.25)
      .polaroid()
      .brightness(0.9);
    this.ball.preFX.addShadow();
    this.player.preFX.addShadow();
    this.ai.preFX.addShadow();
    //this.cameras.main.postFX.addGlow();

    this.ball.setMaxVelocity(ballVX * 3, ballVY * 3);*/

    this.initGame();
  }

  private ballDir: number = 1;
  private hearts = [];
  private scoreNum = 0;
  private scoreText: Phaser.GameObjects.Text;
  private goalTxt: Phaser.GameObjects.Text;
  private addedScrTxt: Phaser.GameObjects.Text;

  private scoreHandler;

  public setScoreHandle(handleScore: any) {
    this.scoreHandler = handleScore;
  }

  public initGame(lives = 3) {


    return;
    this.cameras.main.fadeIn(1200);

    this.goalTxt.setVisible(false);
    this.addedScrTxt.setVisible(false);

    this.player.setPosition(mW, h - goalH - playerR / 2);
    this.ai.setPosition(mW, scr + goalH + aiR / 2);
    this.player.setVelocity(0, 0);
    this.ai.setVelocity(0, 0);

    this.ball.setVelocity(0, 0);

    this.ball.setPosition(mW, mH);

    this.aiTargetX = mW;
    this.aiTargetY = scr + goalH + aiR / 2;

    this.goalXPos = mW;
    this.goalYPos = h - goalH - playerR / 2;

    this.scoreNum = 0;
    this.ballDir = 1;
    this.scoreText.text = "0000";
    this.hearts.forEach((h) => h.destroy);
    this.hearts.length = 0;
    for (let i = 0; i < lives; i++) {
      const heart = this.add
        .image(w - 30 - i * 40, 30, "heart")
        .setDisplaySize(heartR, heartR);
      this.hearts.push(heart);
    }
    console.log(this.hearts);
    this.ball.setAlpha(0.5);
    this.ball.setCircle(0.1);

    this.touches = 0;
    this.scored = false;
    this.isDragging = false;

    this.patrolAiSpeed = 75;
    this.defenceAiSpeed = 250;
    this.aiSpeed = 250;
    this.aiSize = 1;

    this.aiIsMoving = false;
    this.aiMoveTime = 0;

    setTimeout(() => this.startRound(), 2500);
  }

  loseGame() {
    this.cameras.main.fadeOut(1000);
    this.final.play();
    this.scoreHandler(this.scoreNum);
    // game is lost
    //this.initGame();
  }

  loseLife(): boolean {
    if (this.hearts.length > 0) {
      this.hearts.pop().destroy();
      // Handle life loss logic here

      if (this.hearts.length === 0) {
        // Game lost
        this.loseGame();
        return true;
      }
      return false;
    }
  }

  startRound() {
    //this.player.setPosition(mW, h - goalH - playerR / 2);
    //this.ai.setPosition(mW, scr + goalH + playerR / 2);
    this.ball.setPosition(mW, mH);
    const dirX = Math.random() > 0.5 ? 1 : -1;
    this.ballDir *= -1;
    this.ball.setVelocity(dirX * ballVX, ballVY * this.ballDir);
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
      this.scoreText.text = this.scoreNum.toString().padStart(4, "0");
      this.goalTxt.text = this.touches === 1 ? "COMBO HIT!" : "GOAL!";
      this.addedScrTxt.text = this.touches === 1 ? "+200" : "+100";

      if (this.touches === 1) {
        //this.cameras.main.flash(50);
        this.cameras.main.shake(40, 0.02);
      } else {
        //this.cameras.main.flash(30);
        this.cameras.main.shake(25, 0.01);
      }

      this.changeAI(this.scoreNum / 100);

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

  private patrolAiSpeed = 75;
  private defenceAiSpeed = 250;
  private aiSpeed = 250;
  private aiSize = 1;

  changeAI(score: number) {
    if (score === 1) {
      this.aiSpeed += 50; // Increase speed
      this.defenceAiSpeed += 50; // Increase speed
      this.patrolAiSpeed += 25; // Increase speed
    } else if (score === 3) {
      this.aiSpeed += 25; // Increase speed
      this.defenceAiSpeed += 25; // Increase speed
      this.patrolAiSpeed += 10;
    } else if (score === 5) {
      this.aiSize += 0.1; // Increase size by 10%
      this.ai.setDisplaySize(aiR * this.aiSize, aiR * this.aiSize); // Update the visual size
      //this.ai.setCircle(this.aiSize / 2); // Update the physics body size
    } else if (score === 7) {
      this.aiSize += 0.2; // Increase size by 20%
      this.ai.setDisplaySize(aiR * this.aiSize, aiR * this.aiSize); // Update the visual size
      //this.ai.setCircle(this.aiSize / 2); // Update the physics body size
    }
  }

  aiSetTargetPos(x: number, y: number, speed: number) {
    // Clamp the target position to ensure it's within bounds
    x = Phaser.Math.Clamp(
      x,
      sideW + (aiR * this.aiSize) / 2,
      w - sideW - (aiR * this.aiSize) / 2
    );
    y = Phaser.Math.Clamp(
      y,
      scr + goalH + (aiR * this.aiSize) / 2,
      mH - (aiR * this.aiSize) / 2
    );

    this.aiTargetX = x;
    this.aiTargetY = y;
    // Calculate the distance to the target
    const dx = x - this.ai.x;
    const dy = y - this.ai.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate the velocity based on the distance to the target
    const maxDistance = 50; // Adjust this value as needed
    const velocity = (speed * distance) / maxDistance;

    // Calculate the direction towards the target
    const angle = Math.atan2(dy, dx);

    // Calculate the velocity components
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    // Set the AI's velocity
    this.ai.setVelocity(vx, vy);
  }

  private aiIsMoving = false;
  private aiMoveTime = 0;
  private aiTargetX = 0;
  private aiTargetY = 0;

  aiUpdate(time, delta) {
    if (this.ball.y <= scr + goalH + (aiR * this.aiSize) / 2 + 10) {
      // The ball is touching the gr static group, so the AI should defend the goal
      const dirX = this.ball.x < mW ? -50 : 50;
      const x = mW + dirX;
      const y = this.ball.y < mH ? this.ball.y : mH - (aiR * this.aiSize) / 2;
      this.aiSetTargetPos(x, y, this.defenceAiSpeed); // Adjust the speed as needed
    } else if (this.ball.y < mH && this.ball.alpha !== 0.5) {
      // The ball is on the AI's side of the field, so the AI should chase the ball
      this.aiSetTargetPos(this.ball.x, this.ball.y, this.aiSpeed); // Adjust the speed as needed
    } else {
      // The ball is on the player's side of the field, so the AI should wander randomly
      const dx = this.aiTargetX - this.ai.x;
      const dy = this.aiTargetY - this.ai.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 10) {
        // Adjust the threshold as needed
        // The AI has arrived at its target position, so generate a new target position
        const x = Phaser.Math.Between(mW - 100, mW + 100);
        const y = Phaser.Math.Between(
          scr + goalH + (aiR * this.aiSize) / 2,
          scr + goalH + 50 + (aiR * this.aiSize) / 2
        );
        this.aiSetTargetPos(x, y, this.patrolAiSpeed); // Adjust the speed as needed
      }
    }
  }

  update1(time, delta) {
    //this.bg.tilePositionY -= 1


    return;
    this.aiUpdate(time, delta);

    if (this.isDragging) {
      this.goalXPos = Phaser.Math.Clamp(
        this.goalXPos,
        sideW + playerR / 2,
        w - sideW - playerR / 2
      );
      this.goalYPos = Phaser.Math.Clamp(
        this.goalYPos,
        mH + playerR / 2,
        h - goalH - playerR / 2
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

      // Set the player's velocity
      this.player.setVelocity(vx, vy);
    }

    if (this.scored) return;

    if (this.ball.y >= h - goalH + ballR / 2) this.score(1);
    else if (this.ball.y <= goalH + ballR / 2) this.score();
  }
}

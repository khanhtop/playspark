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
let gameInProgress = false;
let score = 0, maxLife = 3;
let touchdownOccurred = false;
//let touchdownOccurred = false;
//let touchdownOccurred = false;
let gameLevelConfig = [
  { coins: 3, boosters: 0 },
  { coins: 5, boosters: 1 },
  { coins: 6, boosters: 2 },
  { coins: 8, boosters: 2 },
  { coins: 10, boosters: 3 }
];
let touchDownCount = 0;
let isSwiping = false;
let swipeStartPosition;
let levelEnemyReleased = 0;
let levelEnemyAllowed = 4;
let currRandomPoints = [];

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
    this.load.image('loading', "/" + gameType + "/images/loading.png");

  }
  create() {
    w = this.game.canvas.clientWidth;
    h = this.game.canvas.clientHeight;
    this.cover = this.add.image(0, 0, 'cover').setOrigin(0, 0);
    this.cover.setDisplaySize(w, h);

    this.loadingTxtImg = this.add.image(w / 2, h / 2 + 20, 'loading');
    this.barFrame = this.add.image(w / 2, h / 2 + 80, 'barFrame');
    this.barFill = this.add.image(0, 0, 'barFill').setOrigin(0, 0);
    this.barFill.setPosition(w / 2 - this.barFill.displayWidth / 2, h / 2 - this.barFill.displayHeight / 2 + 80);

    this.barFill.scaleX = 0;
    this.loadAssets();
  }
  loadAssets() {
    this.load.once("complete", this.loadComplete, this);
    this.load.on("progress", this.loadProgress, this);
    this.load.image('barFrame', "/" + gameType + "/images/bar-frame.png");
    this.load.image('btnShop', "/" + gameType + "/images/btn-shop.png");
    this.load.image('shop', "/" + gameType + "/images/shop.png");
    this.load.image('blue', "/" + gameType + "/images/blue.png");
    this.load.image('shopBg', "/" + gameType + "/images/shopBg.png");
    this.load.image('coinBase', "/" + gameType + "/images/coinBase.png");
    this.load.image('coin', "/" + gameType + "/images/coin.png");
    this.load.image('heartBase', "/" + gameType + "/images/heartBase.png");
    this.load.image('heart', "/" + gameType + "/images/heart.png");
    this.load.image('scoreBase', "/" + gameType + "/images/scoreBase.png");
    this.load.image('powerBase', "/" + gameType + "/images/powerBase.png");
    this.load.image('powerUp', "/" + gameType + "/images/powerUp.png");
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
      { frameWidth: 96, frameHeight: 93 }
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
    this.loadingTxtImg.destroy();
    this.loadingTxtImg = null;

    this.sound.add("bg").setLoop(true).play();
    this.kittyOpening = this.sound.add("kittyOpening");
    this.swing = this.sound.add("swing");
    this.clap = this.sound.add("clap");
    this.collide = this.sound.add("collide");

    const backgroundTexture = this.textures.get('grassRegular')!;
    const tileSpriteHeight = (backgroundTexture.source[0].height / backgroundTexture.source[0].width) * w;
    this.grassRegular = this.add.image(0, 0, 'grassRegular').setOrigin(0, 0.5);
    this.grassRegular.setDisplaySize(w, tileSpriteHeight);
    this.grassWinter = this.add.image(0, 0, 'grassWinter').setOrigin(0, 0.5);
    this.grassWinter.setDisplaySize(w, tileSpriteHeight);
	this.grassWinter.y = this.grassRegular.y - tileSpriteHeight;
	
    this.grassRain = this.add.image(0, 0, 'grassRain').setOrigin(0, 0.5);
    this.grassRain.setDisplaySize(w, tileSpriteHeight);
	this.grassRain.y = this.grassWinter.y - tileSpriteHeight;

    this.grassRegularBar = this.add.image(w / 2, 0, 'barFrame').setOrigin(0.5);
    this.grassWinterBar = this.add.image(w / 2, 0, 'barFrame').setOrigin(0.5).setAlpha(0.6);
    this.grassRainBar = this.add.image(w / 2, 0, 'barFrame').setOrigin(0.5).setAlpha(0.3);

    this.grassRegularBar.setAlpha(0);
    this.grassWinterBar.setAlpha(0);
    this.grassRainBar.setAlpha(0);

    this.title = this.add.image(w / 2, -80, 'title').setOrigin(0.5);
    this.title.setScale(0.7);
    this.moveTitle(80);



    this.instText = this.add.text(w / 2, h / 2 + 70, 'Hold player\nto start', { fontFamily: 'Gamer', fontSize: 34, color: '#ffffff', align: 'center' });
    this.instText.setOrigin(0.5);

    this.smoke = this.physics.add.sprite(0, 0, "smoke");
    this.shopContainer = this.make.container();
    this.player = this.physics.add.sprite(w / 2, h / 2 + 160, "playerOne");
    this.player.play("playerOneAnim");
	this.physics.world.enable(this.player);
    this.player.setInteractive({ useHandCursor: true });
    this.player.on('pointerdown', this.onPointerDown, this);
    this.player.on('pointerup', this.onPointerUp, this);
	this.player.on('pointermove', this.handleSwipe, this);

    this.player.setCollideWorldBounds(true);



    this.input.on('pointermove', (pointer) => {
      if (gameInProgress) {
        if (pointer.worldX < this.player.x) {
          //this.player.angle = -15;
        } else {
          //this.player.angle = 15;
        }
      }

    });

    this.btnShop = this.add.image(w / 2, h + 40, 'btnShop').setOrigin(0.5);
    this.btnShop.setInteractive({ useHandCursor: true });
    this.btnShop.setScale(0.8);
    this.btnShop.on('pointerdown', this.onShop, this);
    this.moveShopBtn(h - 50);



    this.enemies = this.physics.add.group();
	this.coins = this.physics.add.group();
	this.boosters = this.physics.add.group();

    this.input.on('pointerdown', this.playKitty, this);

    this.tackledContainer = this.make.container();
    this.tackled = this.add.image(w / 2, 20, 'tackled').setOrigin(0.5, 0);

    this.buttonRetry = this.add.image(w / 2, 185, 'buttonRetry').setOrigin(0.5);
    this.buttonRetry.setScale(0.7);
    this.buttonRetry.setInteractive({ useHandCursor: true });
    this.buttonRetry.on('pointerdown', this.onRetry, this);

    this.buttonRetryText = this.add.text(this.buttonRetry.x, this.buttonRetry.y, "Retry", { fontFamily: 'Gamer', fontSize: 24, color: '#ffffff', align: 'center' });
    this.buttonRetryText.setOrigin(0.5);

    this.scoreText = this.add.text(w / 2, 280, score, { fontFamily: 'Gamer', fontSize: 44, color: '#ffffff', align: 'center' });
    this.scoreText.setOrigin(0.5);

    this.tackledContainer.add([this.tackled, this.buttonRetry, this.buttonRetryText, this.scoreText]);
    this.tackledContainer.setVisible(false);


    this.shop = this.add.image(w / 2, 80, 'shop').setOrigin(0.5, 0).setAlpha(0.7);
    this.shopBg = this.add.image(w / 2, 135, 'shopBg').setOrigin(0.5, 0).setScale(0.75);
    this.blueBar = this.add.image(w / 2, 80, 'blue').setOrigin(0.5).setScale(1.2);
    this.blueBar.setInteractive({ useHandCursor: true });
    this.blueBar.on('pointerdown', this.onSelect, this);
    this.shopText = this.add.text(this.blueBar.x, this.blueBar.y - 2, "SHOP", { fontFamily: 'Gamer', fontSize: 44, color: '#ffffff', align: 'center' });
    this.shopText.setOrigin(0.5);

    this.leftArrow = this.physics.add.sprite(w / 2 - 120, h / 2 - 10, "buttonArrow");
    this.leftArrow.setFrame(0);
    this.leftArrow.setScale(0.5);
    this.leftArrow.setInteractive({ useHandCursor: true });
    this.leftArrow.on('pointerdown', this.onLeft, this);
    this.rightArrow = this.physics.add.sprite(w / 2 + 120, this.leftArrow.y, "buttonArrow");
    this.rightArrow.setFrame(1);
    this.rightArrow.setScale(0.5);
    this.rightArrow.setInteractive({ useHandCursor: true });
    this.rightArrow.on('pointerdown', this.onRight, this);

    this.touchDowns = 4;
    this.record = 1;
    this.shopData = [{ actor: "Rookie", coins: 0, touchdowns: 0, y: 0 }, { actor: "Jeremy\nBettings", coins: 5, touchdowns: 25, y: -14 }, { actor: "Big\nBen", coins: 10, touchdowns: 50, y: -14 }, { actor: "Mikael\nStronghat", coins: 15, touchdowns: 75, y: -14 }, { actor: "Bay\nNewest", coins: 25, touchdowns: 150, y: -14 }];

    this.currShopIndex = 0;


    this.playerNameText = this.add.text(w / 2, h / 2 - 100, this.shopData[this.currShopIndex].actor, { fontFamily: 'Gamer', fontSize: 34, color: '#ffffff', align: 'center' });
    this.playerNameText.setOrigin(0.5);

    this.shopCoinBase = this.add.image(w / 2, h / 2 + 45, 'heartBase').setOrigin(0.5);
    this.shopCoinBase.setScale(0.4);
    this.shopCoin = this.add.image(this.shopCoinBase.x - 27, this.shopCoinBase.y - 1, 'coin').setOrigin(0.5);
    this.shopCoin.setScale(0.4);


    this.shopCoinValueText = this.add.text(this.shopCoinBase.x + 3, this.shopCoinBase.y - 2, 0, { fontFamily: 'Gamer', fontSize: 24, color: '#ffffff', align: 'center' });
    this.shopCoinValueText.setOrigin(0.5);

    this.playerTouchdownText = this.add.text(w / 2, h / 2 + 60, this.shopData[this.currShopIndex].touchdowns, { fontFamily: 'Gamer', fontSize: 22, color: '#ffffff', align: 'center', lineSpacing: 4 });
    this.playerTouchdownText.setOrigin(0.5, 0);


    this.shopContainer.add([this.shop, this.shopBg, this.blueBar, this.shopText, this.leftArrow, this.rightArrow, this.playerNameText, this.shopCoinBase, this.shopCoin, this.shopCoinValueText, this.playerTouchdownText]);
    this.updateShopDisplay();
    this.shopContainer.setVisible(false);


    this.statusBarCon = this.make.container();
    this.statusBarCon.setDepth(2);
    this.coinBase = this.add.image(50, 0, 'coinBase').setOrigin(0.5);
    this.coinBase.setScale(0.4);
    this.coin = this.add.image(23, 0, 'coin').setOrigin(0.5);
    this.coin.setScale(1);
    this.coinscollected = 0;
    this.coinsCollectedText = this.add.text(60, -2, this.coinscollected, { fontFamily: 'Gamer', fontSize: 24, color: '#ffffff', align: 'center' });
    this.coinsCollectedText.setOrigin(0.5);

    this.heartBase = this.add.image(w - 50, 0, 'heartBase').setOrigin(0.5);
    this.heartBase.flipX = true;
    this.heartBase.setScale(0.4);

    this.heart = this.add.image(w - 23, 0, 'heart').setOrigin(0.5);
    this.heart.setScale(0.8);

    this.currLives = maxLife;
    this.currLivesText = this.add.text(w - 60, -2, this.currLives, { fontFamily: 'Gamer', fontSize: 24, color: '#ffffff', align: 'center' });
    this.currLivesText.setOrigin(0.5);

    this.scoreBase = this.add.image(w / 2, 0, 'scoreBase').setOrigin(0.5);
    this.scoreBase.setScale(0.4);

    this.currScore = 0;
    this.currScoreText = this.add.text(w / 2, -2, this.currScore, { fontFamily: 'Gamer', fontSize: 24, color: '#ffffff', align: 'center' });
    this.currScoreText.setOrigin(0.5);

    this.powerBase = this.add.image(w - 50, 30, 'powerBase').setOrigin(0.45);
    this.powerBase.setScale(0.36);

    this.powerUp = this.add.image(w - 17, 30, 'powerUp').setOrigin(0.5);
    this.powerUp.setScale(0.1);

    this.currPowers = 0;
    this.currPowersText = this.add.text(w - 60, 28, this.currPowers + "/3", { fontFamily: 'Gamer', fontSize: 24, color: '#ffffff', align: 'center' });
    this.currPowersText.setOrigin(0.5);


    this.statusBarCon.add([this.coinBase, this.coin, this.coinsCollectedText, this.heartBase, this.heart, this.currLivesText, this.scoreBase, this.currScoreText, this.powerBase, this.currPowersText, this.powerUp]);

    this.moveGameStatusBar(-80);

    this.touchDownText = this.add.text(w / 2, 40, 'TOUCHDOWN!', { fontFamily: 'Gamer', fontSize: 74, color: '#ffffff', align: 'center' });
    this.touchDownText.setOrigin(0.5);
    this.touchDownText.setDepth(3);
    this.touchDownText.setAlpha(0);
	
	this.physics.add.collider(this.player, this.enemies, this.onCollision, null, this);
	
	this.physics.add.collider(this.player, this.coins, this.collectCoin, null, this);
	
	this.physics.add.collider(this.player, this.boosters, this.collectBooster, null, this);

  }
  
  collisionHandler() {
	  
	  console.log('Perfect collision detected!');
  }
  handleTouchdown() {
    console.log("Touchdown!");
    this.touchDownText.setAlpha(0);

    this.tweens.add({
      targets: this.touchDownText,
      duration: 100,
      ease: 'Linear',
      alpha: 1,
      onComplete: () => {
        this.time.delayedCall(700, () => {
          this.touchDownText.setAlpha(0);
          touchDownCount++;
        }, this);
      }
    });
  }
  playKitty() {
    if (firstLoad) {
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
    this.moveGameStatusBar(-80);
    this.shopContainer.setVisible(false);
    this.player.on('pointerdown', this.onPointerDown, this);
    this.player.on('pointerup', this.onPointerUp, this);
    this.player.setInteractive({ useHandCursor: true });
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
  updateShopDisplay() {
    let currdata = this.shopData[this.currShopIndex];
    let actor = this.shopData[this.currShopIndex].actor

    this.playerNameText.text = actor;
    this.playerTouchdownText.text = "OR\n" + this.shopData[this.currShopIndex].touchdowns + " TOUCHDOWNS";
    this.shopCoinValueText.text = this.shopData[this.currShopIndex].coins;
    let showShopBtn = false;
    if (this.coinscollected >= this.shopData[this.currShopIndex].coins || touchDownCount >= this.shopData[this.currShopIndex].touchdowns) {
      showShopBtn = true;
    }
    this.shopText.setVisible(showShopBtn);
    this.blueBar.setVisible(showShopBtn);
    console.log("actor", actor);
    switch (actor) {
      case "Rookie":
        this.player.setTexture('playerOne');
        this.player.anims.play('playerOneAnim', true);
        break;
      case "Big\nBen":
        this.player.setTexture('rayLewis');
        this.player.anims.play('rayLewisAnim', true);
        break;
      case "Mikael\nStronghat":
        this.player.setTexture('michaelStrahat');
        this.player.anims.play('michaelStrahatAnim', true);
        break;
      case "Bay\nNewest":
        this.player.setTexture('johnElway');
        this.player.anims.play('johnElwayAnim', true);
        break;
      case "Jeremy\nBettings":
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
    this.moveGameStatusBar(25);
    this.player.setPosition(w / 2, h / 2);
    this.player.off('pointerdown', this.onPointerDown, this);
    this.player.off('pointerup', this.onPointerUp, this);
    this.player.setInteractive({ useHandCursor: false });
    console.log("onshop");
  }
  moveGameStatusBar(yPos) {
    this.tweens.add({
      targets: this.statusBarCon,
      duration: 2000,
      ease: 'Back.Out',
      y: yPos
    });
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
  onPointerDown(pointer) {
	isSwiping = true;
	swipeStartPosition = new Phaser.Math.Vector2(pointer.x, pointer.y);
    playerClicked = true;
    this.moveShopBtn(h + 80);
    this.moveTitle(-80);
    this.moveGameStatusBar(25);
    this.instText.setVisible(false);
    //currRandomPoints = this.generateRandomPoints(15);
	currRandomPoints = [{x:100, y:150}, {x:150, y:250},{x:400, y:500},{x:250, y:250},{x:300, y:300},{x:350, y:350},{x:400, y:400},{x:250, y:350},{x:450, y:500},{x:200, y:350}]
	Phaser.Utils.Array.Shuffle(currRandomPoints);
	console.log("currRandomPoints", currRandomPoints);
	let posPoints = 0;
	if(!gameInProgress){
		timerEvent = this.time.addEvent({
		  delay: 1000,
		  callback: this.spawnEnemy,
		  callbackScope: this,
		  loop: true,
		});
		for (let i = 0; i < 3; i++) {
			this.addCoin(currRandomPoints[posPoints++]);
		}
		for (let i = 0; i < 3; i++) {
			this.addBooster(currRandomPoints[posPoints++]);
		}
	}
	gameInProgress = true;
	
  }
  addBooster(pos) {	
	let booster = this.boosters.create(pos.x, pos.y, 'powerUp');
	booster.setScale(0.15);
	this.physics.world.enable(booster);
	booster.setData('velocity', Phaser.Math.FloatBetween(0.1, 0.2));    
    booster.setData('offset', Phaser.Math.FloatBetween(0, Math.PI * 0.5));	
  }
  addCoin(pos) {	
	let coin = this.coins.create(pos.x, pos.y, 'coin');
	this.physics.world.enable(coin);
	coin.setData('velocity', Phaser.Math.FloatBetween(0.1, 0.2));    
    coin.setData('offset', Phaser.Math.FloatBetween(0, Math.PI * 0.5));	
  }
  handleSwipe(pointer) {
	  if (isSwiping) {
		let swipeEndPosition = new Phaser.Math.Vector2(pointer.x, pointer.y);
		let swipeVector = swipeEndPosition.subtract(swipeStartPosition);
		let swipeAngle = Phaser.Math.RadToDeg(Math.atan2(swipeVector.y, swipeVector.x));
		console.log("swipeAngle",swipeAngle);
		if(swipeAngle < 60){
			if (pointer.worldX < this.player.x) {
			  swipeAngle = -15;
			} else {
			  swipeAngle = 15;
			}
		}else{
			if (pointer.worldX < this.player.x) {
			  swipeAngle = -260;
			} else {
			  swipeAngle = 260;
			}
		}
		//console.log("swipeAngle",swipeAngle);
		this.player.angle = swipeAngle;
		
	  }else{
		  this.player.angle = 0;
	  }
  }
  onPointerUp(pointer) {
	isSwiping = false;
    playerClicked = false;
    if (timerEvent) {
      timerEvent.destroy();
    }
  }
  spawnEnemy() {
    const x = Phaser.Math.Between(-w/2, w + w/2);
    const enemy = this.enemies.create(x, -50, 'enemyOne');
    enemy.play("enemyOneAnim");
    enemy.setVelocityY(100);
	enemy.setScale(Phaser.Math.Between(0.4, 1));
	enemy.setVelocityY(Phaser.Math.Between(10, 50));
	this.physics.world.enable(enemy);
	levelEnemyReleased++;
	if(levelEnemyReleased == levelEnemyAllowed){
		if (timerEvent) {
		  timerEvent.destroy();
		}
	}
	
  }
  generateRandomPoints(numPoints) {
  var points = [];

  while (points.length < numPoints) {
    var x = Phaser.Math.Between(100, w - 100);
    var y = Phaser.Math.Between(100, h - 100);

    
    var isValid = points.every(function (existingPoint) {
      var distance = Phaser.Math.Distance.Between(x, y, existingPoint.x, existingPoint.y);
      return distance >= 80;
    });

    
    if (isValid) {
      points.push({ x: x, y: y });
    }
  }

  return points;
}
  onRetry() {
    gameOver = false;

    this.scene.restart();
    this.player.setPosition(w / 2, h / 2 + 160);
  }
  collectCoin(player, coin){
	  console.log("coin collected");	  
	  this.tweens.add({
        targets: coin,
        alpha: 0,
        scaleX: 2,
        scaleY: 2,
        duration: 500,
        ease: 'Power1',
        onComplete: function () {          
          this.coins.remove(coin);          
          coin.destroy();
		  this.coinscollected++;
		  this.coinsCollectedText.text = this.coinscollected;
        },
        callbackScope: this
      });
  }
  collectBooster(player, booster){
	  console.log("booster collected");	  
	  this.tweens.add({
        targets: booster,
        alpha: 0,
        scaleX: 0,
        scaleY: 0,
        duration: 500,
        ease: 'Power2',
        onComplete: function () {          
          this.boosters.remove(booster);          
          booster.destroy();
        },
        callbackScope: this
      });
  }
  onCollision() {
    gameOver = true;
    gameInProgress = false;
	levelEnemyReleased = 0;
    if (timerEvent) {
      timerEvent.destroy();
    }
    this.enemies.clear(true, true);
	this.coins.clear(true, true);
	this.boosters.clear(true, true);
    this.game.sound.stopAll();
    this.collide.play();
    this.smoke.setVisible(true);
    this.smoke.play("smokeAnim");
    this.smoke.setPosition(this.player.x, this.player.y);
    this.player.setVisible(false);
    this.tackledContainer.setVisible(true);
    //this.moveGameStatusBar(-80);
    //this.scene.restart();
  }
  update(time, delta) {
    if (gameOver) {
      return;
    }
    let speed = 5;
    let maxOffsetY = 2 * h + 100;
	if(this.boosters){
		this.boosters.getChildren().forEach(function (booster) {			
			let velocity = booster.getData('velocity');
			let offset = booster.getData('offset');
			booster.y = booster.y + Math.sin(offset) * 0.5;
			booster.setData('offset', offset + velocity);
		});
	}
	if(this.coins){
		this.coins.getChildren().forEach(function (coin) {			
			let velocity = coin.getData('velocity');
			let offset = coin.getData('offset');
			coin.y = coin.y + Math.sin(offset) * 0.5;
			coin.setData('offset', offset + velocity);
		});
	}
	if(this.enemies){
      this.enemies.children.iterate(function (enemy) {
        enemy.angle = Phaser.Math.RadToDeg(Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y)) + 90;
		this.physics.moveToObject(enemy, this.player, 100);
        
       }, this);
	   
	   
	  
    }
    

    if (this.grassRegular) {


      let imageHeight = this.grassRegular.displayHeight;
      let shiftImageHeight = imageHeight / 2.5;
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
      //this.grassRegularBar.y = this.grassRegular.y + halfImageHeight;
      //this.grassWinterBar.y = this.grassWinter.y + halfImageHeight;
      //this.grassRainBar.y = this.grassRain.y + halfImageHeight;
	  this.grassRegularBar.y = this.grassRegular.y - shiftImageHeight;
      this.grassWinterBar.y = this.grassWinter.y - shiftImageHeight;
      this.grassRainBar.y = this.grassRain.y - shiftImageHeight ;
      if (gameInProgress) {
        if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.grassRegularBar.getBounds()) ||
          Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.grassWinterBar.getBounds()) ||
          Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.grassRainBar.getBounds())) {
          if (!touchdownOccurred) {
            touchdownOccurred = true;
            this.handleTouchdown();
          }
        } else {
          touchdownOccurred = false;
        }
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
        //this.player.angle = 0;
      }

      const cursors = this.input.keyboard.createCursorKeys();

      /*if (cursors.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.angle = -15;
      } else if (cursors.right.isDown) {
        this.player.setVelocityX(160);
        this.player.angle = 15;
      } else if (!pointer.isDown) {
        this.player.setVelocityX(0);
        this.player.angle = 0;
      }*/


      /*this.physics.world.collide(
        this.player,
        this.enemies,
        this.onCollision,
        null,
        this
      );*/




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

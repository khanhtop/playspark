import Phaser from "phaser";


let gameType = "football";
let counter = 0;
let w = 0;
let h = 0;
let spinTimes = 5;

export default class WheelScene extends Phaser.Scene {
  public static instance: WheelScene;
  private bg : any;
  private base : any;
  private wheel : any;
  private pin : any;
  private font_style : any;
  private font_score : any;
  private game_text : any;
  private score_text : any;
  private pop : any;
  private music : any;

  constructor(newGameType: string) {
    super();
    WheelScene.instance = this;
    gameType = newGameType;
  }

  preload() {

    // this.load.image("bomb", "/pong/" + gameType + "/bomb.png");
    // // this.load.image("bombEffect", "/pong/" + gameType + "/bomb-effect.png");
    // this.load.image("boosterBall", "/pong/" + gameType + "/booster-ball.png");
    // this.load.image("boosterBat", "/pong/" + gameType + "/booster-bat.png");
    // this.load.image("boosterBatNum", "/pong/" + gameType + "/booster-bat.png");
    // this.load.spritesheet('bombEffect', "/pong/" + gameType + "/bomb-effect.png", { frameWidth: 200, frameHeight: 200 });
    // this.load.spritesheet('playerAnim', "/pong/" + gameType + "/player-animation.png", { frameWidth: 180, frameHeight: 300 });

    // this.load.image("ball", "/pong/" + gameType + "/ball.png");
    // this.load.image("peck", "/pong/" + gameType + "/player-static-catch.png");
    // this.load.image("bg", "/pong/" + gameType + "/bg.png");
    // //this.load.image('bgGls', '/pong' + gameType + 'n/bgGoals.png');
    // this.load.image("heart", "/pong/" + gameType + "/heart.png");
    // this.load.image("score", "/pong/" + gameType + "/score.png");

    // this.load.image("middleAd", "/pong/" + gameType + "/middleAd.png");

    // this.load.image("wheelspin", "/pong/" + gameType + "/spin.png");



    this.load.audio("bg", "/pong/" + gameType + "/sfx/bgNoise.mp3");
    // this.load.audio("whistle", "/pong/" + gameType + "/sfx/startWhistle.mp3");
    // this.load.audio("ballHit", "/pong/" + gameType + "/sfx/ballHit.mp3");
    // this.load.audio("goal", "/pong/" + gameType + "/sfx/goalScored.mp3");
    // this.load.audio("lost", "/pong/" + gameType + "/sfx/goalConceded.mp3");
    // this.load.audio("final", "/pong/" + gameType + "/sfx/finalWhistle.mp3");
    // this.load.audio("loselife", "/pong/" + gameType + "/sfx/loseLife.mp3");
    // this.load.audio("lifeup", "/pong/" + gameType + "/sfx/lifeup.mp3");
    // this.load.audio("booster", "/pong/" + gameType + "/sfx/booster.mp3");
    // this.load.audio("bomb", "/pong/" + gameType + "/sfx/bomb.mp3");
    // this.load.audio("powerup", "/pong/" + gameType + "/sfx/powerup.mp3");

    console.log("Preload");
    this.load.image('background', "/pong/" + gameType + '/back3.jpg');
    this.load.image('wheel', "/pong/" + gameType + '/whl.png');
    this.load.image('pin', "/pong/" + gameType + '/pin.png');
    this.load.image('button', "/pong/" + gameType + '/spin.png');
    
    this.load.image('base', "/pong/" + gameType + '/base1.png');
    this.load.audio('audio1', ["/pong/" + gameType + '/spina.mp3']);
    this.load.audio('pop', ["/pong/" + gameType + 
        '/pop.mp3'
    ]);


    w = this.game.canvas.clientWidth;
    h = this.game.canvas.clientHeight;

  }

  // 400 800

  create() {
    // this.sound.add("bg").setVolume(0.3).setLoop(true).play();

    this.bg=this.add.sprite(0, 0,'background').setOrigin(0).setDisplaySize(w, h);;
    // this.bg.setScale(1);
    
    
    this.base=this.add.sprite(w/2,h/2+170,'base');
    this.base.setScale(0.2);
    
    this.wheel=this.add.sprite(w/2,h/2,'wheel');
    this.wheel.setScale(0.65);
    
    
    this.pin=this.add.sprite(w/2,h/2-170,'pin');
    this.pin.setScale(0.25);

 
   
    this.font_style={
        font:"bold 15px Roboto",
        align:"center",
        color:"white",
        fontSize: "15px",
    }
    this.font_score={
        font:"bold 15px Roboto",
        align:"center",
        color:"white",
        fontSize: "15px",
    }
    this.game_text=this.add.text(10,10,"Tap to Spin",this.font_style);
    // this.game_text=this.add.text(10,10,"Welcome to Spin & Win",this.font_style);

    this.score_text = this.add.text(w - 70, 10,"Score : 0",  this.font_score);


    var but = this.add.image(w / 2,50,'button').setInteractive();
    but.on('pointerup', this.spinwheel, this);
    but.setScale(0.6);


    this.music = this.sound.add('audio1');
    this.pop = this.sound.add('pop');

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

    spinTimes = 5;
    setTimeout(() => this.startRound(), 2500);
  }

  public spinwheel(){

    if(spinTimes <= 0) {
      this.endRound();
    }
    spinTimes--;

    this.music.play();
    let rounds = Phaser.Math.Between(5,8);
    var degree=Phaser.Math.Between(0,11)*30;
    let total = rounds*360+degree+15;
    
    let tween = this.tweens.add({
        targets:this.wheel,
        angle:total,
        ease:"Cubic.easeOut",
        duration:6000,
        callbackScope:this,
        onComplete:function(){
            counter = counter +(12-(degree/30));
              this.music.stop();
              this.pop.play();
            // this.game_text.setText("spins "+(12-(degree/30)));
            this.game_text.setText("spins " + spinTimes);
            this.score_text.setText("Score : " + counter);
        }
    });
  }

  endRound() {
    this.cameras.main.fadeOut(1000);
    this.scoreHandler(counter);
  }

  startRound() {


  }


  update(time, delta) {
    // this.aiUpdate(time, delta);

  }
}

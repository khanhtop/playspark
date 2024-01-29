import Phaser from "phaser";


let gameType = "football";
let counter = 0;
let w = 0;
let h = 0;
let wheelR = 0;
let centerH = 0;
let centerW = 0;
let centerX = 0;
let centerY = 0;
let btnW = 0;
let btnH = 0;
let spinTimes = 5;
let bonus = {};
let win_bone = [];
let lose_bone = [];
let win_probability = 0;
let isSpinBtn = false;

export default class WheelScene extends Phaser.Scene {
  public static instance: WheelScene;
  private bg : any;
  private logo : any;
  private base : any;
  private wheel : any;
  private wheelGroup : any;
  private pin : any;
  private bonus_top : any;
  private font_style : any;
  private font_score : any;
  private font_text_style : any;
  private game_text : any;
  private score_text : any;
  private result_text : any;
  private pop : any;
  private music : any;
  private win : any;
  private lose : any;
  private bonus : any;
  private prizeAnim : any;
  private params: any;
  private outCircle : any;
  private topUI : any;
  private downUI : any;
  private arrow : any;
  private item : any;


  constructor(newGameType: string, newParams: any) {
    super();
    WheelScene.instance = this;
    gameType = newGameType;
    this.params = newParams
    console.log(newParams)
    this.params.backgroundSprite = !!this.params.backgroundSprite? this.params.backgroundSprite : "/pong/" + gameType + '/back3.jpg';
  }

  preload() {
    let fontUrl = "/pong/" + gameType + '/TitanOne-Regular.ttf';
    const font = new FontFace('customFont', `url(${fontUrl})`);
    font.load().then(() => {
      // Font loaded successfully
      document.fonts.add(font);
    }).catch((error) => {
      // Font failed to load
      console.log('Failed to load font:', error);
    });

    this.load.audio("bg", "/pong/" + gameType + "/sfx/bgNoise.mp3");

    console.log("Preload");
    this.load.image('logo', this.params.logo);
    this.load.image('background',this.params.backgroundSprite);
    this.load.image('ui-center', "/pong/" + gameType + '/out-circle.png');
    this.load.image('ui-btn-top', "/pong/" + gameType + '/ui-top.png');
    this.load.image('ui-btn-down', "/pong/" + gameType + '/ui-down.png');
    this.load.image('bonus', "/pong/" + gameType + '/bonus.png');

    this.load.image('ui-btn', "/pong/" + gameType + '/ui-btn-down.png');

    this.load.image('out-circle', "/pong/" + gameType + '/out-circle.png');
    this.load.image('center-arrow', "/pong/" + gameType + '/center-arrow.png');

    this.load.image('wheel', "/pong/" + gameType + '/center-circle.png');
    this.load.image('item', "/pong/" + gameType + '/item.png');
    this.load.image('star', "/pong/" + gameType + '/star.png');
    this.load.image('lose', "/pong/" + gameType + '/lose.png');
    this.load.image('button', "/pong/" + gameType + '/spin.png');

    this.load.spritesheet('prize-anim', "/pong/" + gameType + "/prize-anim.png", { frameWidth: 160, frameHeight: 320 });
    
    // this.load.image('base', "/pong/" + gameType + '/base1.png');
    this.load.audio('audio1', ["/pong/" + gameType + '/spina.mp3']);
    this.load.audio('pop', ["/pong/" + gameType + 
        '/pop.mp3'
    ]);

    this.load.audio('win', "/pong/" + gameType + '/win.mp3');
    this.load.audio('lose', "/pong/" + gameType + '/lose.mp3');
    this.load.audio('bonus', "/pong/" + gameType + '/bonus.mp3');

    // this.load.font('customFont', "/pong/" + gameType + '/TitanOne-Regular.ttf');

    w = this.game.canvas.clientWidth;
    h = this.game.canvas.clientHeight;
    wheelR = w / 1.2;

    centerW = w * 0.97;
    centerH = h * 0.8;
    centerX = w / 2;
    centerY = h * 0.05;
  }

  // 400 800

  create() {
    // this.sound.add("bg").setVolume(0.3).setLoop(true).play();


    this.bg=this.add.sprite(0, 0,'background').setOrigin(0).setDisplaySize(w, h);
    // this.bg.setScale(1);
    // this.logo=this.add.sprite(w / 2, 30,'logo').setOrigin(0.5, 0).setDisplaySize(w * 0.5, 70);
    
    //this.add.sprite(centerX, centerY, 'ui-center').setOrigin(0.5, 0).setDisplaySize(centerW, centerH);
    

    
    // this.wheel.setScale(0.65);
    let offsetY = 50;
    this.base=this.add.sprite(w / 2, h / 2 - wheelR / 2 - 10 + offsetY, 'ui-btn-top').setDisplaySize(w / 2, w / 2 * 513 / 982);
    this.add.sprite(w / 2, h / 2 + wheelR / 2 + offsetY, 'ui-btn-down').setDisplaySize(w / 4, w / 4 * 389 / 514);
    this.outCircle = this.add.sprite(w / 2, h / 2 + offsetY, 'out-circle').setDisplaySize(wheelR, wheelR);

    this.wheel=this.add.sprite(w/2, h/2 + offsetY,'wheel').setDisplaySize(wheelR * 0.8, wheelR * 0.8);

    this.arrow = this.add.sprite(w / 2, h / 2 - 15 + offsetY, 'center-arrow').setDisplaySize(w / 10, w / 10 * 281 / 155);
    
    this.item = this.add.sprite(w/2, h/2 + offsetY, 'item').setDisplaySize(wheelR * 0.7, wheelR * 0.7 * 927 / 1022);

    // this.pin=this.add.sprite(w/2,h/2-170,'pin');
    // this.pin.setScale(0.25);

    const anim = this.anims.generateFrameNumbers('prize-anim', { start: 0, end: 140 });
    this.anims.create({
      key: 'prize',
      frames: anim,
      frameRate: 24,
      repeat: 0
    });
   

    this.prizeAnim = this.add
    .sprite(w / 2, h / 2 - 80 + offsetY, "prize-anim")
    .setDisplaySize(w * 0.8, w * 1.6)
    .setOrigin(0.5, 0.5)

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

    this.font_text_style = { 
      fontFamily: 'customFont', 
      fontSize: '58px', 
      align:"center",
      fill: '#ffffff' 
    }
    
    this.game_text=this.add.text(10,10 + offsetY,"Tap to Spin",this.font_style).setVisible(false);
    // this.game_text=this.add.text(10,10,"Welcome to Spin & Win",this.font_style);

    this.score_text = this.add.text(w - 70, 10 + offsetY,"Score : 0",  this.font_score).setVisible(false);

    this.result_text = this.add.text(w / 2, h / 2 + offsetY, "SPIN AGAIN!", this.font_text_style).setOrigin(0.5, 0.5).setAlpha(0);

    // BONUS TEXT PART
    // this.bonus_top = this.add.sprite(w/2 + 10, h / 2 - wheelR / 2 - 100 + offsetY, 'bonus').setDisplaySize(wheelR * 0.15, wheelR * 0.15);
    // this.add.text(w / 2 - 70, h / 2 - wheelR / 2 - 100 + offsetY, "WIN", {...this.font_text_style, fontSize: '45px'}).setOrigin(0.5, 0.5);
    // this.add.text(w / 2 + 45, h / 2 - wheelR / 2 - 100 + offsetY, "800", {...this.font_text_style, fontSize: '45px'}).setOrigin(0, 0.5);

    // var but = this.add.image(w / 2,50,'button').setInteractive();
    // but.on('pointerup', this.spinwheel, this);
    // but.setScale(0.6);

    var but = this.add.image(w / 2, h / 2 + wheelR / 2 + 35 + offsetY, 'ui-btn').setDisplaySize(w / 2.5, w / 2.5 * 0.4).setOrigin(0.5, 0).setInteractive();
    but.on('pointerup', this.spinwheel, this);
    // but.setScale(0.6);

    // var btn = this.add.image(centerX, centerY + centerH - 100, 'ui-btn-down').setDisplaySize(w / 3, 50).setInteractive();
    // btn.on('pointerup', this.spinwheel, this);


    this.music = this.sound.add('audio1');
    this.pop = this.sound.add('pop');
    this.win = this.sound.add('win');
    this.lose = this.sound.add('lose');
    this.bonus = this.sound.add('bonus');

    this.cameras.main.postFX.addVignette(0.5, 0.5, 0.975);
    this.cameras.main.postFX
      .addColorMatrix()
      .contrast(1.25)
      .polaroid()
      .brightness(0.9);

    this.initGame();

    bonus = {
      0 : {
        amount: 20,
        type: "bonus"
      },
      1 : {
        amount: 0,
        type: "lose"
      },
      2 : {
        amount: 1,
        type: "spin"
      },
      3 : {
        amount: 20,
        type: "bonus"
      },
      4 : {
        amount: 0,
        type: "lose"
      },
      5 : {
        amount: 20,
        type: "bonus"
      },
      6 : {
        amount: 0,
        type: "lose"
      },
      7 : {
        amount: 1,
        type: "spin"
      },
      8 : {
        amount: 20,
        type: "bonus"
      },
      9 : {
        amount: 0,
        type: "lose"
      },

    }

    win_bone = [0, 3, 5, 8]
    lose_bone = [1, 4, 6, 9]
  }

  private scoreHandler;

  public setScoreHandle(handleScore: any) {
    this.scoreHandler = handleScore;
  }

  public initGame(lives = 3) {
    this.cameras.main.fadeIn(1200);
    spinTimes = 1;
    this.game_text.setText("spins " + spinTimes);
    setTimeout(() => this.startRound(), 2500);
  }

  public spinwheel(){
    if(isSpinBtn) return;
    isSpinBtn = true;

    win_probability = this.params.winProbability;
    console.log(this.params.winProbability)

    if(spinTimes <= 0) {
      this.endRound();
    }
    // spinTimes--;

    this.music.setLoop(true).play();
    let deltaAmount = 10;
    let deltaDegree = 360 / deltaAmount
    let rounds = Phaser.Math.Between(5, 8);
    var degree=Phaser.Math.Between(0, deltaAmount - 1) * deltaDegree;
    
    if(Math.random() > win_probability) {
      degree = 9 - win_bone[Math.round(100 * Math.random()) % win_bone.length];
    } else {
      degree = 9 - lose_bone[Math.round(100 * Math.random()) % lose_bone.length];
    }
    console.log(degree, "--------------selelct", bonus[degree])

    degree = degree * deltaDegree;
    let total = rounds * 360 + degree;

    let tween = this.tweens.add({
        targets:this.wheel,
        angle:total,
        ease:"Cubic.easeOut",
        duration:5000,
        callbackScope:this,
        onComplete:function(){
            this.music.stop();
            // this.pop.play();
            let index = (deltaAmount - (degree / deltaDegree)) % deltaAmount;
            let status = bonus[index];
            this.score(status)

            console.log(status, index);
            isSpinBtn = false;
        },
        onUpdate: function(tween, target) {
          this.item.setAngle(target.angle);
      },
    });
  }

  score({type, amount}) {

    let resultText = "";

    if(type == 'bonus') {

      // this.bonus_top.setScale(0)
      // .setAlpha(0)

      // this.tweens.add({
      //   targets: this.bonus_top,
      //   scaleX: 0.2, // Scale to 1 (original size)
      //   scaleY: 0.2,
      //   alpha: 1, // Fade in to full opacity
      //   duration: 600, // Duration of the animation in milliseconds
      //   ease: 'Bounce', // Easing function for a bouncing effect
      // });

      // setTimeout(() => {
      //   if(!!this.bonus_top) {
      //     this.bonus_top.setAlpha(0);
      //   }
      // }, 2000);

      resultText = "YOU WIN!"
      this.win.play();
      counter += amount;
      this.prizeAnim.play('prize')

    } else if(type == 'lose') {
      spinTimes -= amount;
      resultText = "NO LUCK!"
      this.lose.play();

    } else if(type == 'spin') {
      resultText = "SPIN AGAIN!"
      spinTimes += amount;
      this.bonus.play();
      this.prizeAnim.play('prize')
    }
    this.game_text.setText("spins " + spinTimes);
    this.score_text.setText("Score : " + counter);

    this.result_text.setText(resultText);

    this.result_text.setScale(0)
    .setAlpha(0)

    this.tweens.add({
      targets: this.result_text,
      scaleX: 1, // Scale to 1 (original size)
      scaleY: 1,
      alpha: 1, // Fade in to full opacity
      duration: 600, // Duration of the animation in milliseconds
      ease: 'Bounce', // Easing function for a bouncing effect
    });

    setTimeout(() => {
      if(!!this.result_text) {
        this.result_text.setAlpha(0);
      }
    }, 2000);

    if(type == 'bonus') {
      setTimeout(() => {
       this.endRound();
      }, 4000);
    }
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

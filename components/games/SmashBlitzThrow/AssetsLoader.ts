export class AssetsLoader {
  scene: Phaser.Scene;
  constructor(_scene: Phaser.Scene) {
    this.scene = _scene;
  }
  public load(gameType: string, params: any) {
    //backgroundSprite: objectSprite: playerSprite:

    if (params != undefined) {
      // console.log("----[[[ params ----", params)
 
      this.scene.load.image("bg", params.backgroundSprite);
      this.scene.load.image("body", params.playerSprite);
      this.scene.load.image("bomb", params.enemySprite);
      this.scene.load.image("ball", params.objectSprite);
      this.scene.load.image("powerup", params.powerUpSprite);

      this.scene.load.image("gold_ball", params.additionalSpriteOne);
      this.scene.load.image("purple_ball", params.additionalSpriteOne);
      this.scene.load.image("blue_ball", params.additionalSpriteOne);

      this.scene.load.image("super_gold", params.additionalSpriteTwo);

      this.scene.load.image("shoes", params.additionalSpriteThree);

      this.scene.load.image("head", params.additionalSpriteFour);
      
      this.scene.load.image("right_hand", params.additionalSpriteFive);
      this.scene.load.image("left_hand",params.additionalSpriteSix);
    }

    let baseUrl = "/"; ///pong/${gameType}/

    if (gameType != "") baseUrl = `/pong/${gameType}/`;
    this.scene.load.setBaseURL(baseUrl);

    if (params == undefined) {
      // console.log("----[[[ params undefined ----")
      this.scene.load.image("bg", "bg.jpg");
      this.scene.load.image("ball", "ball.png");
      this.scene.load.image("powerup", "powerup.png");
      this.scene.load.image("bomb", "bomb.png");
      this.scene.load.image("gold_ball", "purple_ball.png");
      this.scene.load.image("purple_ball", "purple_ball.png");
      this.scene.load.image("blue_ball", "purple_ball.png");
      this.scene.load.image("super_gold", "gold_ball.png");
      this.scene.load.image("shoes", "shoes.png");
      this.scene.load.image("head", "head.png");
      this.scene.load.image("right_hand", "right_hand.png");
      this.scene.load.image("left_hand", "left_hand.png");
      this.scene.load.image("body", "body.png");
    }

    this.scene.load.image("rocket", "rocket.png");
    this.scene.load.image("fire", "fire.png");
    this.scene.load.image("ball2", "ball2.png");
    this.scene.load.image("arrow_head", "arrow_head.png");
    this.scene.load.image("arrow_green", "arrow_green.png");
    this.scene.load.image("budget_bg", "budget_bg.png");
    this.scene.load.image("score_pan", "score_pan.png");
    this.scene.load.image("rounded_rectangle", "rounded_rectangle.png");
    this.scene.load.image("rounded_rectangle2", "rounded_rectangle2.png");
    this.scene.load.image("goal", "goal.png");
    this.scene.load.image("popup_bg", "popup_bg.png");
    this.scene.load.image("popup_bg_white", "popup_bg_white.png");
    this.scene.load.image("popup_bg_btns", "popup_bg_btns.png");
    this.scene.load.image("blue_btn", "blue_btn.png");
    this.scene.load.image("coins", "coins.png");
    this.scene.load.image("green_ads_btn", "green_ads_btn.png");

    this.scene.load.image("center", "center.png");
    this.scene.load.image("audio_btn", "audio-set.png");
    this.scene.load.image("pause_play", "stop-play.png");
    // this.scene.load.image("pause", "pause.png");
    this.scene.load.image("quit", "quit.png");
    this.scene.load.image("resume", "resume.png");
    this.scene.load.image("pointer", "pointer.png");
    this.scene.load.image("power_progress", "power_progress.png");

    this.scene.load.audio("background", "background.mp3");
    this.scene.load.audio("wrong", "Crowd_v1_Booing_wav.wav");
    this.scene.load.audio("point", "DM_CGS_45.wav");
    this.scene.load.audio("powerup", "DM_CGS_28.wav");
    this.scene.load.audio("victory", "Victory_v1_wav.wav");

    /*this.scene.load.spritesheet("p1_push_back", "p1_push_back.png", {
      frameWidth: 214.28,
      frameHeight: 300,
    });
    this.scene.load.spritesheet("p1_throwing", "p1_throwing.png", {
      frameWidth: 214.28,
      frameHeight: 300,
    });

    this.scene.load.spritesheet("p1_player_ready", "p1_player_ready.png", {
      frameWidth: 200,
      frameHeight: 300,
    });*/

    this.scene.load.spritesheet("power_effect", "power_effect.png", {
      frameWidth: 421,
      frameHeight: 68,
    });

    this.scene.load.spritesheet("ball_effect", "ball_effect.png", {
      frameWidth: 500,
      frameHeight: 500,
    });
    this.fontLoader("score_font", baseUrl + "erbosdraco_nova_open_nbp.woff");
    this.fontLoader("budget_font", baseUrl + "Bangers-Regular1.ttf");
    this.fontLoader("bebas_font", baseUrl + "BebasNeue-Regular.ttf");
    this.fontLoader("titan_one_regular", baseUrl + "TitanOne-Regular.ttf");
  }

  fontLoader(name: string, url: string) {
    const font = new FontFace(name, `url(${url})`);
    font
      .load()
      .then(() => {
        document.fonts.add(font);
      })
      .catch((error) => {
        console.log(`Failed to load ${url} :`, error);
      });
  }
}

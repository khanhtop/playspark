import Phaser from 'phaser';
import { getImageWithSize } from "@/helpers/cloudinary";

let gameType = 'football';
let counter = 0;
let w = 0;
let h = 0;
let btnW = 0;
let btnH = 0;
let spinTimes = 5;
let bonus = {};
let win_bone = [];
let lose_bone = [];
let win_probability = 0;
let wicket_val = 0;
let runs_left_val = 0;
let runs_right_val = 0;
let overs_left_val = 0;
let overs_right_val = 0;
let pos_x = 0;
let pos_y = 0;
let power = 0;
let wickets = 10;
let isClicked = true;
let default_power_length = 20;
let author_id = 1;
let score2_cnt = 0;
let score4_cnt = 0;
let score6_cnt = 0;
let scoreFire_cnt = 0;
let scoreOut_cnt = 0;
let multi_4_6_cnt = 0;
let g = 9.8;
let init_speed = 0;
let angle = 0.6;
let over_cnt = 0;
let score6effect_x = 0;
let score6effect_y = 0;

let green_powerup_cnt = 0;
let red_powerup_cnt = 0;

let score6_array = [];
let double6_cnt = 0;
let double4_cnt = 0;
let battery_cnt = 0;
let isFireballRunnig = false;


let player_name = [
  "Striker Steve",
  // "Pakistan",
  // "Gus\n Wicketland",
  // "James\n Bouncer",
  // "Mitch\n Bowlstotheleft",
  // "Merv\n HowzatHughes", 
  // "Mark\n ThirdMan",
  // "Greg\n Batwett",
  // "Mark\n Overwaugh",
  // "Wicket\n Akram",
  // "Callum\n Fieldson",
  // "Aaron\n Inswing",
  // "Darren\n Legspinmann",
  // "Sir Ian\n Boundaryham",
  // "Boundary\n Lara",
]

let player_name1 = [
  "Striker Steve",
  // "Pakistan",
  // "Gus Wicketland",
  // "James Bouncer",
  // "Mitch Bowlstotheleft",
  // "Merv HowzatHughes", 
  // "Mark ThirdMan",
  // "Greg Batwett",
  // "Mark Overwaugh",
  // "Wicket Akram",
  // "Callum Fieldson",
  // "Aaron Inswing",
  // "Darren Legspinmann",
  // "Sir Ian Boundaryham",
  // "Boundary Lara",
]


let player_sprite_names = [
  "australia_player_ready",
  // "pakistan_player_ready",
  // "p3_player_ready",
  // "p4_player_ready",
  // "p5_player_ready",
  // "p6_player_ready",
  // "p7_player_ready",
  // "p8_player_ready",
  // "p9_player_ready",
  // "p10_player_ready",
  // "p11_player_ready",
  // "p12_player_ready",
  // "p13_player_ready",
  // "p14_player_ready",
  // "p15_player_ready",
]

const nAdditionalPlayers = player_name.length + 1;

let player_socre = [
  0, 0, 50, 100, 200, 300, 400, 450, 500, 600, 650, 700, 750, 800, 1000
]

let n = 1;

export default class newCricketSmashScene extends Phaser.Scene {
  public static instance: newCricketSmashScene;
  private bg: any;
  private logo: any;
  private font_style: any;
  private font_score: any;
  private font_text_style: any;
  private game_text: any;
  private stop_play: any;
  private audio_set: any;
  private lightNumText: any;
  private hitEffect!: any;

  private score_fire: any;
  private score1: any;
  private score2: any;
  private score_out: any;
  private score4: any;
  private score6: any;
  private score_battery: any;
  private score_red: any;
  private score_green: any;
  private score_wicket: any;

  private fire: any;
  private score_pan_wickets: any;
  private score_pan_runs: any;
  private score_pan_overs: any;
  private wickets_text: any;
  private runs_text: any;
  private overs_text: any;
  private score_text_style: any;
  private runs_text_style: any;
  private fence_icon: any;
  private fence_text: any;
  private fence_text_style: any;
  private wicket_icon: any;
  private wicket: any;
  private wicket_font: any;
  private runs_left: any;
  private runs_right: any;
  private runs_font: any;
  private overs_left: any;
  private overs_right: any;
  private fireSprite: any;
  private batterySprite: any;
  private redSprite: any;
  private greenSprite: any;
  private auth_select_bg: any;
  private auth_country: any;
  private country_text_style;
  private auths: any;
  private auths_left: any;
  private auths_right: any;
  private auth_select_btn: any;
  private auth_select_group: Phaser.GameObjects.Group;
  private ui_item: any;
  private player: any;
  private is_battery: any;
  // private ball: Phaser.GameObjects.Image;
  private ball: any;
  private ballEffect: any;
  private left_fall: any;
  private right_fall: any;
  private flag: boolean;
  private power_flag: boolean;
  private count_flag: boolean;
  private scorePanel: any;
  private overlapScore1: any;
  private overlapScore2: any;
  private overlapScore4: any;
  private overlapScore6: any;
  private cricket_bar: any;
  private updateAuthorImage: any;
  private pause_group: any;
  private pause_pan: any;
  private pause_player: any;
  private player_country: any;
  private game_state: any;
  private current_score: any;
  private current_over: any;
  private resume_btn: any;
  private quit_btn: any;
  private pause_text_style: any;
  private player2: any;
  private score6_effect: any;
  private score6Sprite: any;
  private runs_show: any;
  private runs_6_font: any;
  private ball_effect: any;
  private Crowd_Cheers_v1_wav: any;
  private Crowd_Loop_v1_wav: any;
  private Crowd_v1_Booing_wav: any;
  private DM_CGS_28: any;
  private DM_CGS_45: any;
  private Baseball_Hit_v1_wav: any;
  private success_fanfare_trumpets_6185: any;
  private Victory_v1_wav: any;
  private level: any;
  private levelDesign: any;
  private scoreDesign: any;
  private help_board_group: any;
  private updateRunsShow: any;
  private scoreList1: any;
  private scoreList2: any;
  private getRandomNumbers: any;
  private unlock_green: any;
  private unlock_red: any;
  private unlock_battery: any;
  private unlock_wicket: any;
  private unlockHeaderStyle: any;
  private unlockHeaderStyle_g: any;
  private unlockBodyStyle: any;
  private unlockBodyStyle_g: any;

  private green_text_group: any;
  private green_effect: any;
  private green_text_header: any;
  private green_text_header_g: any;
  private green_text_header_e: any;
  private green_text_body: any;
  private green_text_body2: any;
  private green_text_body_g: any;
  private green_text_body_e: any;

  private red_text_group: any;
  private red_effect: any;
  private red_text_header: any;
  private red_text_header_g: any;
  private red_text_header_e: any;
  private red_text_body: any;
  private red_text_body2: any;
  private red_text_body_g: any;
  private red_text_body_e: any;

  private battery_text_group: any;
  private battery_text_header: any;
  private battery_text_header_g: any;
  private battery_text_header_e: any;
  private battery_text_body: any;
  private battery_text_body_g: any;
  private battery_text_body_e: any;
  private battery_text_body2: any;

  private wicket_text_group: any;
  private wicket_text_header: any;
  private wicket_text_header_g: any;
  private wicket_text_header_e: any;
  private wicket_text_body: any;
  private wicket_text_body_g: any;
  private wicket_text_body_e: any;
  private wicket_text_body2: any;
  private gray_bg: any;
  private game_pause: any;

  private unlock_player_group: any;

  private wicketbar: any;
  private wicketbar_effect: any;

  private green_powerup_group: any;
  private is_green_powerup: any;
  private green_powerup_anim: any;
  private green_powerup_img: any;

  private red_powerup_group: any;
  private battery_powerup_group: any;
  private is_red_powerup: any;
  private red_powerup_anim: any;
  private red_powerup_img: any;
  private is_double4: any;
  private is_double6: any;

  private score6_1: any;
  private score6_2: any;
  private score6_3: any;
  private score6_4: any;
  private score6_5: any;

  private overlapScore6_1: any;
  private overlapScore6_2: any;
  private overlapScore6_3: any;
  private overlapScore6_4: any;
  private overlapScore6_5: any;

  private hitball_effect: any;
  private balltest: any;

  private is_random: any;
  private power_effect: any;
  private progress_effect: any;

  private is_audio_setting: any;
  private audioSystem: any;
  private NEW: any;
  
  private params: any;
  private mark: any;

  private audio_hit5: any;
  private audio_hit10: any;
  private audio_kick: any;
  private audio_missball: any;
  private audio_hitenemy: any;
  private audio_powerup: any;

  private hit6_sounds: any;
  backgroundAudio: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
  score_out1: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(newGameType: string, newParams: any) {
    super();
    newCricketSmashScene.instance = this;
    gameType = newGameType;
    this.params = newParams;

    console.log(newParams, "----------")
    this.params.maxscore = !!this.params.maxscore? this.params.maxscore : 0;

    this.params.additionalSpriteTwo = !!this.params.additionalSpriteTwo? this.params.additionalSpriteTwo : '/pong/' + gameType + '/50.png';
    this.params.additionalSpriteOne = !!this.params.additionalSpriteOne? this.params.additionalSpriteOne : '/pong/' + gameType + '/49.png';
    this.params.backgroundSprite = !!this.params.backgroundSprite? this.params.backgroundSprite : '/pong/' + gameType + '/background.jpg';
    this.params.powerUpSprite = !!this.params.powerUpSprite? this.params.powerUpSprite : '/pong/' + gameType + '/45.png';
    this.params.enemySprite = !!this.params.enemySprite? this.params.enemySprite : '/pong/' + gameType + '/46.png';
    this.params.enemySprite = !!this.params.enemySprite? this.params.enemySprite : '/pong/' + gameType + '/46.png';
    this.params.additionalSpriteThree  = !!this.params.additionalSpriteThree ? this.params.additionalSpriteThree  : '/pong/' + gameType + '/51.png';
    this.params.playerSprite = !!this.params.playerSprite ? this.params.playerSprite : '/pong/' + gameType + `/p1_player_anim.png`;
  }

  preload() {
    
    // Display a loading progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(width / 2 - 160, height / 2 - 30, 320, 50);

    const loadingBar = this.add.graphics();

    this.load.on('progress', (value) => {
      loadingBar.clear();
      loadingBar.fillStyle(0xffffff, 1);
      loadingBar.fillRect(width / 2 - 150, height / 2 - 20, 300 * value, 30);
    });

    this.load.on('complete', () => {
      loadingBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
    });




    let fontUrl = '/pong/' + gameType + '/Bangers-Regular.ttf';
    const font = new FontFace('customFont', `url(${fontUrl})`);

    font
      .load()
      .then(() => {
        // Font loaded successfully
        document.fonts.add(font);
      })
      .catch((error) => {
        // Font failed to load
        console.log('Failed to load font:', error);
      });

    let score_fontUrl = '/pong/' + gameType + '/bazaronite.regular.ttf';

    const font2 = new FontFace('scoreFont', `url(${score_fontUrl})`);

    font2
      .load()
      .then(() => {
        // Font loaded successfully
        document.fonts.add(font2);
      })
      .catch((error) => {
        // Font failed to load
        console.log('Failed to load font222222222222222222:', error);
      });
    // this.load.audio("bg", "/pong/" + gameType + "/sfx/bgNoise.mp3");

    console.log('Cricket');
    //load images
    this.load.audio(
      'Crowd_Cheers_v1_wav',
      '/pong/' + gameType + '/Crowd_Cheers_v1_wav.wav'
    );
    this.load.audio(
      'Crowd_Loop_v1_wav',
      '/pong/' + gameType + '/background.wav'
    );
    this.load.audio(
      'Crowd_v1_Booing_wav',
      '/pong/' + gameType + '/Crowd_v1_Booing_wav.wav'
    );
    this.load.audio('DM_CGS_28', '/pong/' + gameType + '/DM_CGS_28.wav');
    this.load.audio('DM_CGS_45', '/pong/' + gameType + '/DM_CGS_45.wav');
    this.load.audio(
      'Baseball_Hit_v1_wav',
      '/pong/' + gameType + '/Baseball_Hit_v1_wav.wav'
    );
    this.load.audio(
      'success-fanfare-trumpets-6185',
      '/pong/' + gameType + '/success-fanfare-trumpets-6185.mp3'
    );
    this.load.audio(
      'Victory_v1_wav',
      '/pong/' + gameType + '/Victory_v1_wav.wav'
    );

    this.load.audio(
      'Victory_v1_wav',
      '/pong/' + gameType + '/Victory_v1_wav.wav'
    );
    this.load.audio(
      'Victory_v1_wav',
      '/pong/' + gameType + '/Victory_v1_wav.wav'
    );
    this.load.audio(
      'Victory_v1_wav',
      '/pong/' + gameType + '/Victory_v1_wav.wav'
    );
    this.load.audio(
      'Victory_v1_wav',
      '/pong/' + gameType + '/Victory_v1_wav.wav'
    );
    this.load.audio(
      'Victory_v1_wav',
      '/pong/' + gameType + '/Victory_v1_wav.wav'
    );

    this.load.audio('kick', '/pong/' + gameType + '/audio/new/Kick_FootBall_v1_variation_03_wav.wav');
    this.load.audio('powerup', '/pong/' + gameType + '/audio/new/powerup.wav');
    this.load.audio('hit5', '/pong/' + gameType + '/audio/new/hit5.wav');
    this.load.audio('hit10', '/pong/' + gameType + '/audio/new/hit10.wav');
    this.load.audio('hitenemy', '/pong/' + gameType + '/audio/new/hitenemy.wav');
    this.load.audio('missball', '/pong/' + gameType + '/audio/new/missball.wav');
    

    // LOAD AUDIO COMBO
    this.load.audio('combo1', '/pong/' + gameType + '/audio/combo/1 (1).mp3');
    this.load.audio('combo2', '/pong/' + gameType + '/audio/combo/1 (2).mp3');
    this.load.audio('combo3', '/pong/' + gameType + '/audio/combo/1 (3).mp3');

    // LOAD AUDIO gameover
    this.load.audio('gameover1', '/pong/' + gameType + '/audio/gameover/1 (1).mp3');
    this.load.audio('gameover2', '/pong/' + gameType + '/audio/gameover/1 (2).mp3');
    this.load.audio('gameover3', '/pong/' + gameType + '/audio/gameover/1 (3).mp3');
    this.load.audio('gameover4', '/pong/' + gameType + '/audio/gameover/1 (4).mp3');

    // LOAD hit4music
    this.load.audio('hit4music1', '/pong/' + gameType + '/audio/hit4music/1.mp3');
    this.load.audio('hit4music2', '/pong/' + gameType + '/audio/hit4music/2.mp3');
    this.load.audio('hit4music3', '/pong/' + gameType + '/audio/hit4music/3.mp3');
    this.load.audio('hit4music4', '/pong/' + gameType + '/audio/hit4music/4.mp3');
    this.load.audio('hit4music5', '/pong/' + gameType + '/audio/hit4music/5.mp3');

    // LOAD hit6music
    this.load.audio('hit6music1', '/pong/' + gameType + '/audio/hit6music/1.mp3');
    this.load.audio('hit6music2', '/pong/' + gameType + '/audio/hit6music/2.mp3');
    this.load.audio('hit6music3', '/pong/' + gameType + '/audio/hit6music/3.mp3');
    this.load.audio('hit6music4', '/pong/' + gameType + '/audio/hit6music/4.mp3');
    this.load.audio('hit6music5', '/pong/' + gameType + '/audio/hit6music/5.mp3');
    this.load.audio('hit6music6', '/pong/' + gameType + '/audio/hit6music/6.mp3');
    this.load.audio('hit6music7', '/pong/' + gameType + '/audio/hit6music/7.mp3');

    // LOAD out
    this.load.audio('out1', '/pong/' + gameType + '/audio/out/1 (1).mp3');
    this.load.audio('out2', '/pong/' + gameType + '/audio/out/1 (2).mp3');
    this.load.audio('out3', '/pong/' + gameType + '/audio/out/1 (3).mp3');
    this.load.audio('out4', '/pong/' + gameType + '/audio/out/1 (4).mp3');

    // LOAD power_six_smash
    this.load.audio('power_six_smash1', '/pong/' + gameType + '/audio/power_six_smash/1 (1).mp3');
    this.load.audio('power_six_smash2', '/pong/' + gameType + '/audio/power_six_smash/1 (2).mp3');
    this.load.audio('power_six_smash3', '/pong/' + gameType + '/audio/power_six_smash/1 (3).mp3');
    this.load.audio('power_six_smash4', '/pong/' + gameType + '/audio/power_six_smash/1 (4).mp3');
    this.load.audio('power_six_smash5', '/pong/' + gameType + '/audio/power_six_smash/1 (5).mp3');

    // LOAD wickets
    this.load.audio('wickets1', '/pong/' + gameType + '/audio/wickets/1 (1).mp3');
    this.load.audio('wickets2', '/pong/' + gameType + '/audio/wickets/1 (2).mp3');
    this.load.audio('wickets3', '/pong/' + gameType + '/audio/wickets/1 (3).mp3');
    this.load.audio('wickets4', '/pong/' + gameType + '/audio/wickets/1 (4).mp3');
    this.load.audio('wickets5', '/pong/' + gameType + '/audio/wickets/1 (5).mp3');


    this.load.image('background', this.params.backgroundSprite);
    this.load.image('gray_bg', '/pong/' + gameType + '/gray_bg.jpg');
    this.load.image('help-board', '/pong/' + gameType + '/help-board.png');

    this.load.image('score_fire', '/pong/' + gameType + '/score_fire.png');
    this.load.image('score1', '/pong/' + gameType + '/score1.png');
    this.load.image('score2', '/pong/' + gameType + '/score2.png');
    this.load.image('score_out', '/pong/' + gameType + '/score_out.png');
    this.load.image('score4', '/pong/' + gameType + '/score4.png');
    this.load.image('score6', '/pong/' + gameType + '/score6.png');
    this.load.image(
      'score_battery',
      '/pong/' + gameType + '/score_battery.png'
    );
    this.load.image('score_red', '/pong/' + gameType + '/score_red.png');
    this.load.image('score_green', '/pong/' + gameType + '/score_green.png');
    this.load.image('score_wicket', '/pong/' + gameType + '/score_wicket.png');

    this.load.image('stop-play', '/pong/' + gameType + '/stop-play.png');
    this.load.image('audio-set', '/pong/' + gameType + '/audio-set.png');
    this.load.image('fire', '/pong/' + gameType + '/fire.png');
    this.load.image('red', '/pong/' + gameType + '/red.png');
    this.load.image('green', '/pong/' + gameType + '/green.png');
    this.load.image('battery', '/pong/' + gameType + '/battery.png');
    this.load.image('wicket', '/pong/' + gameType + '/wicket.png');
    this.load.image('lock-player', '/pong/' + gameType + '/lock-player.png');

    this.load.image('score_pan', '/pong/' + gameType + '/score_pan.png');
    this.load.image('wicket_icon', '/pong/' + gameType + '/wicket_icon.png');
    this.load.image(
      'auth_select_bg',
      '/pong/' + gameType + '/auth_select_bg.png'
    );
    this.load.image('green_btn', '/pong/' + gameType + '/green_btn.png');
    this.load.image('red_btn', '/pong/' + gameType + '/red_btn.png');
    this.load.image('arrow', '/pong/' + gameType + '/arrow.png');

    this.load.spritesheet(
      'hit_effect',
      '/pong/' + gameType + '/hit-effect.png',
      { frameWidth: 200, frameHeight: 200 }
    );

    this.load.image(
      'australia_auth',
      '/pong/' + gameType + '/australia_auth.png'
    );
    this.load.spritesheet(
      'australia_player_ready',
      '/pong/' + gameType + '/australia_player_ready.png',
      { frameWidth: 227.4, frameHeight: 300 }
    );


      for(let i = 3; i < nAdditionalPlayers; i++) {
        this.load.spritesheet(
          `p${i}_player_ready`,
          '/pong/' + gameType + `/p${i}_player_ready.png`,
          { frameWidth: 227.4, frameHeight: 300 }
        );
        this.load.spritesheet(
          `p${i}_player_fire`,
          '/pong/' + gameType + `/p${i}_player_fire.png`,
          { frameWidth: 227.2, frameHeight: 300 }
        );
      }

    // KICK SPRITE LOAD
    for(let i = 1; i < 3; i ++) {
      this.load.spritesheet(
        `p${i}_player_jump`,
        '/pong/' + gameType + `/p${i}_player_jump.png`,
        { frameWidth: 200, frameHeight: 300 }
      )
      this.load.spritesheet(
        `p${i}_player_ready`,
        '/pong/' + gameType + `/p${i}_player_ready.png`,
        { frameWidth: 200, frameHeight: 300 }
      );
      this.load.spritesheet(
        `p${i}_player_fire`,
        '/pong/' + gameType + `/p${i}_player_fire.png`,
        { frameWidth: 200, frameHeight: 300 }
      );

      this.load.spritesheet(
        `p${i}_player_anim`,
        getImageWithSize(this.params.playerSprite, 300, 15 * 200),
        // '/pong/' + gameType + `/p${i}_player_anim.png`,
        { frameWidth: 200, frameHeight: 300 }
      );
    }
      
    // END KICK SPRITE LOAD


    this.load.spritesheet(
      'ball_effect',
      '/pong/' + gameType + '/ball_effect.png',
      { frameWidth: 500, frameHeight: 500 }
    );
    this.load.spritesheet(
      'wicketbar_effect',
      '/pong/' + gameType + '/wicketbar_effect.png',
      { frameWidth: 500, frameHeight: 500 }
    );
    this.load.spritesheet(
      'hitballEffect',
      '/pong/' + gameType + '/hitball_effect.png',
      { frameWidth: 100, frameHeight: 100 }
    );

    this.load.image('wicketbar', '/pong/' + gameType + '/wicketbar.png');

    this.load.image('ball', this.params.objectSprite);
    this.load.image('fall', '/pong/' + gameType + '/fall.png');
    this.load.image('power_side', '/pong/' + gameType + '/power_side.png');
    this.load.image('cricket_bar', '/pong/' + gameType + '/cricket_bar.png');
    // this.load.image('score6_runs', "/pong/" + gameType + '/score6_runs.jpg');

    this.load.image("tab-bg-white", '/pong/' + gameType + '/43.png');
    this.load.image("tab-bg-red", '/pong/' + gameType + '/44.png');
    this.load.image("item-fire", '/pong/' + gameType + '/47.png');
    this.load.image("item-rocket", '/pong/' + gameType + '/48.png');
    this.load.image("tab-jump", '/pong/' + gameType + '/52.png');
    this.load.image("tab-ball", this.params.objectSprite);
    this.load.image("light", this.params.powerUpSprite);
    this.load.image("goaldoor", this.params.additionalSpriteThree);

    this.load.image("target-1", this.params.additionalSpriteOne);
    this.load.image("target-2", this.params.additionalSpriteTwo);
    this.load.image("target-3", this.params.enemySprite);
    this.load.image("target-4", this.params.powerUpSprite);


    this.load.spritesheet(
      'fireEffect',
      '/pong/' + gameType + '/fire_effect.png',
      { frameWidth: 75, frameHeight: 75 }
    );
    this.load.spritesheet(
      'batteryEffect',
      '/pong/' + gameType + '/battery_effect.png',
      { frameWidth: 75, frameHeight: 75 }
    );
    this.load.spritesheet(
      'redEffect',
      '/pong/' + gameType + '/red_effect.png',
      { frameWidth: 90, frameHeight: 90 }
    );
    this.load.spritesheet(
      'greenEffect',
      '/pong/' + gameType + '/green_effect.png',
      { frameWidth: 90, frameHeight: 90 }
    );
    this.load.spritesheet(
      'score6_effect',
      '/pong/' + gameType + '/score6_effect.png',
      { frameWidth: 75, frameHeight: 75 }
    );
    this.load.spritesheet(
      'redball_effect',
      '/pong/' + gameType + '/redball_effect.png',
      { frameWidth: 266.72, frameHeight: 200 }
    );
    this.load.spritesheet(
      'greenball_effect',
      '/pong/' + gameType + '/greenball_effect.png',
      { frameWidth: 266.4, frameHeight: 200 }
    );
    this.load.spritesheet(
      'power_effect',
      '/pong/' + gameType + '/power_effect.png',
      { frameWidth: 421, frameHeight: 68 }
    );

    //load audios

    this.hit6_sounds = ['', '', '', ''];

    //canvas
    w = this.game.canvas.clientWidth;
    h = this.game.canvas.clientHeight;

    //text_styles
    this.score_text_style = {
      fontFamily: 'customFont',
      fontSize: Math.round(24 * w / 1248) + 'px',
      align: 'center',
      fill: '#ffffff',
    };
    this.runs_text_style = {
      fontFamily: 'customFont',
      fontSize: Math.round(32 * w / 1248) + 'px',
      fill: '#ffffff',
    };
    this.fence_text_style = {
      fontFamily: 'customFont',
      fontSize: '10px',
      fill: '#ffffff',
    };
    this.wicket_font = {
      fontFamily: 'scoreFont',
      fontSize: Math.round(40 * w / 1248) + 'px',
      fill: '#96e1f2',
    };
    this.runs_font = {
      fontFamily: 'scoreFont',
      fontSize: Math.round(62 * w / 1248) + 'px',
      fill: '#96e1f2',
    };
    this.country_text_style = {
      fontFamily: 'customFont',
      fontSize: Math.round(48 * w / 1248) + 'px',
      fill: '#000050',
    };
    this.pause_text_style = {
      fontFamily: 'customFont',
      fontSize: Math.round(24 * w / 1248) + 'px',
      fill: '#000050',
    };
    this.runs_6_font = {
      fontFamily: 'customFont',
      fontSize: Math.round(120 * w / 1248) + 'px',
      fill: '#ffffff',
    };
    this.unlockHeaderStyle = {
      fontFamily: 'customFont',
      fontSize: Math.round(60 * w / 1248) + 'px',
      fill: '#ffffff',
    };
    this.unlockHeaderStyle_g = {
      fontFamily: 'customFont',
      fontSize: Math.round(60 * w / 1248) + 'px',
      fill: '#C1FF72',
    };
    this.unlockBodyStyle = {
      fontFamily: 'customFont',
      fontSize: Math.round(38 * w / 1248) + 'px',
      fill: '#ffffff',
    };

    this.unlockBodyStyle_g = {
      fontFamily: 'customFont',
      fontSize: Math.round(38 * w / 1248) + 'px',
      fill: '#C1FF72',
    };
  }

  create() { 
    w = this.game.canvas.clientWidth;
    h = this.game.canvas.clientHeight;

    this.game_pause = false;
    this.scorePanel = {
      fire_count: 0,
      score_count: 0,
      missFire: 0,
      light: this.params.boostCredits ?? 0,
      totalScore: this.params.score,
      maxscore: this.params.maxscore,
      itemCount: {
        FIRE: 0,
        BOOSTER: 0,
      },
    };
    this.ui_item = {};
    this.level = this.params.level ?? 0;
    this.flag = false;
    this.is_audio_setting = true;
    this.power_flag = false;
    this.count_flag = false;
    this.is_green_powerup = false;
    this.is_red_powerup = false;
    this.is_random = true;
    this.is_double4 = false;
    this.is_double6 = false;
    this.is_battery = false;

    this.audioSystem = {
      COMBO: [
        this.sound.add('combo1'),
        this.sound.add('combo2'),
        this.sound.add('combo3'),
      ],
      GAMEOVER: [
        this.sound.add('gameover1'),
        this.sound.add('gameover2'),
        this.sound.add('gameover3'),
        this.sound.add('gameover4'),
      ],
      HIT4MUSIC: [
        this.sound.add('hit4music1'),
        this.sound.add('hit4music2'),
        this.sound.add('hit4music3'),
        this.sound.add('hit4music4'),
        this.sound.add('hit4music5'),
      ],
      HIT6MUSIC: [
        this.sound.add('hit6music1'),
        this.sound.add('hit6music2'),
        this.sound.add('hit6music3'),
        this.sound.add('hit6music4'),
        this.sound.add('hit6music5'),
        this.sound.add('hit6music6'),
        this.sound.add('hit6music7'),
      ],
      OUT: [
        this.sound.add('out1'),
        this.sound.add('out2'),
        this.sound.add('out3'),
        this.sound.add('out4'),
      ],
      POWER_SIX_SMASH: [
        this.sound.add('power_six_smash1'),
        this.sound.add('power_six_smash2'),
        this.sound.add('power_six_smash3'),
        this.sound.add('power_six_smash4'),
        this.sound.add('power_six_smash5'),

      ],
      WICKET: [
        this.sound.add('wickets1'),
        this.sound.add('wickets2'),
        this.sound.add('wickets3'),
        this.sound.add('wickets4'),
        this.sound.add('wickets5'),
      ],
    }

    this.NEW = {
      HIT10: this.sound.add('hit10'),
      HIT5: this.sound.add('hit5'),
      KICK: this.sound.add('kick'),
      MISSBALL: this.sound.add('missball'),
      HITENEMY: this.sound.add('hitenemy'),
      POWERUP: this.sound.add('powerup'),
    }

    Object.keys(this.audioSystem).forEach(key => {
      this.audioSystem[key].forEach(audio => {
        audio.setVolume(2.5)
      });
    })

    this.levelDesign = {
      LEVEL1: {
        heigh: h * 0.68,
        width: w + 100 * w / 1268,
        speed_scale: 1,
        velocity_scale: 1,
        delay_scale: 1,
      },
      LEVEL2: {
        heigh: h * 0.68,
        width: w + 100 * w / 1268,
        speed_scale: Phaser.Math.FloatBetween(0.8, 1.1),
        velocity_scale: 1,
        delay_scale: 0.9,
      },
      LEVEL3: {
        height: h * Phaser.Math.FloatBetween(0.58, 0.8),
        width: w + 100 * w / 1268,
        speed_scale: Phaser.Math.FloatBetween(0.8, 1.1),
        velocity_scale: 1.1,
        delay_scale: 0.9,
      },
      LEVEL4: {
        height: h * Phaser.Math.FloatBetween(0.58, 0.8),
        width: w + 100 * w / 1268,
        speed_scale: Phaser.Math.FloatBetween(0.8, 1.1),
        velocity_scale: 1.1,
        delay_scale: 0.9,
      },
      LEVEL5: {
        height: h * Phaser.Math.FloatBetween(0.58, 0.8),
        width: w + 100 * w / 1268,
        speed_scale: Phaser.Math.FloatBetween(0.8, 1.1),
        velocity_scale: 1.2,
        delay_scale: 0.9,
      },
      LEVEL6: {
        height: h * Phaser.Math.FloatBetween(0.58, 0.8),
        width: w + 100 * w / 1268,
        speed_scale: Phaser.Math.FloatBetween(0.8, 1.1),
        velocity_scale: 1.2,
        delay_scale: 0.9,
      },
      LEVEL7: {
        height: h * Phaser.Math.FloatBetween(0.58, 0.8),
        width: w + 100 * w / 1268,
        speed_scale: Phaser.Math.FloatBetween(0.8, 1.1),
        velocity_scale: 1.25,
        delay_scale: 0.9,
      },
      LEVEL8: {
        height: h * Phaser.Math.FloatBetween(0.25, 0.7),
        width: w + 100 * w / 1268,
        speed_scale: Phaser.Math.FloatBetween(0.8, 1.1),
        velocity_scale: 1.25,
        delay_scale: 0.9,
      },
      LEVEL9: {
        height: h * Phaser.Math.FloatBetween(0.25, 0.7),
        width: w + 100 * w / 1268,
        speed_scale: Phaser.Math.FloatBetween(0.8, 1.1),
        velocity_scale: 1.25,
        delay_scale: 0.9,
        repeat: 1,
      },
      LEVEL10: {
        height: h * Phaser.Math.FloatBetween(0.25, 0.7),
        width: w + 100 * w / 1268,
        speed_scale: Phaser.Math.FloatBetween(0.8, 1.1),
        velocity_scale: 1.25,
        delay_scale: 0.9,
        repeat: 1,
      },
    };

    this.bg = this.add
      .sprite(0, 0, 'background')
      .setOrigin(0)
      .setDisplaySize(w, h);
    this.bg.setInteractive();

    this.Crowd_Cheers_v1_wav = this.sound.add('Crowd_Cheers_v1_wav');
    this.backgroundAudio = this.sound.add('Crowd_Loop_v1_wav');
    this.Crowd_v1_Booing_wav = this.sound.add('Crowd_v1_Booing_wav');
    this.DM_CGS_28 = this.sound.add('DM_CGS_28');
    this.DM_CGS_45 = this.sound.add('DM_CGS_45');
    this.Baseball_Hit_v1_wav = this.sound.add('Baseball_Hit_v1_wav');
    this.success_fanfare_trumpets_6185 = this.sound.add(
      'success-fanfare-trumpets-6185'
    );
    this.Victory_v1_wav = this.sound.add('Victory_v1_wav');

    this.backgroundAudio.setLoop(true).play();

    this.auth_select_group = this.add.group();

    for(let i = 3; i < nAdditionalPlayers; i++) {
      const ready_frame = this.anims.generateFrameNames(
        `p${i}_player_ready`,
        { start: 0, end: 13 }
      );
      this.anims.create({
        key: `p${i}_ready_animation`,
        frames: ready_frame,
        frameRate: 10,
        repeat: -1,
      });
  
      const fire_frame = this.anims.generateFrameNames(
        `p${i}_player_fire`,
        { start: 6, end: 14 }
      );
      const fire_ready_frame = this.anims.generateFrameNames(
        `p${i}_player_fire`,
        { start: 0, end: 6 }
      );
      this.anims.create({
        key: `p${i}_fire_animation`,
        frames: fire_frame,
        frameRate: 40,
        repeat: 0,
      });
      this.anims.create({
        key: `p${i}_fire_ready_animation`,
        frames: fire_ready_frame,
        frameRate: 12,
        repeat: 0,
      });
    }

    // CREATE PLAYER ANIMATIONS
    for(let i = 1; i < 3; i++) {
      this.anims.create({
        key: `p${i}_ready_animation`,
        frames: this.anims.generateFrameNames(
          `p${i}_player_anim`,
          { start: 0, end: 3 }
        ),
        frameRate: 15,
        repeat: -1,
      });

      this.anims.create({
        key: `p${i}_fire_animation`,
        frames: this.anims.generateFrameNames(
          `p${i}_player_anim`,
          { start: 5, end: 9 }
        ),
        frameRate: 15,
        repeat: 0,
      });

      this.anims.create({
        key: `p${i}_fire_ready_animation`,
        frames: this.anims.generateFrameNames(
          `p${i}_player_anim`,
          { start: 10, end: 14 }
        ),
        frameRate: 10,
        repeat: 0,
      });

      this.anims.create({
        key: `p${i}_jump_animation`,
        frames: this.anims.generateFrameNames(
          `p${i}_player_anim`,
          { start: 10, end: 14 }
        ),
        frameRate: 10,
        repeat: 0,
      });

    }

    // END CREATE PLAYER ANIMATIONS

    // HIT EFFECT
    // HIT EFFECT
    const hit_frame1 = this.anims.generateFrameNames(
      'hit_effect',
      { start: 0, end: 12 }
    );
    
    this.anims.create({
      key: 'hiteffect',
      frames: hit_frame1,
      frameRate: 25,
      repeat: 0,
    });

    this.hitEffect = this.add.sprite(w / 2, h / 2, 'hit_effect').setOrigin(0.5, 0.5).setDisplaySize(200, 200).setVisible(false);

    this.hitEffect.play("hiteffect");
    // END HIT EFFECT

    const ball_frame = this.anims.generateFrameNames('ball_effect', {
      start: 0,
      end: 4,
    });
    this.anims.create({
      key: 'ball_animation',
      frames: ball_frame,
      frameRate: 16,
      repeat: 0,
    });

    const wickectbar_frame = this.anims.generateFrameNames('wicketbar_effect', {
      start: 0,
      end: 2,
    });
    this.anims.create({
      key: 'wicketbar_animation',
      frames: wickectbar_frame,
      frameRate: 15,
      repeat: 0,
    });

    this.wicketbar_effect = this.add
      .sprite(0.09 * w, 0.8 * h, 'wicketbar_effect')
      .setDisplaySize(120, 120)
      .setVisible(false);


    // MIDDLE LOGO PART

    this.power_effect = this.physics.add
      .sprite(w * 0.005 + h * 0.45, h / 2 - 0.15 * h, 'power_effect')
      .setDisplaySize(190 * w / 1248, 30 * w / 1248)
      .setOrigin(1, 0)
      .setAlpha(1);

    this.auth_select_bg = this.add
      .sprite(w / 2, h / 2, 'auth_select_bg')
      .setDisplaySize(w * 0.5, h * 1.1)
      .setOrigin(0.5, 0.5)
      .setDepth(1);

    this.auths_left = this.add
      .text(w / 2 - 120 * w / 1248, h / 2 + 20 * w / 1248, '<', this.country_text_style)
      .setOrigin(0.5, 0.5)
      .setAlpha(0)
      .setDepth(1)
      .setInteractive({ cursor: 'pointer' });
    this.auths_left.on(
      'pointerdown',
      () => {
        author_id--;
        author_id = author_id == 2? 1 : author_id;
        if (author_id < 1) author_id = player_name.length;
        this.updateAuthorImage(author_id);
        console.log('leftttttttttt');
      },
      this
    );

    this.auths_right = this.add
      .text(w / 2 + 120 * w / 1248, h / 2 + 20 * w / 1248, '>', this.country_text_style)
      .setOrigin(0.5, 0.5)
      .setAlpha(0)
      .setDepth(1)
      .setInteractive({ cursor: 'pointer' });
    this.auths_right.on(
      'pointerdown',
      () => {
        author_id++;
        author_id = author_id == 2? 3 : author_id;
        if (author_id > player_name.length) author_id = 1;
        this.updateAuthorImage(author_id);
        console.log('rightttttttttt');
      },
      this
    );

    this.updateAuthorImage = (id) => {
      console.log(id, " : --------------")
      // switch (id) {
      //   case 1:
      //     this.auths.play('aus_ready_animation');
      //     console.log('austaaaaaaaaaaaaaaaaa');
      //     this.auth_country.setText('AUSTRALIA');
      //     break;
      //   case 2:
      //     this.auths.play('paki_ready_animation');
      //     this.auth_country.setText('PAKISTAN');
      //     console.log('pakissssssssssssssssssssss');
      //     break;
      //   // Add more cases if you have additional author IDs
      //   default:
          this.auths.play(`p${author_id}_ready_animation`);
          this.auth_country.setText(player_name[author_id - 1]);
      //     break;
      // }
      if(this.scorePanel.maxscore < player_socre[author_id - 1]) {
        this.ui_item['lock_player'].setVisible(true);
        this.auths.setAlpha(0.8);
        this.ui_item['lock_player_info'].setAlpha(1);
        this.ui_item['lock_player_info'].setText(`SCORE ${player_socre[author_id - 1]} TO UNLOCK`);

        this.auth_select_btn.setVisible(false);
        this.ui_item['auth_btn_info'].setVisible(false);
      } else {
        this.ui_item['lock_player'].setVisible(false);
        this.auths.setAlpha(1);
        this.ui_item['lock_player_info'].setAlpha(0)

        this.auth_select_btn.setVisible(true);
        this.ui_item['auth_btn_info'].setVisible(true);
      }

    };

    this.auth_country = this.add
      .text(w / 2, h / 2 - 100 * w / 1248, 'Select Player', {
        ...this.country_text_style,
        // wordWrap: { width: 100 },
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setAlpha(1)
      .setDepth(1);

    this.auth_select_btn = this.add
      .sprite(w / 2, h / 2 + 135 * w / 1248, 'green_btn')
      .setDisplaySize(155 * w / 1248, 95 * w / 1248)
      .setOrigin(0.5, 0.5)
      .setDepth(1);
    this.auths = this.physics.add
      .sprite(w / 2, h / 2 + 20 * w / 1248, 'australia_player_ready')
      .setDisplaySize(144 * w / 1248, 180 * w / 1248)
      .setCollideWorldBounds(true)
      .setPushable(false)
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setDepth(1);
    this.auths.play('p1_ready_animation');

    this.ui_item['lock_player'] = this.add.sprite(this.auths.x, this.auths.y, 'lock-player').setDisplaySize(50 * w / 1248, 50 * w / 1248).setVisible(false).setDepth(1);
    this.ui_item['lock_player_info'] = this.add
    .text(w / 2, h / 2 + 135 * w / 1248, 'SCORE 50 TO UNLOCK', {...this.country_text_style, 
      fill: '#fff',
      fontSize: 25 * w / 1248 + 'px',
    })
    .setOrigin(0.5, 0.5)
    .setAlpha(0)
    .setDepth(1)

    this.ui_item['auth_btn_info'] = this.add
    .text(w / 2, h / 2 + 135 * w / 1248, 'SELECT', {...this.country_text_style, 
      fill: '#fff',
      fontSize: 28 * w / 1248 + 'px',
    })
    .setOrigin(0.5, 0.5)
    .setAlpha(1)
    .setDepth(1)

    this.auth_select_group.add(this.auth_select_bg);
    this.auth_select_group.add(this.auth_country);
    this.auth_select_group.add(this.auths_left);
    this.auth_select_group.add(this.auths_right);
    this.auth_select_group.add(this.auths);
    this.auth_select_group.add(this.auth_select_btn);
    this.auth_select_group.add(this.ui_item['auth_btn_info']);

    this.auth_select_group.add(this.ui_item['lock_player']);

    this.auth_select_group.add(
      this.add.rectangle(w / 2 + w * 0.22, h / 2 - h * 0.25, 70, 70)
      // .setStrokeStyle(4, 0xefc53f)
      .setOrigin(0.5, 0.5)
      .setDepth(1)
      .setVisible(true)
      .setInteractive({cursor: 'pointer'})
      .on('pointerup', () => {
        this.auth_select_group.setVisible(false);
        this.cricket_bar.setVisible(false);
  
        this.player
          .setTexture(`p${author_id}_player_ready`)
          .setPosition(h * 0.47, h / 2 - 120 * h  / 688)
          .setVisible(true);
        this.auth_country.setText(player_name[author_id - 1]);
        this.player.play(`p${author_id}_ready_animation`);
  
        this.help_board_group.setVisible(true);
  
        this.time.delayedCall(4000, () => {
          this.help_board_group.setVisible(false);
          this.time.delayedCall(1000, this.fire_ball, [], this);
        }, [], this);
      })
    )

    this.auth_select_btn.setInteractive({ cursor: 'pointer' });
      console.log(w, "------")
    this.player = this.physics.add
      .sprite(-200, -200, 'australia_player_ready')
      .setDisplaySize(230 * w  / 1248, 272 * w  / 1248)
      .setCollideWorldBounds(true)
      .setPushable(false)
      .setOrigin(0, 0)
      .setGravityY(1500)
      .setInteractive({ cursor: 'pointer' })
      .setVisible(false);
    
      const bottom = this.physics.add.sprite(h * 0.47 + 100, h - 50, 'score')
        .setDisplaySize(100, 10)
        .setPushable(false)
        .setVisible(false)

      this.physics.add.collider(this.player, bottom)

    this.auth_select_btn.on('pointerup', () => {
      this.auth_select_group.setVisible(false);
      this.cricket_bar.setVisible(false);

      this.player
        .setTexture(`p${author_id}_player_ready`)
        .setPosition(h * 0.47, h / 2 - 20 * h  / 688)
        .setVisible(true);
      this.auth_country.setText(player_name[author_id - 1]);
      this.player.play(`p${author_id}_ready_animation`);

      this.help_board_group.setVisible(true);

      this.time.delayedCall(4000, () => {
        this.help_board_group.setVisible(false);
        this.time.delayedCall(1000, this.fire_ball, [], this);
      }, [], this);
    });

    const redball_frame = this.anims.generateFrameNames('redball_effect', {
      start: 0,
      end: 14,
    });
    this.anims.create({
      key: 'redball_animation',
      frames: redball_frame,
      frameRate: 50,
      repeat: -1,
    });
    const greenball_frame = this.anims.generateFrameNames('greenball_effect', {
      start: 0,
      end: 14,
    });
    this.anims.create({
      key: 'greenball_animation',
      frames: greenball_frame,
      frameRate: 24,
      repeat: -1,
    });

    // this.ball = this.physics.add
    //   .sprite(w + 50, h * Phaser.Math.FloatBetween(0.35, 0.65), 'ball')
    //   .setAlpha(0.8)
    //   .setDisplaySize(45, 45)
    //   .setBounce(1, 1)
    //   .setPushable(false);

    this.ball = this.physics.add
      .sprite(w + 50, h * Phaser.Math.FloatBetween(0.35, 0.65), 'ball')
      .setDisplaySize(50 * w  / 1248, 50 * w  / 1248)
      .setPushable(false)
      .setOrigin(0, 0)
      .setAlpha(1)
      .setInteractive({ cursor: 'pointer' });
    
    this.ballEffect = this.add.sprite(0, 0, 'ball').setAlpha(0).setDisplaySize(266 * 1.3 * w  / 1248, 200 * 1.3 * w  / 1248);

    this.pause_group = this.add.group();

    this.pause_pan = this.add
      .sprite(w / 2, h / 2, 'auth_select_bg')
      .setDisplaySize(w * 0.5, h * 1.1)
      .setOrigin(0.5, 0.5)
      .setDepth(1);

    this.pause_player = this.add
      .sprite(w / 2 - 80, h / 2, 'australia_auth')
      .setDisplaySize(140 * w / 1248, 180 * w / 1248)
      .setOrigin(0.5, 0.5)
      .setDepth(1);
    this.game_state = this.add
      .text(w / 2, h / 2 - 130 * w / 1248, 'GAME PAUSED', this.country_text_style)
      .setOrigin(0.5, 0.5)
      .setAlpha(1)
      .setDepth(1);
    this.player_country = this.add
      .text(w / 2 + 80 * w / 1248, h / 2 - 50 * w / 1248, 'Striker Steve', {
        ...this.pause_text_style,
        // wordWrap: { width: 50 },
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setAlpha(1)
      .setDepth(1);
    this.current_score = this.add
      .text(w / 2 + 80 * w / 1248, h / 2, 'SCORE: 200', this.pause_text_style)
      .setOrigin(0.5, 0.5)
      .setAlpha(1)
      .setDepth(1);
    this.current_over = this.add
      .text(w / 2 + 80 * w / 1248, h / 2 + 50 * w / 1248, 'OVER: 3', this.pause_text_style)
      .setOrigin(0.5, 0.5)
      .setAlpha(1)
      .setDepth(1);
    this.resume_btn = this.add
      .sprite(w / 2 - 100 * w / 1248, h / 2 + 135 * w / 1248, 'green_btn')
      .setDisplaySize(155 * w / 1248, 95 * w / 1248)
      .setOrigin(0.5, 0.5)
      .setDepth(1)
      .setInteractive({ cursor: 'pointer' });
    this.quit_btn = this.add
      .sprite(w / 2 + 100 * w / 1248, h / 2 + 135 * w / 1248, 'red_btn')
      .setDisplaySize(155 * w / 1248, 95 * w / 1248)
      .setOrigin(0.5, 0.5)
      .setDepth(1)
      .setInteractive({ cursor: 'pointer' });


    this.pause_group.add(this.pause_pan);
    this.pause_group.add(this.pause_player);
    this.pause_group.add(this.game_state);
    this.pause_group.add(this.player_country);
    this.pause_group.add(this.current_score);
    this.pause_group.add(this.current_over);
    this.pause_group.add(this.resume_btn);
    this.pause_group.add(this.quit_btn);

    this.pause_group.add(
      this.add.rectangle(w / 2 + w * 0.22, h / 2 - h * 0.25, 70, 70)
      // .setStrokeStyle(4, 0xefc53f)
      .setOrigin(0.5, 0.5)
      .setDepth(1)
      .setVisible(false)
      .setInteractive({cursor: 'pointer'})
      .on('pointerup', () => {
        console.log("close, modal")
        this.pause_group.setVisible(false);
        this.game_pause = false;
  
        this.fire_ball();
      })
    )

    this.pause_group.add(
      this.add
      .text(w / 2 - 100 * w / 1248, h / 2 + 135 * w / 1248, 'RESUME', {...this.country_text_style, 
        fill: '#fff',
        fontSize: Math.round(28 * w / 1248) + 'px',
      })
      .setOrigin(0.5, 0.5)
      .setAlpha(1)
      .setDepth(1)
    );
    this.pause_group.add(
      this.add
      .text(w / 2 + 100 * w / 1248, h / 2 + 135 * w / 1248, 'QUIT', {...this.country_text_style, 
        fill: '#fff',
        fontSize: 28 * w / 1248 + 'px',
      })
      .setOrigin(0.5, 0.5)
      .setAlpha(1)
      .setDepth(1)
    );

    this.pause_group.setVisible(false);

    this.score6_1 = this.physics.add
      .sprite(-200, -200, 'target-1')
      .setDisplaySize(w * 0.09, w * 0.09);
    this.score6_2 = this.physics.add
      .sprite(-200, -200, 'target-1')
      .setDisplaySize(w * 0.09, w * 0.09);
    this.score6_3 = this.physics.add
      .sprite(-200, -200, 'target-1')
      .setDisplaySize(w * 0.09, w * 0.09);
    this.score6_4 = this.physics.add
      .sprite(-200, -200, 'target-1')
      .setDisplaySize(w * 0.09, w * 0.09);
    this.score6_5 = this.physics.add
      .sprite(-200, -200, 'target-1')
      .setDisplaySize(w * 0.09, w * 0.09);

    this.hitball_effect = this.add
      .sprite(w / 2, h / 2, 'hitballEffect')
      .setDisplaySize(100, 100)
      .setInteractive()
      .setOrigin(0.5)
      .setVisible(false);

    // this.hitball_effect.play('hitball_animation');

    this.stop_play = this.add
      .sprite(w / 15, h / 11.5, 'stop-play')
      .setDisplaySize(w * 0.07, w * 0.07)
      .setInteractive({ cursor: 'pointer' });
    this.stop_play.on('pointerup', () => {
      console.log("------------ : ", author_id)
      this.game_pause = true;
      this.ball.setPosition(w + 50, 0);
      this.ball.setVelocity(0, 0);
      this.physics.world.disable(this.ball);

      this.pause_group.setVisible(true);
      this.pause_player.setTexture(`p${author_id}_player_ready`).setDisplaySize(140 * w / 1248, 180 * w / 1248);
      this.pause_player.play(`p${author_id}_ready_animation`)
      this.player_country.setText(player_name[author_id - 1]);
      this.current_score.setText(
        'SCORE : ' + this.scorePanel.totalScore.toString()
      );
      this.current_over.setText('OVER : ' + Math.ceil(this.scorePanel.fire_count / 6).toString().padStart(4, '0'));
    });
    this.resume_btn.on('pointerup', () => {
      this.pause_group.setVisible(false);
      this.game_pause = false;

      this.fire_ball();
    });

    this.quit_btn.on(
      'pointerup',
      () => {
        this.endRound();
      },
      this
    );

    // LIGHT PART
    this.add
      .sprite(w / 30, h / 4.5, 'help-board')
      .setOrigin(0, 0.5)
      .setDisplaySize(w * 0.1, w * 0.06)
      .setInteractive({ cursor: 'pointer' });
    const ll = this.add
      .sprite(w / 28 + 5, h / 4.5, 'light')
      .setOrigin(0, 0.5)
      .setDisplaySize(w * 0.04, w * 0.04)
      .setInteractive({ cursor: 'pointer' });
    
    this.lightNumText = this.add.text(ll.x + w * 0.06, h / 4.5 , this.scorePanel.light, {...this.country_text_style, 
        fill: '#fff',
        fontSize: 32 * w / 1248 + 'px',
        align: 'left'
      })
      .setOrigin(0.5, 0.5)
      .setAlpha(1)
      .setDepth(1)

    // END LIGHT PART

    // BOTTOM CONTROL
    this.addBottomControl();


    // END BOTTOM CONTROL

    this.audio_set = this.add
      .sprite(w / 7, h / 11.5, 'audio-set')
      .setDisplaySize(w * 0.07, w * 0.07);

    this.left_fall = this.physics.add
      .sprite(-100, h / 2, 'fall')
      .setDisplaySize(10, 10 * h)
      .setOrigin(0.5, 0.5);

    this.right_fall = this.physics.add
      .sprite(w + 200, h / 2, 'fall')
      .setDisplaySize(10, 6 * h)
      .setOrigin(0.5, 0.5);

    this.cricket_bar = this.physics.add
      .sprite(210, 585, 'cricket_bar')
      .setDisplaySize(10, 60)
      .setOrigin(0, 0)
      .setDepth(1)
      .setAlpha(1)
      .setVisible(false);

    // const random_high = Phaser.Math.FloatBetween(0, h/2-150);

    this.audio_set.on('pointerup', () => {
      console.log("sound----mute");
      this.sound.mute = this.is_audio_setting;
      this.is_audio_setting = !this.is_audio_setting;
    }, this).setInteractive({ cursor: 'pointer' })

    this.player.on(
      'pointerdown',
      () => {
        this.onPlayerDown()
      },
      this
    );

    // this.player.on('pointerout', () => {
    //   // Handle the mouse exit event here
    //   this.initReadyPlayer();
    // }, this);

    this.player.on(
      'pointerup',
      () => {
        this.onPlayerUp()
      },
      this
    );

    //target_scores
    this.score1 = this.physics.add
      .sprite(-200, -200, 'target-1')
      .setDisplaySize(w * 0.09, w * 0.09);
    this.score2 = this.physics.add
      .sprite(w * 0.9, h * 0.9, 'target-1')
      .setDisplaySize(w * 0.09, w * 0.09);
    this.score_fire = this.physics.add
      .sprite(w * 0.918, h * 0.715, 'light')
      .setDisplaySize(w * 0.09, w * 0.09);
    this.score4 = this.physics.add
      .sprite(w * 0.92, h * 0.525, 'target-2')
      .setDisplaySize(w * 0.09, w * 0.09);
    this.score_out = this.physics.add
      .sprite(w * 0.918, h * 0.34, 'target-3')
      .setDisplaySize(w * 0.09, w * 0.09);
    this.score_out1 = this.physics.add
      .sprite(w * 3, h * 0.34, 'target-3')
      .setDisplaySize(w * 0.09, w * 0.09);  
    this.score6 = this.physics.add
      .sprite(w * 0.89, h * 0.15, 'target-2')
      .setDisplaySize(w * 0.09, w * 0.09);

    this.score_battery = this.physics.add
      .sprite(-200, -200, 'score_battery')
      .setDisplaySize(w * 0.09, w * 0.09);
    this.score_green = this.physics.add
      .sprite(-200, -200, 'score_green')
      .setDisplaySize(w * 0.09, w * 0.09);
    this.score_red = this.physics.add
      .sprite(-200, -200, 'score_red')
      .setDisplaySize(w * 0.09, w * 0.09);
    this.score_wicket = this.physics.add
      .sprite(-200, -200, 'score_wicket')
      .setDisplaySize(w * 0.09, w * 0.09);

    this.scoreList1 = [
      this.score1,
      this.score2,
      this.score4,
      this.score6,
      this.score_out,
      this.score_out1,
    ];

    this.scoreList2 = [
      this.score_fire,
      this.score_fire,
      this.score_fire,
      this.score_fire,
      this.score_fire,
    ];

    this.getRandomNumbers = (min, max, count) => {
      const result = [];
      while (result.length < count) {
        const randomNumber = Phaser.Math.Between(min, max);
        if (!result.includes(randomNumber)) {
          result.push(randomNumber);
        }
      }
      return result;
    };

    //score_pans
    this.score_pan_wickets = this.add
      .sprite(w * 0.26, h * 0.175, 'score_pan')
      .setDisplaySize(w * 0.11, w * 0.08);
    this.wicket_icon = this.add
      .sprite(w * 0.235, h * 0.175, 'wicket_icon')
      .setDisplaySize(w * 0.03, w * 0.03)
      .setOrigin(0.5, 0.5);
    this.wicket = this.add
      .text(w * 0.282, h * 0.175, '10', this.wicket_font)
      .setOrigin(0.5, 0.5)
      .setAlpha(1);

    this.score_pan_runs = this.add
      .sprite(w * 0.46, h * 0.225, 'score_pan')
      .setDisplaySize(w * 0.18, w * 0.1);
    this.runs_left = this.add
      .text(w * 0.465, h * 0.228, '0000', this.runs_font)
      .setOrigin(0.5, 0.5)
      .setAlpha(1);
    // this.add.text(w*0.459, h*0.215, ':', this.runs_font).setOrigin(0.5, 0.5).setAlpha(1);
    // this.runs_right = this.add.text(w*0.498, h*0.225, '0', this.runs_font).setOrigin(0.5, 0.5).setAlpha(1);

    this.score_pan_overs = this.add
      .sprite(w * 0.665, h * 0.16, 'score_pan')
      .setDisplaySize(w * 0.11, w * 0.08);
    // this.overs_left = this.add.text(w*0.641, h*0.155, '6', this.wicket_font).setOrigin(0.5, 0.5).setAlpha(1);
    // this.add.text(w*0.667, h*0.15, ':', this.wicket_font).setOrigin(0.5, 0.5).setAlpha(1);
    this.overs_right = this.add
      .text(w * 0.668, h * 0.16, '0000', this.wicket_font)
      .setOrigin(0.5, 0.5)
      .setAlpha(1);

    //score_texts
    this.wickets_text = this.add
      .text(w * 0.26, h * 0.07, 'Lives', this.score_text_style)
      .setOrigin(0.5, 0.5)
      .setAlpha(1);
    this.runs_text = this.add
      .text(w * 0.46, h * 0.07, 'Points', this.runs_text_style)
      .setOrigin(0.5, 0.5)
      .setAlpha(1);
    this.overs_text = this.add
      .text(w * 0.665, h * 0.055, 'Level', this.score_text_style)
      .setOrigin(0.5, 0.5)
      .setAlpha(1);

    this.runs_show = this.add
      .text(w / 2, h / 2, '6 RUNS!', this.runs_6_font)
      .setDisplaySize(350* w / 1266, 160* w / 1266)
      .setAlpha(1)
      .setDepth(1)
      .setScale(0)
      .setOrigin(0.5, 0.5)
      .setStroke('#000000', 5);

    this.gray_bg = this.add
      .sprite(0, 0, 'gray_bg')
      .setOrigin(0, 0)
      .setDisplaySize(w, h)
      .setAlpha(0);

    this.wicketbar = this.physics.add
      .sprite(0.17 * w, 0.65 * h, 'wicketbar')
      .setDisplaySize(120 * w / 1248, 320 * w / 1248).setInteractive().setVisible(false);

    // this.wicket
    // this.unlock_red = this..

    const fireFrame = this.anims.generateFrameNumbers('fireEffect', {
      start: 0,
      end: 59,
    });
    this.anims.create({
      key: 'fireAnimation',
      frames: fireFrame,
      frameRate: 15,
      repeat: 3,
    });

    const batteryFrame = this.anims.generateFrameNumbers('batteryEffect', {
      start: 0,
      end: 149,
    });
    this.anims.create({
      key: 'batteryAnimation',
      frames: batteryFrame,
      frameRate: 15,
      repeat: 3,
    });

    const hitball_frame = this.anims.generateFrameNames('hitballEffect', {
      start: 0,
      end: 35,
    });
    this.anims.create({
      key: 'hitball_animation',
      frames: hitball_frame,
      frameRate: 35,
      repeat: 0,
    });

    const redFrame = this.anims.generateFrameNumbers('redEffect', {
      start: 0,
      end: 59,
    });
    this.anims.create({
      key: 'redAnimation',
      frames: redFrame,
      frameRate: 24,
      repeat: -1,
    });

    const greenFrame = this.anims.generateFrameNumbers('greenEffect', {
      start: 0,
      end: 59,
    });
    this.anims.create({
      key: 'greenAnimation',
      frames: greenFrame,
      frameRate: 24,
      repeat: -1,
    });

    this.green_effect = this.add
      .sprite(w / 2, h / 4 + 5, 'greenEffect')
      .setDisplaySize(0.1 * w, 0.1 * w);

    this.green_effect.setVisible(true).play('greenAnimation');

    this.unlock_green = this.add
      .sprite(w / 2, h / 4, 'green')
      .setOrigin(0.5)
      .setDisplaySize(0.1 * w, 0.1 * w);

    this.green_text_group = this.add.group();

    this.green_text_header = this.add
      .text(w / 2 - 120* w / 1266, h / 2.5, 'POWER BALL', this.unlockHeaderStyle)
      .setOrigin(0.5);
    this.green_text_header_g = this.add
      .text(
        w / 2 - 120* w / 1266 + this.green_text_header.width,
        h / 2.5,
        'UNLOCKED',
        this.unlockHeaderStyle_g
      )
      .setOrigin(0.5);
    this.green_text_header_e = this.add
      .text(
        w / 2 -
          255* w / 1266 +
          this.green_text_header.width +
          this.green_text_header_g.width,
        h / 2.5,
        '!',
        this.unlockHeaderStyle
      )
      .setOrigin(0.5);
    this.green_text_body = this.add
      .text(w / 2 - 220* w / 1266, h / 2, 'GET', this.unlockBodyStyle)
      .setOrigin(0.5);
    this.green_text_body_g = this.add
      .text(
        w / 2 - 85* w / 1266 + this.green_text_body.width,
        h / 2,
        'X5 MULTIPLIER',
        this.unlockBodyStyle_g
      )
      .setOrigin(0.5);
    this.green_text_body_e = this.add
      .text(
        w / 2 - 110* w / 1266 + this.green_text_body.width + this.green_text_body_g.width,
        h / 2,
        'ON YOUR',
        this.unlockBodyStyle
      )
      .setOrigin(0.5);
    this.green_text_body2 = this.add
      .text(w / 2, h / 2 + 60 * h / 688, 'NEXT 3 HITS.', this.unlockBodyStyle)
      .setOrigin(0.5);

    this.green_text_group.add(this.green_effect);
    this.green_text_group.add(this.unlock_green);
    this.green_text_group.add(this.green_text_header);
    this.green_text_group.add(this.green_text_header_g);
    this.green_text_group.add(this.green_text_header_e);
    this.green_text_group.add(this.green_text_body);
    this.green_text_group.add(this.green_text_body_g);
    this.green_text_group.add(this.green_text_body_e);
    this.green_text_group.add(this.green_text_body2);

    this.green_text_group.setVisible(false);

    this.red_effect = this.add
      .sprite(w / 2 + 4, h / 4, 'redEffect')
      .setDisplaySize(0.115 * w, 0.115 * w);

    this.red_effect.play('redAnimation');

    this.unlock_red = this.add
      .sprite(w / 2, h / 4, 'fire')
      .setOrigin(0.5)
      .setDisplaySize(0.09 * w, 0.09 * w);

    this.red_text_group = this.add.group();

    this.red_text_header = this.add
      .text(w / 2 - 150* w / 1266, h / 2.5, 'Super Smash', this.unlockHeaderStyle)
      .setOrigin(0.5);
    this.red_text_header_g = this.add
      .text(
        w / 2 - 120* w / 1266 + this.red_text_header.width,
        h / 2.5,
        'UNLOCKED',
        this.unlockHeaderStyle_g
      )
      .setOrigin(0.5);
    this.red_text_header_e = this.add
      .text(
        w / 2 - 235* w / 1266 + this.red_text_header.width + this.red_text_header_g.width,
        h / 2.5,
        '!',
        this.unlockHeaderStyle
      )
      .setOrigin(0.5);
    this.red_text_body = this.add
      .text(w / 2 - 80* w / 1266, h / 2, 'ALL TARGETS ARE', this.unlockBodyStyle)
      .setOrigin(0.5);
    this.red_text_body_g = this.add
      .text(
        w / 2 - 125* w / 1266 + this.red_text_body.width,
        h / 2,
        '10 points',
        this.unlockBodyStyle_g
      )
      .setOrigin(0.5);
    this.red_text_body2 = this.add
      .text(w / 2, h / 2 + 60 * h / 688, 'NEXT 3 HITS.', this.unlockBodyStyle)
      .setOrigin(0.5);

    this.red_text_group.add(this.unlock_red);
    this.red_text_group.add(this.red_effect);
    this.red_text_group.add(this.red_text_header);
    this.red_text_group.add(this.red_text_header_g);
    this.red_text_group.add(this.red_text_header_e);
    this.red_text_group.add(this.red_text_body);
    this.red_text_group.add(this.red_text_body_g);
    this.red_text_group.add(this.red_text_body2);

    this.red_text_group.setVisible(false);

    this.unlock_battery = this.add
      .sprite(w / 2, h / 4, 'battery')
      .setOrigin(0.5)
      .setDisplaySize(0.1 * w, 0.1 * w);

    this.battery_text_group = this.add.group();

    this.battery_text_header = this.add
      .text(w / 2 - 140 * w / 1266, h / 2 - 60 * h / 688, 'FREE HIT', this.unlockHeaderStyle)
      .setOrigin(0.5);
    this.battery_text_header_g = this.add
      .text(
        w / 2 - 85* w / 1266 + this.battery_text_header.width,
        h / 2 - 60 * h / 688,
        'UNLOCKED',
        this.unlockHeaderStyle_g
      )
      .setOrigin(0.5);
    this.battery_text_header_e = this.add
      .text(
        w / 2 -
          220 * w / 1266 +
          this.battery_text_header.width +
          this.battery_text_header_g.width,
        h / 2 - 60 * h / 688,
        '!',
        this.unlockHeaderStyle
      )
      .setOrigin(0.5);
    this.battery_text_body = this.add
      .text(w / 2, h / 2, 'YOU CAN NOT GO OUT', this.unlockBodyStyle)
      .setOrigin(0.5);
    this.battery_text_body2 = this.add
      .text(w / 2, h / 2 + 60 * h / 688, 'ON YOUR NEXT 3 HITS.', this.unlockBodyStyle)
      .setOrigin(0.5);

    this.battery_text_group.add(this.unlock_battery);
    this.battery_text_group.add(this.battery_text_header);
    this.battery_text_group.add(this.battery_text_header_g);
    this.battery_text_group.add(this.battery_text_header_e);
    this.battery_text_group.add(this.battery_text_body);
    this.battery_text_group.add(this.battery_text_body2);

    this.battery_text_group.setVisible(false);

    this.wicket_text_group = this.add.group();

    this.unlock_wicket = this.add
      .sprite(w / 2, h / 4, 'wicket')
      .setOrigin(0.5)
      .setDisplaySize(0.1 * w, 0.1 * w);

    this.wicket_text_header = this.add
      .text(w / 2 - 150* w / 1266, h / 2.5, 'WILD WICKET', this.unlockHeaderStyle)
      .setOrigin(0.5);
    this.wicket_text_header_g = this.add
      .text(
        w / 2 - 130* w / 1266 + this.wicket_text_header.width,
        h / 2.5,
        'UNLOCKED',
        this.unlockHeaderStyle_g
      )
      .setOrigin(0.5);
    this.wicket_text_header_e = this.add
      .text(
        w / 2 -
          255* w / 1266 +
          this.wicket_text_header.width +
          this.wicket_text_header_g.width,
        h / 2.5,
        '!',
        this.unlockHeaderStyle
      )
      .setOrigin(0.5);
    this.wicket_text_body = this.add
      .text(w / 2, h / 2, 'YOU SCORED AN EXTRA WICKET', this.unlockBodyStyle)
      .setOrigin(0.5);

    this.wicket_text_group.add(this.unlock_wicket);
    this.wicket_text_group.add(this.wicket_text_header);
    this.wicket_text_group.add(this.wicket_text_header_g);
    this.wicket_text_group.add(this.wicket_text_header_e);
    this.wicket_text_group.add(this.wicket_text_body);

    this.wicket_text_group.setVisible(false);


    this.unlockBodyStyle = {
      fontFamily: 'customFont',
      fontSize: Math.round(38 * w / 1248) + 'px',
      fill: '#ffffff',
    };

    // UNLOCK PLAYER PART
    this.unlock_player_group = this.add.group();

    this.ui_item['unlock_player'] = this.add.sprite(w / 2, h / 2 - 150 * h / 688, player_sprite_names[2]).setDisplaySize(144 * w / 1248, 180 * w / 1248);
    this.ui_item['unlock_under_text'] = this.add.text(w / 2, h / 2, 'PLAYER', {
      ...this.unlockBodyStyle,
      fontSize: Math.round(42 * w / 1248) + 'px',
      align: 'right',
    }).setOrigin(1, 0.5);
    this.ui_item['unlock_under_text_g'] = this.add.text(w / 2, h / 2, ' UNLOCKED!', {
      ...this.unlockBodyStyle,
      fontSize: Math.round(42 * w / 1248) + 'px',
      fill: '#C1FF72',
      align: 'left',
    }).setOrigin(0, 0.5);


    this.ui_item['unlock_under_info_text_g'] = this.add.text(w / 2, h / 2 + 60 * h / 688, `YOU UNLOCKED `, {
      ...this.unlockBodyStyle,
      align: 'right'
    }).setOrigin(1, 0.5);

    this.ui_item['unlock_under_info_text'] = this.add.text(w / 2, h / 2 + 60 * h / 688, `${player_name1[4]}`, {
      ...this.unlockBodyStyle,
      fill: '#C1FF72',
      align: 'left'
    }).setOrigin(0, 0.5);
    // this.ui_item['unlock_under_info_text'].addColor('#ff0000', this.ui_item['unlock_under_info_text'].text.indexOf('UNLOCKED'), 'UNLOCKED'.length);

    this.unlock_player_group.add(this.ui_item['unlock_player']);
    this.unlock_player_group.add(this.ui_item['unlock_under_text']);
    this.unlock_player_group.add(this.ui_item['unlock_under_text_g']);
    this.unlock_player_group.add(this.ui_item['unlock_under_info_text_g']);
    this.unlock_player_group.add(this.ui_item['unlock_under_info_text']);

    this.unlock_player_group.setVisible(false);

    this.help_board_group = this.add.group();
    this.help_board_group.add(
      this.add.image(w / 2 + 0.25 * w, h * 0.7, 'help-board').setOrigin(0.5, 0.5).setDisplaySize(250 * w / 1268, 100 * h / 688)
    )
    this.help_board_group.add(
      this.add.image(w / 2 + 0.25 * w, h * 0.82, 'arrow').setOrigin(0.5, 0.5).setDisplaySize(100 * w / 1268, 100 * h / 688)
    )
    this.help_board_group.add(
      this.add.text(w / 2 + 0.25 * w, h * 0.7, `TAP HERE TO JUMP`, {
        ...this.runs_text_style,
        fontSize: `${25 * w / 1268}px`,
        lineSpacing: 2,
        align: 'center'
      }).setOrigin(0.5, 0.5)
    )

    this.help_board_group.add(
      this.add.image(w / 2 - 0.2 * w, h * 0.7, 'help-board').setOrigin(0.5, 0.5).setDisplaySize(440 * w / 1268, 150 * h / 688)
    )
    this.help_board_group.add(
      this.add.image(w / 2 - 0.285 * w, h * 0.84, 'arrow').setOrigin(0.5, 0.5).setDisplaySize(100 * w / 1268, 100 * h / 688).setScale(-0.2, 0.2)
    )
    this.help_board_group.add(
      this.add.text(w / 2 - 0.2 * w, h * 0.7, `TAP, HOLD & RELEASE\nHERE TO HIT`, {
        ...this.runs_text_style,
        fontSize: `${25 * w / 1268}px`,
        lineSpacing: 2,
        align: 'center'
      }).setOrigin(0.5, 0.5)
    )

    this.help_board_group.setVisible(false);

    //show spritesheet
    this.fireSprite = this.add
      .sprite(w / 9 - 30 * w / 1248, h * 0.36, 'fireEffect')
      .setDisplaySize(100 * w / 1248, 100 * w / 1248)
      .setVisible(false);

    this.score6Sprite = this.add
      .sprite(w * 0.89, h * 0.15, 'score6_effect')
      .setDisplaySize(120 * w / 1248, 120 * w / 1248)
      .setVisible(false);

    this.green_powerup_group = this.add.group();

    this.green_powerup_anim = this.add
      .sprite(w / 9.5, h * 0.36 + 5, 'redEffect')
      .setDisplaySize(105 * w / 1248, 105* w / 1248);
    this.green_powerup_img = this.add
      .sprite(w / 9.5, h * 0.36, 'green')
      .setDisplaySize(100* w / 1248, 100* w / 1248);
    this.green_powerup_anim.play('greenAnimation');

    this.green_powerup_group.add(this.green_powerup_anim);
    this.green_powerup_group.add(this.green_powerup_img);

    this.green_powerup_group.setVisible(false);

    this.red_powerup_group = this.add.group();

    this.red_powerup_anim = this.add
      .sprite(w / 9.5 + 3.5, h * 0.36 + 4, 'redEffect')
      .setDisplaySize(105* w / 1248, 105* w / 1248);
    this.red_powerup_img = this.add
      .sprite(w / 9.5, h * 0.36, 'fire')
      .setDisplaySize(100* w / 1248, 100* w / 1248);
    this.red_powerup_anim.play('redAnimation');

    this.red_powerup_group.add(this.red_powerup_anim);
    this.red_powerup_group.add(this.red_powerup_img);

    this.red_powerup_group.setVisible(false);


    this.battery_powerup_group = this.add.group();
    this.battery_powerup_group.add(
      this.add
      .sprite(w / 9.5, h * 0.36, 'battery')
      .setDisplaySize(100* w / 1248, 100* w / 1248)
    )
    const anim_b = this.add
    .sprite(w / 9.5 + 3.5, h * 0.36 + 4, 'redEffect')
    .setDisplaySize(105* w / 1248, 105* w / 1248);
    anim_b.play('redAnimation');
    this.battery_powerup_group.add(anim_b);

    this.battery_powerup_group.setVisible(false);


    const overlapCallback = (num) => {
      if (this.ball.type == 'old') {

        const playerIdx = this.getUnlockPlayerId();

        this.scorePanel.totalScore += num;

        const newPlayerIdx = this.getUnlockPlayerId();

        if(playerIdx != newPlayerIdx && this.scorePanel.totalScore > this.scorePanel.maxscore) {
          // this.unlockPlayer();
        }

        switch (num) {
          case 2:
            score2_cnt++;
            break;
          case 4:
            score4_cnt++;
            break;
          case 6:
            score6_cnt++;
            break;
          default:
            break;
        }
        this.fire_ball();
      }
    };

    this.overlapScore1 = this.physics.add.overlap(
      this.score1,
      this.ball,
      () => {
        this.onColliderTarget(overlapCallback, this.score1, 10);
      },
      null,
      this
    );

    this.overlapScore2 = this.physics.add.overlap(
      this.score2,
      this.ball,
      () => {
        this.onColliderTarget(overlapCallback, this.score2, 10);
      },
      null,
      this
    );

    this.overlapScore4 = this.physics.add.overlap(
      this.score4,
      this.ball,
      () => {
        this.onColliderTarget(overlapCallback, this.score4, 5);

        // if (this.ball.type == 'old') {
        //   console.log('44444444444444444444444');
        //   multi_4_6_cnt++;
        //   double4_cnt++;
        //   double6_cnt = 0;
        //   if (multi_4_6_cnt >= 2) {
        //     this.DM_CGS_45.play();
        //   }
        //   // this.Crowd_Cheers_v1_wav.play();
        //   this.audioSystem.HIT4MUSIC[this.getRandomNumbers(0, this.audioSystem.HIT4MUSIC.length - 1, 1)].play();
        //   this.hitball_effect.setPosition(this.score4.x, this.score4.y);
        //   this.score4.setVisible(false);
        //   this.hitball_effect.setVisible(true).play('hitball_animation');

        //   if (this.is_green_powerup) {
        //     overlapCallback(20);
        //     this.updateRunsShow('4 x 5');
        //     green_powerup_cnt++;
        //     if (green_powerup_cnt == 3) {
        //       green_powerup_cnt = 0;
        //       this.green_powerup_group.setVisible(false);
        //       this.is_green_powerup = false;
        //       this.ball.setDisplaySize(50 * w / 1248, 50 * w / 1248);
        //       this.ball.state = 'ball';
        //     }
        //   } else {
        //     // this.audioSystem.COMBO[this.getRandomNumbers(0, this.audioSystem.COMBO.length - 1, 1)].play();

        //     overlapCallback(4 * double4_cnt);
        //     this.updateRunsShow(4 * double4_cnt);
        //   }
        //   this.ball.type = 'new';
        //   this.runs_show.setScale(0);
        //   this.tweens.add({
        //     targets: this.runs_show,
        //     scaleX: 1,
        //     scaleY: 1,
        //     alpha: 1,
        //     duration: 800,
        //     ease: 'Bounce',
        //   });
        //   this.time.delayedCall(
        //     1000,
        //     () => {
        //       this.runs_show.setAlpha(0);
        //       this.score4.setVisible(true);
        //     },
        //     null,
        //     this
        //   );
        // }
      },
      null,
      this
    );
    this.overlapScore6 = this.physics.add.overlap(
      this.score6,
      this.ball,
      () => {
        this.onColliderTarget(overlapCallback, this.score6, 5);

        // if (this.ball.type == 'old') {
        //   console.log('666666666666666');
        //   multi_4_6_cnt++;
        //   double4_cnt = 0;
        //   double6_cnt++;
        //   this.hitball_effect.setPosition(this.score6.x, this.score6.y);
        //   this.score6.setVisible(false);
        //   this.hitball_effect.setVisible(true).play('hitball_animation');

        //   if (multi_4_6_cnt >= 2) {
        //     this.DM_CGS_45.play();
        //   }
        //   // this.Crowd_Cheers_v1_wav.play();
        //   this.audioSystem.HIT6MUSIC[this.getRandomNumbers(0, this.audioSystem.HIT6MUSIC.length - 1, 1)].play();

        //   if (this.is_green_powerup) {
        //     overlapCallback(30);
        //     green_powerup_cnt++;
        //     if (green_powerup_cnt == 3) {
        //       green_powerup_cnt = 0;
        //       this.is_green_powerup = false;
        //       this.ball.setDisplaySize(50 * w / 1248, 50 * w / 1248);
        //       this.ball.state = 'ball';
        //       this.green_powerup_group.setVisible(false);
        //     }
        //     this.updateRunsShow('6 x 5');
        //   } else {
        //     // this.audioSystem.COMBO[this.getRandomNumbers(0, this.audioSystem.COMBO.length - 1, 1)].play();

        //     overlapCallback(6 * double6_cnt);
        //     this.updateRunsShow(6 * double6_cnt);
        //   }
        //   this.ball.type = 'new';
        //   this.runs_show.setScale(0);
        //   this.tweens.add({
        //     targets: this.runs_show,
        //     scaleX: 1,
        //     scaleY: 1,
        //     alpha: 1,
        //     duration: 800,
        //     ease: 'Bounce',
        //   });
        //   this.time.delayedCall(
        //     1000,
        //     () => {
        //       this.score6.setVisible(true);
        //       this.runs_show.setAlpha(0);
        //     },
        //     null,
        //     this
        //   );
        // }
      },
      null,
      this
    );

    this.overlapScore6_1 = this.physics.add.overlap(
      this.score6_1,
      this.ball,
      () => {
        this.onColliderTarget(overlapCallback, this.score6_1, 10, true);
      },
      null,
      this
    );
    this.overlapScore6_2 = this.physics.add.overlap(
      this.score6_2,
      this.ball,
      () => {
        this.onColliderTarget(overlapCallback, this.score6_2, 10, true);

      },
      null,
      this
    );
    this.overlapScore6_3 = this.physics.add.overlap(
      this.score6_3,
      this.ball,
      () => {
        this.onColliderTarget(overlapCallback, this.score6_3, 10, true);

      },
      null,
      this
    );
    this.overlapScore6_4 = this.physics.add.overlap(
      this.score6_4,
      this.ball,
      () => {
        this.onColliderTarget(overlapCallback, this.score6_4, 10, true);

      },
      null,
      this
    );
    this.overlapScore6_5 = this.physics.add.overlap(
      this.score6_5,
      this.ball,
      () => {
        this.onColliderTarget(overlapCallback, this.score6_5, 10, true);
      },
      null,
      this
    );
    this.physics.add.overlap(
      this.score_fire,
      this.ball,
      () => {
        this.onColliderTargetLight(overlapCallback, this.score_fire);
      },
      null,
      this
    );
    this.physics.add.overlap(
      this.score_out,
      this.ball,

      () => {
        this.onColliderTargetOut();
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.score_out1,
      this.ball,

      () => {
        this.onColliderTargetOut();
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.score_battery,
      this.ball,
      () => {
        if (this.ball.type == 'old') {
          this.ball.type = 'new';
          double4_cnt = 0;
          double6_cnt = 0;
          console.log('batteryyyyyyyyyyyyyyy');

          this.audioSystem.POWER_SIX_SMASH[this.getRandomNumbers(0, this.audioSystem.POWER_SIX_SMASH.length - 1, 1)].play();


          multi_4_6_cnt = 0;
          this.hitball_effect.setPosition(
            this.score_battery.x,
            this.score_battery.y
          );
          this.score_battery.setVisible(false);
          this.hitball_effect.setVisible(true).play('hitball_animation');
          this.time.delayedCall(
            1000,
            () => {
              this.score_battery.setVisible(true);
            },
            null,
            this
          );

          if (this.is_green_powerup == false) {
            this.ball.setPosition(w + 50, 0);
            this.ball.setVelocity(0, 0);
            this.gray_bg.setAlpha(0.45);
            this.physics.world.disable(this.ball);

            this.battery_text_group.setVisible(true);
            this.game_pause = true;
            this.time.delayedCall(
              3000,
              () => {
                this.game_pause = false;
                this.gray_bg.setAlpha(0);
                this.battery_text_group.setVisible(false);
                this.is_battery = true;
                this.fire_ball();
                this.battery_powerup_group.setVisible(true);
              },
              null,
              this
            );
          } else {
            green_powerup_cnt++;
            if (green_powerup_cnt == 3) {
              green_powerup_cnt = 0;

              this.is_green_powerup = false;
              this.green_powerup_group.setVisible(false);
            }
          }
        }
      },
      null,
      this
    );
    this.physics.add.overlap(
      this.score_green,
      this.ball,
      () => {
        if (this.ball.type == 'old') {
          this.ball.type = 'new';
          double4_cnt = 0;
          double6_cnt = 0;
          console.log('greennnnnnnnnnnnnnnnn');
          this.ball.state = 'green'
          multi_4_6_cnt = 0;

          this.audioSystem.POWER_SIX_SMASH[this.getRandomNumbers(0, this.audioSystem.POWER_SIX_SMASH.length - 1, 1)].play();


          this.hitball_effect.setPosition(
            this.score_green.x,
            this.score_green.y
          );
          this.score_green.setVisible(false);
          this.hitball_effect.setVisible(true).play('hitball_animation');
          this.time.delayedCall(
            1000,
            () => {
              this.score_green.setVisible(true);
            },
            null,
            this
          );

          if (this.is_green_powerup == false && this.is_red_powerup == false) {
            this.is_green_powerup = true;
            
            // this.ball.play('greenball_animation');

            this.ball.setPosition(w + 50, 0);
            this.ball.setVelocity(0, 0);
            this.gray_bg.setAlpha(0.45);
            this.physics.world.disable(this.ball);

            this.green_text_group.setVisible(true);
            this.game_pause = true;
            this.time.delayedCall(
              3000,
              () => {
                this.game_pause = false;
                this.gray_bg.setAlpha(0);
                this.green_text_group.setVisible(false);
                this.green_powerup_group.setVisible(true);
                this.fire_ball();
              },
              null,
              this
            );
          } else if (this.is_green_powerup == true) {
            green_powerup_cnt++;
            if (green_powerup_cnt == 3) {
              green_powerup_cnt = 0;
              this.is_green_powerup = false;
              this.ball.setDisplaySize(50 * w / 1248, 50 * w / 1248);
              this.ball.state = 'ball';
              this.green_powerup_group.setVisible(false);
            }
          } else if (this.is_red_powerup == true) {
            red_powerup_cnt++;
            if (red_powerup_cnt == 3) {
              this.is_red_powerup = false;
              this.ball.setDisplaySize(50 * w / 1248, 50 * w / 1248);
              this.ball.state = 'ball';
              red_powerup_cnt = 0;
              this.is_random = false;
              this.red_powerup_group.setVisible(false);
            }
          }
        }
      },
      null,
      this
    );
    this.physics.add.overlap(
      this.score_red,
      this.ball,
      () => {
        if (this.ball.type == 'old') {
          this.ball.type = 'new';
          double4_cnt = 0;
          double6_cnt = 0;
          console.log('reddddddddddd');
          this.ball.state = 'red'
          multi_4_6_cnt = 0;
          this.audioSystem.POWER_SIX_SMASH[this.getRandomNumbers(0, this.audioSystem.POWER_SIX_SMASH.length - 1, 1)].play();

          this.hitball_effect.setPosition(this.score_red.x, this.score_red.y);
          this.score_red.setVisible(false);
          this.hitball_effect.setVisible(true).play('hitball_animation');
          this.time.delayedCall(
            1000,
            () => {
              this.score_red.setVisible(true);
            },
            null,
            this
          );
          if (this.is_green_powerup == false && this.is_red_powerup == false) {
            this.is_red_powerup = true;
            // this.ball.play('redball_animation');

            this.is_random = true;

            this.ball.setPosition(w + 50, 0);
            this.ball.setVelocity(0, 0);
            this.gray_bg.setAlpha(0.45);
            this.physics.world.disable(this.ball);

            this.red_text_group.setVisible(true);
            this.game_pause = true;
            this.time.delayedCall(
              3000,
              () => {
                this.game_pause = false;
                this.gray_bg.setAlpha(0);
                this.red_text_group.setVisible(false);
                this.red_powerup_group.setVisible(true);
                this.fire_ball();
              },
              null,
              this
            );
          } else if (this.is_green_powerup == true) {
            green_powerup_cnt++;
            if (green_powerup_cnt == 3) {
              green_powerup_cnt = 0;

              this.is_green_powerup = false;
              this.ball.setDisplaySize(50 * w / 1248, 50 * w / 1248);
              this.ball.state = 'ball';
              this.green_powerup_group.setVisible(false);
            }
          } else if (this.is_red_powerup == true) {
            red_powerup_cnt++;
            if (red_powerup_cnt == 3) {
              red_powerup_cnt = 0;
              this.is_random = false;
              this.is_red_powerup = false;
              this.ball.setDisplaySize(50 * w / 1248, 50 * w / 1248);
              this.ball.state = 'ball';
              this.red_powerup_group.setVisible(false);
            }
          }
        }
      },
      null,
      this
    );
    this.physics.add.overlap(
      this.score_wicket,
      this.ball,

      () => {
        if (this.ball.type == 'old') {
          this.ball.type = 'new';
          double4_cnt = 0;
          double6_cnt = 0;
          console.log('wickettttttttttttt');
          this.audioSystem.POWER_SIX_SMASH[this.getRandomNumbers(0, this.audioSystem.POWER_SIX_SMASH.length - 1, 1)].play();
          multi_4_6_cnt = 0;
          this.hitball_effect.setPosition(
            this.score_wicket.x,
            this.score_wicket.y
          );
          this.score_wicket.setVisible(false);
          this.hitball_effect.setVisible(true).play('hitball_animation');
          this.time.delayedCall(
            1000,
            () => {
              this.score_wicket.setVisible(true);
            },
            null,
            this
          );
          // this.fire_ball()
          // this.updateRunsShow('Out')
          // this.runs_show.setScale(0)
          // this.tweens.add({
          // targets: this.runs_show,
          // scaleX: 1,
          // scaleY: 1,
          // alpha: 1,
          // duration: 800,
          // ease: 'Bounce',
          // })
          if (this.is_green_powerup == false) {
            this.ball.setPosition(w + 50, 0);
            this.ball.setVelocity(0, 0);
            this.gray_bg.setAlpha(0.45);
            this.physics.world.disable(this.ball);

            this.wicket_text_group.setVisible(true);
            this.game_pause = true;
            wickets += 1;
            this.wicket.setText(wickets);

            this.time.delayedCall(
              3000,
              () => {
                this.game_pause = false;
                this.gray_bg.setAlpha(0);
                this.wicket_text_group.setVisible(false);
                this.fire_ball();
              },
              null,
              this
            );
          } else {
            green_powerup_cnt++;
            if (green_powerup_cnt == 3) {
              green_powerup_cnt = 0;

              this.is_green_powerup = false;
              this.ball.setDisplaySize(50 * w / 1248, 50 * w / 1248);
              this.ball.state = 'ball';
              this.green_powerup_group.setVisible(false);
            }
          }
        }
      },
      null,
      this
    );

    this.updateRunsShow = (num) => {
      if (num == 'Out' || num == '') {
        this.runs_show.setText(num.toString());
      } else {
        this.runs_show.setText(num.toString() + (num == 1? ' Point' : ' Points'));
      }
    };

    // this.cameras.main.postFX.addVignette(0.5, 0.5, 0.975);
    // this.cameras.main.postFX
    //   .addColorMatrix()
    //   .contrast(1.25)
    //   .polaroid()
    //   .brightness(0.9);

    this.initGame();
  }
  public fire_ball() {
    console.log('aaaaaaaaaaaaa');
    if (this.game_pause || isFireballRunnig) return;

    isFireballRunnig = true;

    if (this.is_battery) {
      battery_cnt++;
      if (battery_cnt == 4) {
        this.is_battery = false;
        battery_cnt = 0;
        this.battery_powerup_group.setVisible(false);
        
      }
    }

    this.ball.setVisible(true);
    // this.ball.play('redball_animation');
    // this.ball.state = 'ball';

    switch (this.ball.state) {
      case 'red':
        // this.ball.setDisplaySize(1000, 1000).play('redball_animation');
        this.ball.setTexture('red');
        this.ballEffect.setAlpha(1).play('redball_animation');
        this.ball.setAlpha(0);
        break;
      case 'green':
        // this.ball.setDisplaySize(1000, 1000).play('greenball_animation');
        this.ball.setTexture('green');
        this.ballEffect.setAlpha(1).play('greenball_animation');
        this.ball.setAlpha(0);
        break;
      case 'ball':
        this.ball.setTexture('ball');
        this.ball.setAlpha(1);
        this.ballEffect.setAlpha(0)
        break;
      default:
        break;
    }

    this.ball.type = 'new';
    this.count_flag = false;
    
    const oldT = Math.ceil(this.scorePanel.fire_count % 6);
    this.scorePanel.fire_count++;

    // console.log("--------this.scorePanel.fire_count----", this.scorePanel.fire_count)
    if(oldT == 0 && this.level != 0) {
      // this.audioSystem.GAMEOVER[this.getRandomNumbers(0, this.audioSystem.GAMEOVER.length - 1, 1)].play();
    }
    this.level = Math.min(Math.ceil(this.scorePanel.fire_count / 6), 10);

    this.overs_right.setText(Math.ceil(this.scorePanel.fire_count / 6).toString().padStart(4, '0'));

    if (this.is_red_powerup == true) {
      console.log('111111sdfssss11111111111');

      for (let i = 0; i < 5; i++) {
        this.scoreList1[i].setPosition(-2000, -2000);
        this.scoreList2[i].setPosition(-2000, -2000);
      }
      this.scoreList1[5].setPosition(-2000, -2000);

      this.score6_1.setPosition(w * 0.9, h * 0.9);
      this.score6_2.setPosition(w * 0.918, h * 0.715);
      this.score6_3.setPosition(w * 0.92, h * 0.525);
      this.score6_4.setPosition(w * 0.918, h * 0.34);
      this.score6_5.setPosition(w * 0.89, h * 0.15);
    } else if (this.is_red_powerup == false && this.is_random == false) {
      console.log('22222222afgasfdgadf2222222222222222222222222');

      this.is_random = true;
      this.score6_1.setPosition(-2000, -2000);
      this.score6_2.setPosition(-2000, -2000);
      this.score6_3.setPosition(-2000, -2000);
      this.score6_4.setPosition(-2000, -2000);
      this.score6_5.setPosition(-2000, -2000);

      for (let j = 0; j < 5; j++) {
        this.scoreList1[j].setPosition(-2000, -2000);
        this.scoreList2[j].setPosition(-2000, -2000);
      }
      this.scoreList1[5].setPosition(-2000, -2000);

      const randomNumbers1 = this.getRandomNumbers(0, 3, this.level < 6? 3 : 2);
      const randomNumbers2 = this.getRandomNumbers(0, 4, 1);

      let randomIndex = Math.floor(Math.random() * (randomNumbers1.length + 1));
      randomNumbers1.splice(randomIndex, 0, 4);

      if(this.level >= 6) {
        randomIndex = Math.floor(Math.random() * (randomNumbers1.length + 1));
        randomNumbers1.splice(randomIndex, 0, 5);
      }



      this.scoreList1[randomNumbers1[0]].setPosition(w * 0.9, h * 0.9);
      this.scoreList1[randomNumbers1[1]].setPosition(w * 0.918, h * 0.715);
      this.scoreList1[randomNumbers1[2]].setPosition(w * 0.89, h * 0.15);
      this.scoreList1[randomNumbers1[3]].setPosition(w * 0.918, h * 0.34);
      this.scoreList2[randomNumbers2[0]].setPosition(w * 0.92, h * 0.525);

      score6effect_x = this.score6.x;
      score6effect_y = this.score6.y;
      this.score6Sprite.setPosition(score6effect_x, score6effect_y);
    } else if (this.is_red_powerup == false && n != this.level) {
      console.log('33333333fagfdgadfg33333333333333333333333');
      n = this.level;
      for (let i = 0; i < 5; i++) {
        this.scoreList1[i].setPosition(-2000, -2000);
        this.scoreList2[i].setPosition(-2000, -2000);
      }
      this.scoreList1[5].setPosition(-2000, -2000);

      const randomNumbers1 = this.getRandomNumbers(0, 3, this.level < 6? 3 : 2);
      const randomNumbers2 = this.getRandomNumbers(0, 4, 1);
      let randomIndex = Math.floor(Math.random() * (randomNumbers1.length + 1));
      randomNumbers1.splice(randomIndex, 0, 4);

      if(this.level >= 6) {
        randomIndex = Math.floor(Math.random() * (randomNumbers1.length + 1));
        randomNumbers1.splice(randomIndex, 0, 5);
      }

      this.scoreList1[randomNumbers1[0]].setPosition(w * 0.9, h * 0.9);
      this.scoreList1[randomNumbers1[1]].setPosition(w * 0.918, h * 0.715);
      this.scoreList1[randomNumbers1[2]].setPosition(w * 0.89, h * 0.15);
      this.scoreList1[randomNumbers1[3]].setPosition(w * 0.918, h * 0.34);
      this.scoreList2[randomNumbers2[0]].setPosition(w * 0.92, h * 0.525);

      score6effect_x = this.score6.x;
      score6effect_y = this.score6.y;
      this.score6Sprite.setPosition(score6effect_x, score6effect_y);
    }
    isClicked = true;
    this.ball.setVelocity(0, 0);
    this.ball.body.setGravityY(0);

    // if (this.level > 10) {
      // this.endRound();
    // } else {
      // pos_x = w + 100;
      // pos_y = h*(Phaser.Math.FloatBetween(0.55, 0.8));
      if (this.level < 3) {
        this.ball.setPosition(
          this.levelDesign['LEVEL' + this.level].width,
          this.levelDesign['LEVEL' + this.level].heigh
        );
      } else {
        this.ball.setPosition(
          this.levelDesign['LEVEL' + this.level].width,
          h * Phaser.Math.FloatBetween(0.58, 0.8)
        );
      }

      setTimeout(() => {
        console.log('fireballllllllllll');
        this.throwBall(this.level);
        isFireballRunnig = false;
      }, 2000 * this.levelDesign['LEVEL' + this.level].delay_scale);
    // }
  }
  public throwBall(level) {
    if(this.ball == null || this.physics == null || this.physics.world == null) return;
    this.physics.world.enable(this.ball);

    // Set the velocity of the ball to simulate a throw
    if (level < 3) {
      var throwSpeed = 700 * w / 1248;
    } else {
      var throwSpeed = 1000 * Phaser.Math.FloatBetween(0.8, 1.1) * w / 1248;
    }
    var throwAngle = -175; // Angle in degrees (negative for upward throw)
    var throwVector = this.physics.velocityFromAngle(throwAngle, throwSpeed);

    this.ball.setVelocity(
      throwVector.x * this.levelDesign['LEVEL' + level].velocity_scale,
      throwVector.y * this.levelDesign['LEVEL' + level].velocity_scale
    );

    // Add gravity to the ball
    this.ball.body.setGravityY(150 * w / 1248);

    // Destroy the ball after a certain time (adjust as needed)
  }

  public addBottomControl() {

    // LEFT BALL DOOR
    this.add.sprite(w * 0.005, h / 2 - 0.08 * h, 'goaldoor')
      .setOrigin(0, 0)
      .setDisplaySize(h * 0.45, h * 0.45)
      .setInteractive()

    // LEFT BTN
    this.add.sprite(w / 2 - 0.35 * w, h * 0.9, 'tab-bg-white')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(w * 0.07, w * 0.07)
      .setInteractive({ cursor: 'pointer' });
    this.add.sprite(w / 2 - 0.35 * w, h * 0.9, 'tab-ball')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(w * 0.04, w * 0.04)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerup', () => {
        console.log("-----tab ball----")
        this.onPlayerUp()
      })
      .on('pointerdown', () => {
        this.onPlayerDown()
      })

    // RIGHT BTN
    this.add.sprite(w / 2 + 0.3 * w, h * 0.9, 'tab-bg-red')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(w * 0.07, w * 0.07)
      .setInteractive({ cursor: 'pointer' });
    this.add.sprite(w / 2 + 0.3 * w, h * 0.9, 'tab-jump')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(w * 0.04, w * 0.04)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerup', () => {
        console.log("-----tab jump----")
        this.player.play(`p${author_id}_jump_animation`);

        this.player.on(
          'animationcomplete',
          (anim) => {
            if(anim.key.includes('fire_ready_animation')) return;
            this.initReadyPlayer();
          },
          this
        );

        this.player.setVelocityY(-650);
        this.player.setGravityY(1500);
      })

    // CENTER ITEM
    let x = w / 2 - 0.05 * w;
    let y = h * 0.93;
    this.add.sprite(x, y, 'tab-bg-white')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(w * 0.05, w * 0.05)
      .setInteractive({ cursor: 'pointer' });
    this.add.sprite(x, y, 'item-fire')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(w * 0.03, w * 0.03)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerup', () => {
        console.log("-----item fire----")

        if(this.scorePanel.light >= 2) {
          this.scorePanel.light -= 2;
          this.lightNumText.setText(this.scorePanel.light);
    
          this.green_text_group.setVisible(true);
          this.game_pause = true;
          this.is_green_powerup = true
          this.gray_bg.setAlpha(0.45);

          this.time.delayedCall(
            3000,
            () => {
              this.game_pause = false;
              this.gray_bg.setAlpha(0);
              this.green_text_group.setVisible(false);
              this.green_powerup_group.setVisible(true);
              this.fire_ball();
            },
            null,
            this
          );
        }


      })
    // -------------------
    
    this.add
      .sprite(x, y - w * 0.025, 'help-board')
      .setOrigin(0, 0.5)
      .setDisplaySize(w * 0.05, w * 0.03)
      .setInteractive({ cursor: 'pointer' });
    this.add
      .sprite(x + 2, y - w * 0.025, 'light')
      .setOrigin(0, 0.5)
      .setDisplaySize(w * 0.02, w * 0.02)
      .setInteractive({ cursor: 'pointer' });
    
    this.add.text(x + 0.025 * w, y - w * 0.025 , '2', {...this.country_text_style, 
        fill: '#fff',
        fontSize: 25 * w / 1248 + 'px',
        align: 'center'
      })
      .setOrigin(0, 0.5)
      .setAlpha(1)
      .setDepth(1)
    // -------------------------

    x = w / 2 + 0.05 * w;
    this.add.sprite(x, y, 'tab-bg-white')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(w * 0.05, w * 0.05)
      .setInteractive({ cursor: 'pointer' });
    this.add.sprite(x, y, 'item-rocket')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(w * 0.03, w * 0.03)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerup', () => {
        console.log("-----item rocket----")

        if(this.scorePanel.light >= 3) {
          this.scorePanel.light -= 3;
          this.lightNumText.setText(this.scorePanel.light);
    
          this.red_text_group.setVisible(true);
          this.game_pause = true;
          this.is_red_powerup = true
          this.gray_bg.setAlpha(0.45);

          this.time.delayedCall(
            3000,
            () => {
              this.game_pause = false;
              this.gray_bg.setAlpha(0);
              this.red_text_group.setVisible(false);
              this.green_powerup_group.setVisible(true);
              this.fire_ball();
            },
            null,
            this
          );
        }

      })
    // -------------------
    
    this.add
      .sprite(x, y - w * 0.025, 'help-board')
      .setOrigin(0, 0.5)
      .setDisplaySize(w * 0.05, w * 0.03)
      .setInteractive({ cursor: 'pointer' });
    this.add
      .sprite(x + 2, y - w * 0.025, 'light')
      .setOrigin(0, 0.5)
      .setDisplaySize(w * 0.02, w * 0.02)
      .setInteractive({ cursor: 'pointer' });
    
    this.add.text(x + 0.025 * w, y - w * 0.025 , '3', {...this.country_text_style, 
        fill: '#fff',
        fontSize: 25 * w / 1248 + 'px',
        align: 'center'
      })
      .setOrigin(0, 0.5)
      .setAlpha(1)
      .setDepth(1)
    // -------------------------

  }

  public onPlayerDown() {
    this.power_flag = true;
    if(isClicked) {
      // if (author_id == 1) {
      //   this.player.play('aus_fire_ready_animation');
      // } else if(author_id == 2) {
      //   this.player.play('paki_fire_ready_animation');
      // } else {
        this.player.play(`p${author_id}_fire_ready_animation`);
        // this.player.play(`p${author_id}_fire_animation`);
      // }
    }
  }

  public onPlayerUp() {
    this.power_flag = false;
    // let speed_scale = Phaser.Math.FloatBetween(1, 2.5)

    if(isClicked) {
      // if (author_id == 1) {
      //   this.player.play('aus_fire_animation');
      // } else if(author_id == 2) {
      //   this.player.play('paki_fire_animation');
      // } else {
        this.player.play(`p${author_id}_fire_animation`);
      // }
      this.player.on(
        'animationcomplete',
        (anim) => {
          if(anim.key.includes('fire_ready_animation')) return;
          this.initReadyPlayer();
        },
        this
      );
    }


    // this.overs_right.setText(over_cnt)
    if (this.flag && isClicked) {
      // this.Baseball_Hit_v1_wav.play();

      this.NEW.KICK.play();

      this.ball.type = 'old';
      console.log(this.ball.state)

      let target_x = w;
      let target_y = 0.5 * h;

      if (power <= 1) {
        target_y = h * 0.9;
      } else if (power <= 6 && power > 1) {
        target_y = h * Phaser.Math.FloatBetween(0.45, 0.8);
      } else if (power > 6) {
        target_y = h * Phaser.Math.FloatBetween(-0.2, 0.35);
      }
      power / 10;
      let speed_scale = 0.8 + power / 8;
      // this.ball.setPosition(300, 558)

      this.ball_effect = this.physics.add
        .sprite(this.ball.x + 10, this.ball.y, 'ball_effect')
        .setDisplaySize(80, 80)
        .setOrigin(0.5, 0.5);
      this.ball_effect.setVisible(false);

      // this.ball_effect.play('ball_animation');
      // this.ball_effect.on(
      //   'animationcomplete',
      //   () => {
      //     this.ball_effect.setVisible(false);
      //   },
      //   this
      // );

      this.ball.setVelocity(
        (target_x - this.ball.x) * speed_scale,
        (target_y - this.ball.y) * speed_scale
      );

      const deltaX = this.ball.x - this.player.x;
      const deltaY = this.ball.y - this.player.y;

      this.hitEffect.setPosition(this.ball.x + deltaX * this.ball.body.width / this.player.body.width, this.ball.y + deltaY * this.ball.body.width / this.player.body.width).setVisible(true)
      this.hitEffect.play("hiteffect")
      const angle = Phaser.Math.Angle.Between(target_x - this.hitEffect.x , target_y - this.hitEffect.y, 0, 0);
      this.hitEffect.setAngle(angle * 180 / Math.PI + 180)


      this.scorePanel.score_count++;
    }
    isClicked = true;
    power = 0;
  }

  public onColliderTarget(handleFunc, targetObj, score, isRed = false) {

    if (this.ball.type == 'old') {
      console.log('11111111111111');
      multi_4_6_cnt = 0;
      double4_cnt = 0;
      double6_cnt = 0;
      // this.DM_CGS_28.play();
      this.hitball_effect.setPosition(targetObj.x, targetObj.y);
      targetObj.setVisible(false);
      this.hitball_effect.setVisible(true).play('hitball_animation');

      this.Crowd_Cheers_v1_wav.play();

      if(score == 10) {
        this.NEW.HIT10.play();
      } else if(score == 5) {
        this.NEW.HIT5.play();
      }

      // this.hitball_effect.setPosition(this.ball.x, this.ball.y);
      // this.hitball_effect.play('hitball_effect');
      if(isRed) {
        red_powerup_cnt++;
        if (red_powerup_cnt == 3) {
          red_powerup_cnt = 0;
          this.is_random = false;
          this.is_red_powerup = false;
          this.ball.setDisplaySize(50 * w / 1248, 50 * w / 1248);
          this.ball.state = 'ball';
          this.red_powerup_group.setVisible(false);
        }
      }

      if (this.is_green_powerup) {
        handleFunc(score * 5);
        this.updateRunsShow(`${score} x 5`);
        green_powerup_cnt++;
        if (green_powerup_cnt == 3) {
          green_powerup_cnt = 0;
          this.green_powerup_group.setVisible(false);
          this.is_green_powerup = false;
          this.ball.setDisplaySize(50 * w / 1248, 50 * w / 1248);
          this.ball.state = 'ball';
        }
      } else {
        handleFunc(score);
        this.updateRunsShow(score);
      }
      this.ball.type = 'new';
      this.runs_show.setScale(0);
      this.tweens.add({
        targets: this.runs_show,
        scaleX: 1,
        scaleY: 1,
        alpha: 1,
        duration: 800,
        ease: 'Bounce',
      });
      this.time.delayedCall(
        1000,
        () => {
          this.runs_show.setAlpha(0);
          targetObj.setVisible(true);
        },
        null,
        this
      );
    }
  }

  public onColliderTarget2(handleFunc) {
    
  }

  public onColliderTargetOut() {
    if (this.ball.type == 'old') {
      this.ball.type = 'new';

      console.log('outttttttttttttttt');
      multi_4_6_cnt = 0;
      double4_cnt = 0;
      double6_cnt = 0;

      if (this.is_battery) {
        // battery_cnt++;
        // if (battery_cnt == 3) {
        //   this.is_battery = false;
        //   battery_cnt = 0;
        // }
      } else {
        this.NEW.HITENEMY.play();

        this.hitball_effect.setPosition(this.score_out.x, this.score_out.y);
        this.score_out.setVisible(false);
        this.hitball_effect.setVisible(true).play('hitball_animation');
        this.time.delayedCall(
          1000,
          () => {
            this.score_out.setVisible(true);
          },
          null,
          this
        );

        
        this.wicket.setText(--wickets);
        this.updateRunsShow('Out');
        this.runs_show.setScale(0);
        this.tweens.add({
          targets: this.runs_show,
          scaleX: 1,
          scaleY: 1,
          alpha: 1,
          duration: 800,
          ease: 'Bounce',
        });
        this.time.delayedCall(
          1000,
          () => {
            this.runs_show.setAlpha(0);
          },
          null,
          this
        );
      }

      this.fire_ball();


      if (this.is_green_powerup) {
        green_powerup_cnt++;
        if (green_powerup_cnt == 3) {
          green_powerup_cnt = 0;
          this.ball.setDisplaySize(50 * w / 1248, 50 * w / 1248);
          this.ball.state = 'ball';
          this.is_green_powerup = false;
          this.green_powerup_group.setVisible(false);
        }
      }
    }
  }

  public onColliderTargetLight(handleFunc, targetObj) {
    // if (this.ball.type == 'old') {
    //   console.log('11111111111111');
    //   multi_4_6_cnt = 0;
    //   double4_cnt = 0;
    //   double6_cnt = 0;
    //   this.DM_CGS_28.play();
    //   this.hitball_effect.setPosition(targetObj.x, targetObj.y);
    //   targetObj.setVisible(false);
    //   this.hitball_effect.setVisible(true).play('hitball_animation');

    //   this.Crowd_Cheers_v1_wav.play();

    //   // this.hitball_effect.setPosition(this.ball.x, this.ball.y);
    //   // this.hitball_effect.play('hitball_effect');
    //   if (this.is_green_powerup) {
    //     handleFunc(20);
    //     this.updateRunsShow('1 x 5');
    //     green_powerup_cnt++;
    //     if (green_powerup_cnt == 3) {
    //       green_powerup_cnt = 0;
    //       this.green_powerup_group.setVisible(false);
    //       this.is_green_powerup = false;
    //       this.ball.setDisplaySize(50 * w / 1248, 50 * w / 1248);
    //       this.ball.state = 'ball';
    //     }
    //     this.updateRunsShow('1 x 5');
    //   } else {
    //     this.scorePanel.light++;
    //     this.updateRunsShow('+ 1 light');
    //   }
    //   this.ball.type = 'new';
    //   this.runs_show.setScale(0);
    //   this.tweens.add({
    //     targets: this.runs_show,
    //     scaleX: 1,
    //     scaleY: 1,
    //     alpha: 1,
    //     duration: 800,
    //     ease: 'Bounce',
    //   });
    //   this.time.delayedCall(
    //     1000,
    //     () => {
    //       this.runs_show.setAlpha(0);
    //       targetObj.setVisible(true);
    //     },
    //     null,
    //     this
    //   );
    // }

    if (this.ball.type == 'old') {
      console.log('fire');
      multi_4_6_cnt = 0;
      double4_cnt = 0;
      double6_cnt = 0;
      scoreFire_cnt++;
      this.hitball_effect.setPosition(targetObj.x, targetObj.y);
      targetObj.setVisible(false);
      this.hitball_effect.setVisible(true).play('hitball_animation');
      this.time.delayedCall(
        1000,
        () => {
          targetObj.setVisible(true);
        },
        null,
        this
      );
      // this.audioSystem.POWER_SIX_SMASH[this.getRandomNumbers(0, this.audioSystem.POWER_SIX_SMASH.length - 1, 1)].play();
      // this.is_red_powerup = true

      this.NEW.POWERUP.play();

      this.ball.setPosition(w + 50, 0);
      this.ball.setVelocity(0, 0);
      // this.gray_bg.setAlpha(0.45);
      this.physics.world.disable(this.ball);

      this.scorePanel.light++;
      this.updateRunsShow(`+ 1`);
      this.lightNumText.setText(this.scorePanel.light);

      // this.red_text_group.setVisible(true);
      this.game_pause = true;
      this.time.delayedCall(
        1000,
        () => {
          this.game_pause = false;
          // this.gray_bg.setAlpha(0);
          // this.red_text_group.setVisible(false);
          // this.red_powerup_group.setVisible(true);
          this.fire_ball();
        },
        null,
        this
      );

      this.ball.type = 'new';
      if (this.is_green_powerup) {
        green_powerup_cnt++;
        if (green_powerup_cnt == 3) {
          green_powerup_cnt = 0;
          this.is_green_powerup = false;
          this.ball.setDisplaySize(50 * w / 1248, 50 * w / 1248);
          this.ball.state = 'ball';
          this.green_powerup_group.setVisible(false);
        }
      }
    }


  }

  private scoreHandler;

  public setScoreHandle(handleScore: any) {
    this.scoreHandler = handleScore;
  }

  public initGame() {
    console.log(this.params)
    this.cameras.main.fadeIn(1200);
    spinTimes = 1;
    wickets = this.params.lives;
    this.wicket.setText(wickets);
    setTimeout(() => this.startRound(), 2500);
  }

  endRound() {
    this.cameras.main.fadeOut(1000);
    this.scoreHandler(this.scorePanel.totalScore, this.level, this.scorePanel.light);
  }

  startRound() {
    this.wicket.setText(wickets);
  }

  initReadyPlayer() {
    this.power_flag = false;

    // if (author_id == 1) {
    //   this.player.play('aus_ready_animation');
    // } else if(author_id == 2) {
    //   this.player.play('paki_ready_animation');
    // } else {
      this.player.play(`p${author_id}_ready_animation`);
    // }
    power = 0;
  }

  unlockPlayer() {

    const index = this.getUnlockPlayerId();

    this.ball.type = 'new';
    this.audioSystem.POWER_SIX_SMASH[this.getRandomNumbers(0, this.audioSystem.POWER_SIX_SMASH.length - 1, 1)].play();

    // this.ui_item['unlock_under_info_text'].addColor('#ff0000', this.ui_item['unlock_under_info_text'].text.indexOf('UNLOCKED'), 'UNLOCKED'.length);

    this.ui_item['unlock_under_info_text'].setText(`${player_name1[index]}`);
    this.ui_item['unlock_player'].setTexture(player_sprite_names[index]).setDisplaySize(144 * w / 1248, 180 * w / 1248);

    this.ball.setPosition(w + 50, 0);
    this.ball.setVelocity(0, 0);
    this.gray_bg.setAlpha(0.45);
    this.physics.world.disable(this.ball);

    this.unlock_player_group.setVisible(true);
    this.game_pause = true;
    this.time.delayedCall(
      3000,
      () => {
        this.game_pause = false;
        this.gray_bg.setAlpha(0);
        this.unlock_player_group.setVisible(false);
        this.fire_ball();
      },
      null,
      this
    );

  }

  getUnlockPlayerId() {
    const score = this.scorePanel.totalScore
    let index = 0
    player_socre.forEach((ps, i) => {
      if(score >= ps) {
        index = i;
      }
    })

    return index;
  }

  update(time, delta) {
    const angle = Phaser.Math.Angle.Between(this.ball.x + this.ball.displayWidth / 2, this.ball.y + this.ball.displayHeight / 2, this.ballEffect.x, this.ballEffect.y);
    // this.ballEffect.setPosition(this.ball.x + this.ball.displayWidth / 2, this.ball.y + this.ball.displayHeight / 2);
    // this.ballEffect.setAngle(angle * 180 / Math.PI + 180);

    if (this.ball.y >= h / 2 + 200 * h / 688 && this.ball.type == 'new') {
      console.log("+++++++++++++++++++ball_________new")
      let speed_scale = Phaser.Math.FloatBetween(1.5, 1.75);
      this.ball.setVelocity(-405 * speed_scale, -180 * speed_scale);
    }
    if (this.ball.y >= h / 2 + 280 * w / 1248 && this.ball.type == 'old') {
      console.log("+++++++++++++++++++ball_________old__________")
      this.ball.setVisible(false);
      this.fire_ball();
      // over_cnt++
    }

    if (this.physics.overlap(this.player, this.ball)) {
      this.flag = true;
    } else {
      this.flag = false;
    }

    if (!this.count_flag && this.physics.overlap(this.wicketbar, this.ball)) {
      console.log('--------------');
      this.count_flag = true;
      isClicked = false;

      if (!this.is_battery) {

        this.wicket.setText(--wickets);
        this.updateRunsShow('');
        this.runs_show.setScale(0);

        this.NEW.MISSBALL.play();
      }

      if (this.is_green_powerup == true) {
        green_powerup_cnt++;
        if (green_powerup_cnt == 3) {
          green_powerup_cnt = 0;
          this.is_green_powerup = false;
          this.ball.setDisplaySize(50 * w / 1248, 50 * w / 1248);
          console.log('aaaaaaaaaaaaaa1111111')
          this.ball.state = 'ball';
          this.green_powerup_group.setVisible(false);
        }
      } else if (this.is_red_powerup == true) {
        red_powerup_cnt++;
        if (red_powerup_cnt == 3) {
          red_powerup_cnt = 0;
          this.is_random = false;
          this.is_red_powerup = false;
          this.ball.setDisplaySize(50 * w / 1248, 50 * w / 1248);
          console.log('aaaaaa2222222222222aaaa')
          this.ball.state = 'ball';
          this.red_powerup_group.setVisible(false);
        }
      }
      
      if(!this.is_battery) {
        this.tweens.add({
          targets: this.runs_show,
          scaleX: 1,
          scaleY: 1,
          alpha: 1,
          duration: 800,
          ease: 'Bounce',
        });
        this.time.delayedCall(
          1000,
          () => {
            this.runs_show.setAlpha(0);
            this.wicketbar.setVisible(false);
          },
          null,
          this
        );
      }

      this.ball.setPosition(-500, -500).setVelocity(0, 0);

    }

    if (this.power_flag == true && isClicked) {
      power += 10 * (delta / 1000);

      if (power > 15) power = 15;
      this.power_effect.setFrame(Math.round(power));
      this.cricket_bar.setAngle(power * 16);
    } else {
      this.cricket_bar.setAngle(0);

      this.power_effect.setFrame(0);
    }

    if (
      (this.ball.x < this.left_fall.x &&
        this.ball.type == 'new' &&
        this.game_pause == false) ||
      this.ball.x > this.right_fall.x
    ) {
      // this.Crowd_v1_Booing_wav.play();
      // this.audioSystem.WICKET[this.getRandomNumbers(0, this.audioSystem.WICKET.length - 1, 1)].play();
      this.initReadyPlayer();
      console.log('hereeeeeeeeeeeeeeeeeee');
      this.fire_ball();
      over_cnt++;
      // this.overs_right.setText(over_cnt.toString().padStart(4, '0'));
    }
    // this.overs_left.setText(this.scorePanel.fire_count)
    this.runs_left.setText(
      this.scorePanel.totalScore.toString().padStart(4, '0')
    );
    if (wickets == 0) {
      this.endRound();
    }
  }
}

export const games = [
  // {
  //   name: "Touchdown Master",
  //   description:
  //     "Get past swarms of oncoming defenders and get the highest score in this fast-paced endless NFL runner.",
  //   backgroundImage: "/defaults/touchdown-master.jpg",
  //   screenshot: "touchdown-pro.png",
  //   primaryColor: "#F69B01",
  //   textColor: "#FFF",
  //   id: 7,
  //   muxId: "kv3nafmeYitHbRztA98TfVfVLvl6GXUf2U8FCtfHUf4",
  // },
  // {
  //   name: "Cricket Fall",
  //   description:
  //     "Quick avoid cricketball game using touch controls.  Try to score as many points as you can before you concede three goals!",
  //   backgroundImage: "/defaults/cricket-fall.jpg",
  //   screenshot: "cricket-fall.jpg",
  //   primaryColor: "#F69B01",
  //   textColor: "#FFF",
  //   id: 9,
  //   muxId: "LADl2T9sM9xKJJ6QDGG5uSidkg1xPPRJyn0002haYkTRo",
  // },

  // PREMIUM UNITY GAMES > 1000

  // {
  //   name: "Baseball Throw",
  //   description:
  //     "Test your throwing arm and try to hit as many targets as you can in this 3D baseball pitching game.",
  //   backgroundImage: "/defaults/pitch-champ.jpg",
  //   screenshot: "baseball-throw.png",
  //   primaryColor: "#F69B01",
  //   textColor: "#FFF",
  //   id: 1000,
  //   isPremium: true,
  //   unityBundle: "baseball-throw",
  //   unityGameType: 0,
  //   muxId: "XE8vut8sCeOLFibwyi2ZswYmaryJydwJnOBZkd1w9rI",
  // },
  // {
  //   name: "Cricket Throw",
  //   description:
  //     "Line and length count in this 3D cricket game, where the objective is to accurately bowl at targets and amass a high score.",
  //   backgroundImage: "/defaults/flick-stars.jpg",
  //   screenshot: "baseball-throw.png",
  //   primaryColor: "#F69B01",
  //   textColor: "#FFF",
  //   id: 1001,
  //   isPremium: true,
  //   unityBundle: "baseball-throw",
  //   unityGameType: 1,
  //   muxId: "3Sai2FJp1csTqGeqdq100GaKLmwnSUPH4nH2B3aIR3EA",
  // },
  {
    name: "Spin To Win",
    description:
      "Spin your way to victory in our game of chance! Every turn unlocks a world of rewards, making every moment a winning sensation!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259239/1_jxkksl.png",
    screenshot: "wheelspin.jpg",
    primaryColor: "#F69B01",
    textColor: "#FFF",
    id: 10,
    cloudinaryGameTag: "spin-to-win",
    tags: {
      backgroundSprite: "0.6",
    },
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1707448069/nwseiw4wvsfpcp9cg1sq.png",
  },
  {
    name: "Cricket Smash",
    description:
      "Unlock cricket legends, time your shots, and dominate the high score leaderboard in this precision-packed game!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259240/2_ca3g2n.png",
    screenshot: "cricketsmash.jpg",
    primaryColor: "#F69B01",
    textColor: "#FFF",
    id: 11,
    landscape: true,
  },
  // {
  //   name: "Soccer Fall",
  //   description:
  //     "This is soccer ball game.  Try to score as many points as you can before you concede three goals!",
  //   backgroundImage: "/defaults/soccerfall.jpg",
  //   screenshot: "soccerfall.jpg",
  //   primaryColor: "#F69B01",
  //   textColor: "#FFF",
  //   id: 12,
  // },
  {
    name: "Power Pong",
    description:
      "Customize your Pong experience, choose your graphics, and compete for glory on the leaderboard in this sleek and stylish arcade game!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259240/3_cdcojf.png",
    screenshot: "soccerfall.jpg",
    primaryColor: "#F69B01",
    textColor: "#FFF",
    id: 13,
    //
    // Configurable Parameters
    //
    cloudinaryGameTag: "pong",
    playerSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704162276/qhdlrak2jpw9ft5z9vte.png",
    enemySprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704162276/qhdlrak2jpw9ft5z9vte.png",
    powerUpSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704162276/qhdlrak2jpw9ft5z9vte.png",
    objectSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704169546/kq9vyx4g4f9it6ct361b.png",
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704168028/jrjo3jm0an4r6eesrvwc.png",
    tags: {
      playerSprite: "1.0",
      objectSprite: "1.0",
      backgroundSprite: "0.6",
      enemySprite: "1.0",
      powerUpSprite: "1.0",
    },
    // useReimage: true,
    reimageSprites: [
      {
        name: "Player Sprite",
        requiredTags: ["pong", "square"],
        key: "playerSprite",
      },
      {
        name: "Enemy Sprite",
        requiredTags: ["pong", "square"],
        key: "enemySprite",
      },
    ],
  },
  {
    name: "Baller Faller",
    description:
      "Dodge obstacles, catch falling objects, and set high scores in this customizable and action-packed game where every move is a step closer to victory!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259251/4_ehxmnh.png",
    screenshot: "basketball-fall.jpg",
    primaryColor: "#F69B01",
    textColor: "#FFF",
    id: 14,
    //
    // Configurable Parameters
    //
    cloudinaryGameTag: "fall",
    playerSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704849124/Fall_ball_non_head_-_basketball_-_sprite_sheet_jgfrm7.png",
    enemySprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704870377/vxtjhmvs2qj11xlyxaug.png",
    powerUpSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704870421/jigav6bmcbmyl3jupwyi.png",
    objectSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704169648/kjacp92e8wrlbbkdlksm.png",
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704870197/g45zsfq8kr4gz4op7u1q.png",
    additionalSpriteOne:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704849184/Fall_-_head_-_basketball_yqri0q.png",
    additionalSpriteTwo:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704931110/iiukoen08wivafjit9kr.png",
    tags: {
      playerSprite: "body",
      objectSprite: "1.0",
      backgroundSprite: "0.6",
      enemySprite: "1.0",
      powerUpSprite: "1.0",
      additionalSpriteOne: "head",
      additionalSpriteTwo: "1.0",
    },
  },
  {
    name: "Wordle",
    description:
      "Experience a new twist in Wordle with AI-generated puzzles! Test your word skills against machine-crafted challenges for a thrilling and compact guessing game!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259240/6_cty2qu.png",
    screenshot: "soccerfall.jpg",
    primaryColor: "#F69B01",
    textColor: "#FFF",
    id: 15,
    words: ["SCORE", "GOALS", "CATCH", "BLITZ"],
    cloudinaryGameTag: "wordle",
    tags: {
      backgroundSprite: "0.6",
    },
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1707448069/nwseiw4wvsfpcp9cg1sq.png",
  },
  {
    name: "Fly Ball",
    description:
      "Flap, customize, conquer! Dive into an addictive, fully customizable tap-to-fly adventure for endless high-score thrills!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259240/5_bch6hi.png",
    screenshot: "soccerfall.jpg",
    primaryColor: "#F69B01",
    textColor: "#FFF",
    id: 16,
    cloudinaryGameTag: "fly",
    tags: {
      playerSprite: "1.0",
      objectSprite: "1.0",
      backgroundSprite: "bg",
      additionalSpriteOne: "parallax",
    },
    backgroundSprite:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1706226062/7_rbf1rh.png",
    additionalSpriteOne:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1706229721/8_wy0ezs.png",
    playerSprite:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1704930814/cch9su02kpncntxslm8d.png",
    objectSprite:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1704870421/jigav6bmcbmyl3jupwyi.png",
  },
  {
    name: "Smash Blitz Throw",
    description: "Smash Blitz Throw is balabala bala babab",
    backgroundImage: "/pong/smashBlitzThrow/smashBlitzThrowing.png",
    screenshot: "cricketsmash.jpg",
    primaryColor: "#F69B01",
    textColor: "#FFF",
    id: 22,
    landscape: true,
    cloudinaryGameTag: "smash-blitz",
    playerSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712273756/ggm9gp0ksw4krnjwbgu3.png",
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1708389315/ac62ds7jkvvnnhehvgxp.jpg",
    additionalSpriteOne:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712273662/gniqllcbuvpxpjyv7ccf.png",
    additionalSpriteTwo:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712273812/t5dhqvsulaqxnbkmdbab.png",
    tags: {
      playerSprite: "body",
      backgroundSprite: "0.6",
      additionalSpriteOne: "head",
      additionalSpriteTwo: "shoes",
    },
    lives: 3,
    score: 0,
    level: 1,
    ball: "ball.png",
    powerup: "powerup.png",
    obstacle: "bomb.png",
    normal_target: "purple_ball.png",
    high_value_target: "super_gold.png",
    shoes: "shoes.png",
    head: "head.png",
    right_hand: "right_hand.png",
    left_hand: "left_hand.png",
    body: "body.png",
  },
  {
    name: "Smash Blitz",
    description:
      "Smash Blitz is a high-energy arcade game where players deflect oncoming objects into colorful targets for points. As the speed increases and lives dwindle, can you keep up the pace and survive the relentless challenge?",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1708641627/cjpqqvkxmkpsgajlpt9a.png",
    screenshot: "cricketsmash.jpg",
    primaryColor: "#F69B01",
    textColor: "#FFF",
    id: 17,
    landscape: true,
    cloudinaryGameTag: "target",
    tags: {
      backgroundSprite: "0.6",
      playerSprite: "body",
      backgroundSprite: "bg",
      objectSprite: "1.0",
      powerUpSprite: "1.0",
      enemySprite: "1.0",
      additionalSpriteOne: "1.0",
      additionalSpriteTwo: "1.0",
      additionalSpriteThree: "1.0",
    },
    backgroundSprite:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1708389315/ac62ds7jkvvnnhehvgxp.jpg",
    playerSprite:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1708389314/k9rfipxwbcjuq9zyoq7s.png",
    objectSprite:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1706661086/xg4oimm5lqgrjwpma8af.png",
    powerUpSprite:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1712712992/bkiobenpts9ivhvi1zoq.png",
    enemySprite:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1712713078/mmiruz3tgcdaznvedr6f.png",
    additionalSpriteOne:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1712713078/mmiruz3tgcdaznvedr6f.png",
    additionalSpriteTwo:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1712713078/mmiruz3tgcdaznvedr6f.png",
    additionalSpriteThree:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1712713078/mmiruz3tgcdaznvedr6f.png",
  },

  {
    name: "FootBall Pass Game",
    description:
      "Unlock cricket legends, time your shots, and dominate the high score leaderboard in this precision-packed game!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259240/2_ca3g2n.png",
    screenshot: "cricketsmash.jpg",
    primaryColor: "#F69B01",
    textColor: "#FFF",
    id: 18,
    landscape: false,
    cloudinaryGameTag: "nfl",
    tags: {
      backgroundSprite: "0.6",
      playerSprite: "spritesheet",
      objectSprite: "spritesheet",
      enemySprite: "spritesheet",
    },
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704168028/jrjo3jm0an4r6eesrvwc.png",
    enemySprite:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1704930814/cch9su02kpncntxslm8d.png",
    playerSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704849124/Fall_ball_non_head_-_basketball_-_sprite_sheet_jgfrm7.png",
    objectSprite:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1704930814/cch9su02kpncntxslm8d.png",
  },
  {
    name: "Fly Collect",
    description:
      "Flap, customize, conquer! Dive into an addictive, fully customizable tap-to-fly adventure for endless high-score thrills!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259240/5_bch6hi.png",
    screenshot: "soccerfall.jpg",
    primaryColor: "#F69B01",
    textColor: "#FFF",
    id: 19,
    cloudinaryGameTag: "fly",
    tags: {
      playerSprite: "1.0",
      objectSprite: "1.0",
      backgroundSprite: "bg",
      additionalSpriteOne: "parallax",
    },
    backgroundSprite:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1706226062/7_rbf1rh.png",
    additionalSpriteOne:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1706229721/8_wy0ezs.png",
    playerSprite:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1704930814/cch9su02kpncntxslm8d.png",
    objectSprite:
      "http://res.cloudinary.com/dmj6utxgp/image/upload/v1704870421/jigav6bmcbmyl3jupwyi.png",
  },
  {
    name: "Cricket Ball Smash",
    description:
      "Unlock cricket legends, time your shots, and dominate the high score leaderboard in this precision-packed game!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259240/2_ca3g2n.png",
    screenshot: "cricketsmash.jpg",
    primaryColor: "#F69B01",
    textColor: "#FFF",
    id: 20,
    landscape: true,
  },
  {
    name: "Baller Faller",
    description:
      "Dodge obstacles, catch falling objects, and set high scores in this customizable and action-packed game where every move is a step closer to victory!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259251/4_ehxmnh.png",
    screenshot: "basketball-fall.jpg",
    primaryColor: "#F69B01",
    textColor: "#FFF",
    id: 21,
    //
    // Configurable Parameters
    //
    cloudinaryGameTag: "fall",
    playerSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704849124/Fall_ball_non_head_-_basketball_-_sprite_sheet_jgfrm7.png",
    enemySprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704870377/vxtjhmvs2qj11xlyxaug.png",
    powerUpSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704870421/jigav6bmcbmyl3jupwyi.png",
    objectSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704169648/kjacp92e8wrlbbkdlksm.png",
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704870197/g45zsfq8kr4gz4op7u1q.png",
    additionalSpriteOne:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704849184/Fall_-_head_-_basketball_yqri0q.png",
    additionalSpriteTwo:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704931110/iiukoen08wivafjit9kr.png",
    tags: {
      playerSprite: "body",
      objectSprite: "1.0",
      backgroundSprite: "0.6",
      enemySprite: "1.0",
      powerUpSprite: "1.0",
      additionalSpriteOne: "head",
      additionalSpriteTwo: "1.0",
    },
  },
];

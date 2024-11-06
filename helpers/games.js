export const games = [
  // {
  //   name: "Spin To Win",
  //   creditConsumption: 1,
  //   description:
  //     "Spin your way to victory in our game of chance! Every turn unlocks a world of rewards, making every moment a winning sensation!",
  //   backgroundImage:
  //     "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259239/1_jxkksl.png",
  //   screenshot: "wheelspin.jpg",
  //   primaryColor: "#F69B01",
  //   accentColor: "#EB144C",
  //   textColor: "#FFF",
  //   id: 10,
  //   cloudinaryGameTag: "spin-to-win",
  //   tags: {
  //     backgroundSprite: "0.6",
  //   },
  //   font: "Play",
  //   bodyFont: "Roboto",
  //   backgroundSprite:
  //     "https://res.cloudinary.com/dmj6utxgp/image/upload/v1707448069/nwseiw4wvsfpcp9cg1sq.png",
  // },
  {
    name: "Cricket Smash BBL",
    creditConsumption: 2,
    description:
      "Unlock cricket legends, time your shots, and dominate the high score leaderboard in this precision-packed game!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1730866124/Homescreen_BG-_Landscape_5_fndwey.gif",
    screenshot: "cricketsmash.jpg",
    primaryColor: "#F69B01",
    accentColor: "#0693E3",
    textColor: "#FFF",
    id: 11,
    font: "Play",
    bodyFont: "Roboto",
    landscape: true,
  },
  {
    name: "Power Pong",
    creditConsumption: 2,
    description:
      "Customize your Pong experience, choose your graphics, and compete for glory on the leaderboard in this sleek and stylish arcade game!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259240/3_cdcojf.png",
    screenshot: "soccerfall.jpg",
    primaryColor: "#F69B01",
    accentColor: "#0693E3",
    textColor: "#FFF",
    id: 13,
    font: "Play",
    bodyFont: "Roboto",
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
    backgroundMusic:
      "https://res.cloudinary.com/dmj6utxgp/video/upload/v1713842033/8bit-uptempo1.mp3",
    tags: {
      playerSprite: "1.0",
      objectSprite: "1.0",
      backgroundSprite: "0.6",
      enemySprite: "1.0",
      powerUpSprite: "1.0",
      backgroundMusic: "bgm",
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
    creditConsumption: 2,
    description:
      "Dodge obstacles, catch falling objects, and set high scores in this customizable and action-packed game where every move is a step closer to victory!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259251/4_ehxmnh.png",
    screenshot: "basketball-fall.jpg",
    primaryColor: "#F69B01",
    accentColor: "#0693E3",
    textColor: "#FFF",
    id: 14,
    font: "Play",
    bodyFont: "Roboto",
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
    backgroundMusic:
      "https://res.cloudinary.com/dmj6utxgp/video/upload/v1713843011/8bit-uptempo-haunting.mp3",
    tags: {
      playerSprite: "body",
      objectSprite: "1.0",
      backgroundSprite: "0.6",
      enemySprite: "1.0",
      powerUpSprite: "1.0",
      additionalSpriteOne: "head",
      additionalSpriteTwo: "1.0",
      backgroundMusic: "bgm",
    },
  },
  {
    name: "Wordle",
    creditConsumption: 1,
    description:
      "Experience a new twist in Wordle with AI-generated puzzles! Test your word skills against machine-crafted challenges for a thrilling and compact guessing game!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259240/6_cty2qu.png",
    backgroundMusic:
      "https://res.cloudinary.com/dmj6utxgp/video/upload/v1713844318/thinking-midtempo.mp3",
    screenshot: "soccerfall.jpg",
    primaryColor: "#F69B01",
    accentColor: "#9900EF",
    textColor: "#FFF",
    font: "Play",
    bodyFont: "Roboto",
    id: 15,
    words: ["SCORE", "GOALS", "CATCH", "BLITZ"],
    cloudinaryGameTag: "wordle",
    tags: {
      backgroundSprite: "0.6",
      backgroundMusic: "bgm",
    },
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1707448069/nwseiw4wvsfpcp9cg1sq.png",
  },
  {
    name: "Fly Ball",
    creditConsumption: 2,
    font: "Play",
    bodyFont: "Roboto",
    description:
      "Flap, customize, conquer! Dive into an addictive, fully customizable tap-to-fly adventure for endless high-score thrills!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259240/5_bch6hi.png",

    screenshot: "soccerfall.jpg",
    primaryColor: "#F69B01",
    accentColor: "#9900EF",
    textColor: "#FFF",
    id: 16,
    cloudinaryGameTag: "fly",
    tags: {
      playerSprite: "1.0",
      objectSprite: "1.0",
      enemySprite: "1.0",
      backgroundSprite: "bg",
      additionalSpriteOne: "parallax",
      backgroundMusic: "bgm",
    },
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706226062/7_rbf1rh.png",
    enemySprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704930814/cch9su02kpncntxslm8d.png",
    additionalSpriteOne:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706229721/8_wy0ezs.png",
    playerSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704930814/cch9su02kpncntxslm8d.png",
    objectSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704870421/jigav6bmcbmyl3jupwyi.png",
    backgroundMusic:
      "https://res.cloudinary.com/dmj6utxgp/video/upload/v1713844335/happy-game-bright.mp3",
  },
  {
    name: "Throwdown Frenzy",
    creditConsumption: 2,
    font: "Play",
    bodyFont: "Roboto",
    description: `Throwdown Frenzy propels players into an adrenaline-fueled frenzy as they hurl projectiles at targets, dodge relentless enemy obstacles, and compete for high scores in a heart-pounding test of skill and survival!`,
    gameIcon:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713152738/Game_tiles_1_pdiyee.png",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713152737/PlaySpark_home_screens_54_lnqajv.jpg",
    screenshot: "cricketsmash.jpg",
    primaryColor: "#040254",
    accentColor: "#007eff",
    textColor: "#FFF",
    id: 22,
    landscape: true,
    cloudinaryGameTag: "smash-blitz",
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1708389315/ac62ds7jkvvnnhehvgxp.jpg",
    playerSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712273756/ggm9gp0ksw4krnjwbgu3.png",
    enemySprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713249177/ob0f8ej3o5cj1rdlmjuv.png",
    objectSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713249300/shfamltfjjp6qj4bikwy.png",
    powerUpSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713249398/v0vwyytupq6ayphvqwal.png",
    additionalSpriteOne:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713249708/uxum6njt4ldbvmtxqozp.png",
    additionalSpriteTwo:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713249541/ouvmlngfwezf0ysjsep6.png",
    additionalSpriteThree:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712273812/t5dhqvsulaqxnbkmdbab.png",
    additionalSpriteFour:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712273662/gniqllcbuvpxpjyv7ccf.png",
    additionalSpriteFive:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713249771/k95x9isnc50ppqza3ktl.png",
    additionalSpriteSix:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713249828/rgbbbdo99hcj3pij6o6u.png",
    backgroundMusic:
      "https://res.cloudinary.com/dmj6utxgp/video/upload/v1713930357/crowd-loop-talking.mp3",
    tags: {
      backgroundSprite: "0.6",
      playerSprite: "body",
      enemySprite: "1.0",
      objectSprite: "1.0",
      powerUpSprite: "1.0",
      additionalSpriteOne: "1.0",
      additionalSpriteTwo: "1.0",
      additionalSpriteThree: "shoes",
      additionalSpriteFour: "head",
      additionalSpriteFive: "right-hand",
      additionalSpriteSix: "left-hand",
      backgroundMusic: "bgm",
    },
    lives: 3,
    score: 0,
    level: 1,
  },
  {
    name: "Bounce Blitz",
    creditConsumption: 2,
    font: "Play",
    bodyFont: "Roboto",
    description: `"Bounce Blitz" invites players into a high-octane world where they must master the art of timing and precision as they ricochet a ball off the ground to hit targets, evade perilous obstacles, and conquer levels in a thrilling battle for supremacy`,
    gameIcon:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713152737/Game_tiles_z3u1kz.png",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713152737/PlaySpark_home_screens_53_sel4zk.jpg",
    backgroundMusic:
      "https://res.cloudinary.com/dmj6utxgp/video/upload/v1713930357/crowd-loop-talking.mp3",
    screenshot: "cricketsmash.jpg",
    primaryColor: "#04478e",
    accentColor: "#ff61ff",
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
      backgroundMusic: "bgm",
    },
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1708389315/ac62ds7jkvvnnhehvgxp.jpg",
    playerSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1708389314/k9rfipxwbcjuq9zyoq7s.png",
    objectSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706661086/xg4oimm5lqgrjwpma8af.png",
    powerUpSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712712992/bkiobenpts9ivhvi1zoq.png",
    enemySprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712713078/mmiruz3tgcdaznvedr6f.png",
    additionalSpriteOne:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712713078/mmiruz3tgcdaznvedr6f.png",
    additionalSpriteTwo:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712713078/mmiruz3tgcdaznvedr6f.png",
    additionalSpriteThree:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712713078/mmiruz3tgcdaznvedr6f.png",
  },

  {
    name: "Endzone Blitz",
    creditConsumption: 2,
    font: "Play",
    bodyFont: "Roboto",
    description: `In 'Endzone Blitz,' players become gridiron heroes, strategically passing the ball to teammates, dodging opponents, and making daring catches to score touchdowns in an intense, endless runner challenge where every missed play costs a precious life, culminating in a thrilling final score!"`,
    gameIcon:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713152745/Add_a_heading_5_yojsxi.png",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713152747/PlaySpark_home_screens_50_saftei.jpg",
    backgroundMusic:
      "https://res.cloudinary.com/dmj6utxgp/video/upload/v1713930357/crowd-loop-talking.mp3",
    screenshot: "cricketsmash.jpg",
    primaryColor: "#ffb905",
    accentColor: "#45b33a",
    textColor: "#FFF",
    id: 18,
    landscape: false,
    cloudinaryGameTag: "nfl",
    tags: {
      backgroundSprite: "0.6",
      playerSprite: "spritesheet",
      objectSprite: "spritesheet",
      enemySprite: "spritesheet",
      backgroundMusic: "bgm",
    },
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704168028/jrjo3jm0an4r6eesrvwc.png",
    enemySprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704930814/cch9su02kpncntxslm8d.png",
    playerSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704849124/Fall_ball_non_head_-_basketball_-_sprite_sheet_jgfrm7.png",
    objectSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704930814/cch9su02kpncntxslm8d.png",
  },
  {
    name: "Sky Soar",
    creditConsumption: 2,
    font: "Play",
    bodyFont: "Roboto",
    description:
      "In ‘Sky Soar,’ players navigate a mesmerizing sky filled with rings, skillfully guiding their object through obstacles to score points and collecting power-ups for enhanced abilities in this addictive aerial adventure reminiscent of Flappy Bird.",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713152736/Game_tiles_2_o7w5xl.png",
    backgroundMusic:
      "https://res.cloudinary.com/dmj6utxgp/video/upload/v1713844335/happy-game-bright.mp3",
    screenshot: "soccerfall.jpg",
    primaryColor: "#5271ff",
    accentColor: "#5271ff",
    textColor: "#FFF",
    id: 19,
    cloudinaryGameTag: "fly",
    tags: {
      playerSprite: "1.0",
      enemySprite: "1.0",
      objectSprite: "1.0",
      backgroundSprite: "bg",
      additionalSpriteOne: "parallax",
      backgroundMusic: "bgm",
    },
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706226062/7_rbf1rh.png",
    additionalSpriteOne:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706229721/8_wy0ezs.png",
    playerSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704930814/cch9su02kpncntxslm8d.png",
    enemySprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704930814/cch9su02kpncntxslm8d.png",
    objectSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1704870421/jigav6bmcbmyl3jupwyi.png",
  },
  // {
  //   name: "Cricket Ball Smash",
  //   description:
  //     "Unlock cricket legends, time your shots, and dominate the high score leaderboard in this precision-packed game!",
  //   backgroundImage:
  //     "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706259240/2_ca3g2n.png",
  //   screenshot: "cricketsmash.jpg",
  //   primaryColor: "#F69B01",
  //   textColor: "#FFF",
  //   id: 20,
  //   landscape: true,
  // },
  {
    name: "Sidestep Surge",
    creditConsumption: 2,
    font: "Play",
    bodyFont: "Roboto",
    description:
      "In 'Sidestep Surge,' players skillfully maneuver their object across the screen, collecting items and evading enemies in a frantic race against time to achieve the highest score before running out of lives.",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713152737/Game_tiles_3_v1zfhs.png",
    screenshot: "basketball-fall.jpg",
    primaryColor: "#ffe000",
    accentColor: "#c1ff72",
    textColor: "#000",
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
    backgroundMusic:
      "https://res.cloudinary.com/dmj6utxgp/video/upload/v1713843011/8bit-uptempo-haunting.mp3",
    tags: {
      playerSprite: "body",
      objectSprite: "1.0",
      backgroundSprite: "0.6",
      enemySprite: "1.0",
      powerUpSprite: "1.0",
      additionalSpriteOne: "head",
      additionalSpriteTwo: "1.0",
      backgroundMusic: "bgm",
    },
  },
  {
    name: "Airborne Ace",
    creditConsumption: 2,
    font: "Play",
    bodyFont: "Roboto",
    description:
      "Airborne Ace” catapults players into an exhilarating sky-high showdown, tasking them with precision strikes as they unleash a ball into the air, skillfully aiming to hit targets amidst a flurry of challenges, all in a quest for ultimate mastery and glory!",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1713152746/Add_a_heading_4_aovot8.png",
    backgroundMusic:
      "https://res.cloudinary.com/dmj6utxgp/video/upload/v1713930357/crowd-loop-talking.mp3",
    screenshot: "cricketsmash.jpg",
    primaryColor: "#ffe000",
    accentColor: "#c1ff72",
    textColor: "#000",
    id: 23,
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
      backgroundMusic: "bgm",
    },
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1708389315/ac62ds7jkvvnnhehvgxp.jpg",
    playerSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1708389314/k9rfipxwbcjuq9zyoq7s.png",
    objectSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1706661086/xg4oimm5lqgrjwpma8af.png",
    powerUpSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712712992/bkiobenpts9ivhvi1zoq.png",
    enemySprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712713078/mmiruz3tgcdaznvedr6f.png",
    additionalSpriteOne:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712713078/mmiruz3tgcdaznvedr6f.png",
    additionalSpriteTwo:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712713078/mmiruz3tgcdaznvedr6f.png",
    additionalSpriteThree:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1712713078/mmiruz3tgcdaznvedr6f.png",
  },
  {
    name: "Can Smash",
    creditConsumption: 2,
    font: "Play",
    bodyFont: "Roboto",
    description:
      "Hit cans to earn points, avoid enemy targets, and collect power-ups to progress through increasingly challenging levels.",
    backgroundImage:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1720584857/PlaySpark_home_screens_72_lftntd.jpg",
    gameIcon:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1720584857/Playspark_game_tiles_14_rckz5w.png",
    backgroundMusic:
      "https://res.cloudinary.com/dmj6utxgp/video/upload/v1713930357/crowd-loop-talking.mp3",
    screenshot: "cricketsmash.jpg",
    primaryColor: "#ffb905",
    accentColor: "#45b33a",
    textColor: "#FFF",
    id: 24,
    landscape: false,
    cloudinaryGameTag: "can",
    tags: {
      backgroundSprite: "2.0",
      backgroundSprite: "2.0",
      objectSprite: "3.0",
      powerUpSprite: "1.0",
      enemySprite: "3.0",
      additionalSpriteOne: "3.0",
      additionalSpriteTwo: "3.0",
      additionalSpriteThree: "3.0",
      additionalSpriteFour: "3.0",
      additionalSpriteSix: "2.0",
      backgroundMusic: "bgm",
      glbOne: "ball",
      playerSprite: "balltexture",
      glbTwo: "barrel",
    },
    backgroundSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1720598346/ximczgxkmelka6qdaxqh.jpg",
    playerSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1721085900/filkyxb3ffrxjbm9fd9s.jpg",
    objectSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1720768934/kro0ste33ahsakvdoeym.jpg",
    powerUpSprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1720599031/iugbeqzkx9fz3rpnlaws.jpg",
    enemySprite:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1721086239/dpeorrc9qdss49kis2uo.jpg",
    additionalSpriteOne:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1721086240/wzj4wpptzi0zl2en88qh.jpg",
    additionalSpriteTwo:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1721086240/dwqj8y9hsctdevw97rvu.jpg",
    additionalSpriteThree:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1721086240/qmoybmyir2y6qn4umrh2.jpg",
    additionalSpriteFour:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1721086240/tvixywic1l6rnh9ywu48.jpg",
    additionalSpriteSix:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1720598969/wyzu0lrhbqiiznczuo6t.jpg",
    glbOne:
      "https://res.cloudinary.com/dnnp8gmvx/image/upload/v1720643737/ball_nvx8ya.glb",
    glbTwo:
      "https://res.cloudinary.com/dmj6utxgp/image/upload/v1720768611/memshy7a8wym4795nqas.glb",
  },
];

export const sanitiseGameObject = (_game) => {
  const game = { ..._game };
  delete game["tournamentId"];
  delete game["endDate"];
  delete game["freemiumPlayCount"];
  delete game["impressions"];
  delete game["isActive"];
  delete game["leaderboard"];
  delete game["ownerCompanyName"];
  delete game["ownerId"];
  delete game["playCount"];
  delete game["reimageSprites"];
  delete game["tournamentId"];
  delete game["videoViews"];
  return game;
};

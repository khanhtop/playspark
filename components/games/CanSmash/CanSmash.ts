import { useEffect } from "react";
import { Engine, Mesh, Scene } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
// import("@babylonjs/inspector");
import "@babylonjs/loaders/glTF";
import * as TWEEN from "@tweenjs/tween.js";

import { CameraController } from "./CameraController";
import { LightController } from "./LightController";
import { BallManager } from "./Ball/BallManager";
import { Inputs } from "./Inputs";
import { BallPicker } from "./Ball/BallPicker";
import { Ground } from "./Environment/Ground";
import { Background } from "./Environment/Background";
import { PowerupManager } from "./Powerups/PowerupManager";
import { GUI2D } from "./GUI/GUI2D";
import { LevelCreator } from "./LevelCreator";
import { Materials } from "./Materials";
import { Loader } from "./Loader";
import { LiveManager } from "./GUI_EVENTTS/LiveManager";
import { ScoreManager } from "./GUI_EVENTTS/ScoreManager";
import { PowerupCreditManager } from "./Powerups/PowerupCreditManager";
import { TextPopupManager } from "./GUI/TextPopupManager";
import { CanManager } from "./Can/CanManager";
import { LevelManager } from "./LevelManager";
import { GameData } from "./GameData";
import { ImagePopupManager } from "./GUI/ImagePopupManager";
import { ComboBonus } from "./Combo/ComboBonus";
import { TimeBonus } from "./Combo/TimeBonus";
import { Timer } from "./Timer";
import { AudioManager } from "./AudioManager";
import { SaveLoadData } from "./SaveLoadData.";
import { DEFAULT_POWERUP_COUNT } from "./Consts";
import { ParticleManager } from "./ParticleManager";
import { Images } from "./Images";
import { Sounds } from "./Sounds";
import { Events, EventTypes } from "./Events";
import { Meshs } from "./Meshs";

const CanSmash = (data: any) => {
  //   ball,
  //   brandLogo,
  //   high_value_target,
  //   landscape,
  //   maxscore,
  //   normal_target_1,
  //   normal_target_2,
  //   normal_target_3,
  //   objectSprite,
  //   obstacle,
  //   playerSprite,
  //   powerup,
  //   sponsorLogo;

  useEffect(() => {
    // console.log("CanSmash2:", data.callback);
    console.log("CanSmash4:", data);

    // data.callback(totalScore, currentLevel + 1, this.boostCredits);

    let timerHandle = null;
    Events.gamePlay.add((_data: any) => {
      if (_data.name == "gameOverClose" || _data.name == "gameOver") {
        let timer = 0;
        timer = _data.name == "gameOver" ? 5000 : 0;
        clearTimeout(timerHandle);
        timerHandle = setTimeout(() => {
          let currentLevel = GameData.instance.getCurrentLevel();
          let currentScore = GameData.instance.getTotalScore();
          data.callback(currentScore, currentLevel, 2);
        }, timer);
      }
    });

    let score = 0;
    let level = 1;
    let lives = 2;
    let boostCredits = 0;

    var div = document.createElement("div");
    div.id = "game";
    //document.body.appendChild(div);
    //.appendChild(div);
    let mainElement = document.getElementsByTagName("main")[0];
    mainElement.insertBefore(div, mainElement.firstChild);

    // create the canvas html element and attach it to the webpage
    const canvas = document.createElement("canvas");
    canvas.id = "gameCanvas";
    div.appendChild(canvas);

    // initialize babylon scene and engine
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    new GameData(scene, engine, canvas);
    new SaveLoadData();
    new Timer(scene, engine);

    const resize = () => {
      let width = window.innerWidth;
      let height = width * 1.77;

      if (height > window.innerHeight) {
        height = window.innerHeight;
        width = height / 1.77;
      }

      engine.setSize(width, height, true);
      engine.resize();
    };

    resize();
    window.addEventListener("resize", resize);

    // hide/show the Inspector
    // window.addEventListener("keydown", (ev) => {
    //   if (ev.shiftKey && ev.ctrlKey && ev.altKey && ev.key === "i") {
    //     if (scene.debugLayer.isVisible()) {
    //       scene.debugLayer.hide();
    //     } else {
    //       scene.debugLayer.show();
    //     }
    //   }
    // });

    const loader = new Loader(scene, () => {
      init();
    });

    let baseUrl = "/pong/canSmash/";
    loader.loadMesh(baseUrl, Meshs.data.can);
    loader.loadMesh(baseUrl, Meshs.data.barrel);
    loader.loadMesh(baseUrl, Meshs.data.ledges);
    loader.loadFont(baseUrl, "PeaceSans", "PeaceSansWebfont.ttf");

    Object.keys(Sounds.data).forEach((key) => {
      Sounds.data[key] = baseUrl + Sounds.data[key];
    });
    Object.keys(Images.data).forEach((key) => {
      Images.data[key] = baseUrl + Images.data[key];
    });

    let ballBaseUrl = baseUrl;
    console.log(ballBaseUrl);
    ({ score, level, lives, boostCredits, ballBaseUrl } = initParams(
      data,
      score,
      level,
      lives,
      boostCredits,
      ballBaseUrl
    ));

    loader.loadMesh(ballBaseUrl, Meshs.data.ball);

    Object.keys(Images.data).forEach((key) => {
      loader.loadImage(Images.data[key]);
    });

    loader.loadPhysic();
    new AudioManager(scene);

    const init = () => {
      new CameraController(scene, canvas);
      new LightController(scene);
      new Materials([
        Images.data.logo1,
        Images.data.logo2,
        Images.data.logo3,
        Images.data.logo4,
      ]);

      new BallManager(scene);
      new Inputs(scene, canvas);
      new BallPicker(scene);
      new Ground(scene);
      new Background(scene);
      new TextPopupManager();
      new ImagePopupManager();
      new PowerupManager(scene);
      new GUI2D();

      new LiveManager(lives);
      new ScoreManager(score);
      new PowerupCreditManager(boostCredits);
      new ParticleManager();

      function animate(time) {
        window.requestAnimationFrame(animate);
        TWEEN.update(time);
      }
      animate(performance.now());

      new CanManager(scene);
      new LevelManager(scene);
      const levelCreator = new LevelCreator();
      levelCreator.create(level - 1);
      new ComboBonus();
      new TimeBonus();

      engine.runRenderLoop(() => {
        scene.render();
      });
    };

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", null);
      engine.dispose();
      canvas.remove();
    };
  }, []);

  return null;
};

export default CanSmash;
function initParams(
  data: any,
  score: number,
  level: number,
  lives: number,
  boostCredits: number,
  ballBaseUrl: string
) {
  if (data == undefined)
    return { score, level, lives, boostCredits, ballBaseUrl };
  if (data.params == undefined)
    return { score, level, lives, boostCredits, ballBaseUrl };

  if (data.params.backgroundMusic != undefined)
    Sounds.data.music = data.params.backgroundMusic;

  if (data.params.objectSprite != undefined) {
    const result = extractFileAndBase(data.params.objectSprite);
    ballBaseUrl = result.baseUrl;
    console.log(`file: ${result.file}`);
    console.log(`base url: ${result.baseUrl}`);
    Meshs.data.ball = result.file;
  }

  if (data.params.backgroundSprite != undefined)
    Images.data.background = data.params.backgroundSprite;

  if (data.params.enemySprite != undefined)
    Images.data.enemy = data.params.enemySprite;

  if (data.params.powerupSprite != undefined)
    Images.data.powerup_credit = data.params.powerupSprite;

  if (data.params.additionalSpriteOne != undefined)
    Images.data.logo1 = data.params.additionalSpriteOne;

  if (data.params.additionalSpriteTwo != undefined)
    Images.data.logo2 = data.params.additionalSpriteTwo;

  if (data.params.additionalSpriteThree != undefined)
    Images.data.logo3 = data.params.additionalSpriteThree;

  if (data.params.additionalSpriteFour != undefined)
    Images.data.logo4 = data.params.additionalSpriteFour;

  if (data.params.additionalSpriteFive != undefined)
    Images.data.barrel = data.params.additionalSpriteFive;

  if (data.params.additionalSpriteSix != undefined)
    Images.data.greengrass = data.params.additionalSpriteSix;

  if (data.params.score != undefined) score = parseInt(data.params.score);

  if (data.params.level != undefined) level = parseInt(data.params.level);

  if (data.params.lives != undefined) lives = parseInt(data.params.lives);

  if (data.params.boostCredits != undefined)
    boostCredits = parseInt(data.params.boostCredits);

  return { score, level, lives, boostCredits, ballBaseUrl };
}

function extractFileAndBase(url) {
  const urlObj = new URL(url);

  const pathSegments = urlObj.pathname.split("/");

  const file = pathSegments.pop();

  const baseUrl = url.replace(file,"");


  return {
    file: file,
    baseUrl: baseUrl,
  };
}
